import { parseCustomInput } from './customInputParser';
import { 
  doCreatureTypesMatch,
  doVibesMatch,
  doArchetypesMatch 
} from './synonymMapper';

/**
 * SCORING WEIGHTS:
 * - Primary match: 10 points (deck strongly focuses on this)
 * - Secondary match: 7 points (deck has this as a theme, increased from 5)
 * - Both primary + secondary match: +3 bonus (20 total)
 * 
 * RATIONALE: Secondary tags were undervalued at 5 points (50% of primary).
 * Many great decks have the user's preference as a secondary theme.
 * New scoring: 7 points (70% of primary) + bonus for comprehensive coverage.
 */

export function matchPrecons(precons, userPreferences, pathType = "vibes") {
  // PART 1: Filter by IP if coming from Pop Culture path
  let filteredPrecons = precons;
  
  if (pathType === "pop_culture" && userPreferences.selectedIP) {
    const selectedIP = userPreferences.selectedIP;
    
    // Filter to only decks matching the selected IP
    if (selectedIP !== "magic_original" && selectedIP !== "skip") {
      filteredPrecons = precons.filter(precon => precon.ip === selectedIP);
      console.log(`Found ${filteredPrecons.length} decks for IP: ${selectedIP}`);
    } else {
      // "Magic Original" or "Skip" - show diverse magic_original decks
      filteredPrecons = precons.filter(precon => precon.ip === "magic_original");
    }
  }
  
  const scoredPrecons = filteredPrecons.map(precon => {
    let score = 0;
    const tags = precon.tags || {};
    
    // Handle custom text input
    let parsedInput = null;
    let isCustomInput = false;
    
    if (userPreferences.customText) {
      parsedInput = parseCustomInput(userPreferences.customText);
      isCustomInput = true;
    }
    
    if (pathType === "vibes") {
      // VIBES PATH SCORING
      
      // CUSTOM TEXT MATCHING
      if (isCustomInput && parsedInput) {
        // Match vibes from custom text - WITH SYNONYM SUPPORT
        parsedInput.vibes.forEach(vibe => {
          const primaryVibes = (tags.aesthetic_vibe?.primary || []);
          const secondaryVibes = (tags.aesthetic_vibe?.secondary || []);
          
          let primaryMatched = false;
          let secondaryMatched = false;
          
          // Check primary vibes with synonym matching
          if (primaryVibes.some(v => doVibesMatch(vibe, v))) {
            score += 10;
            primaryMatched = true;
          }
          
          // Check secondary vibes with synonym matching
          if (secondaryVibes.some(v => doVibesMatch(vibe, v))) {
            score += 7; // Increased from 5 to 7
            secondaryMatched = true;
          }
          
          // Bonus: Deck has this vibe in BOTH primary AND secondary
          if (primaryMatched && secondaryMatched) {
            score += 3; // Total: 10 + 7 + 3 = 20 points
          }
        });
        
        // Match creature types from custom text - WITH SYNONYM SUPPORT
        parsedInput.creatureTypes.forEach(type => {
          const primaryTypes = (tags.creature_types?.primary || []);
          const secondaryTypes = (tags.creature_types?.secondary || []);
          
          let primaryMatched = false;
          let secondaryMatched = false;
          
          // Check primary types with synonym matching
          if (primaryTypes.some(t => doCreatureTypesMatch(type, t))) {
            score += 10;
            primaryMatched = true;
          }
          
          // Check secondary types with synonym matching
          if (secondaryTypes.some(t => doCreatureTypesMatch(type, t))) {
            score += 7; // Increased from 5 to 7
            secondaryMatched = true;
          }
          
          // Bonus: Deck has this creature type in BOTH primary AND secondary
          if (primaryMatched && secondaryMatched) {
            score += 3; // Total: 10 + 7 + 3 = 20 points
          }
        });
        
        // Match themes from custom text
        parsedInput.themes.forEach(theme => {
          const deckThemes = (tags.themes || []).map(t => t.toLowerCase());
          if (deckThemes.some(dt => dt.includes(theme.toLowerCase()) || theme.toLowerCase().includes(dt))) {
            score += 5;
          }
        });
        
        // Match IPs from custom text
        parsedInput.ips.forEach(ip => {
          if (tags.intellectual_property?.toLowerCase() === ip.toLowerCase()) {
            score += 8;
          }
        });
      } else {
        // VIBE MATCHING (high weight) - button selections WITH SYNONYM SUPPORT
        if (userPreferences.vibe) {
          const vibe = userPreferences.vibe;
          const primaryVibes = (tags.aesthetic_vibe?.primary || []);
          const secondaryVibes = (tags.aesthetic_vibe?.secondary || []);
          
          let primaryMatched = false;
          let secondaryMatched = false;
          
          // Check primary vibes with synonym matching
          if (primaryVibes.some(v => doVibesMatch(vibe, v))) {
            score += 10; // Primary match
            primaryMatched = true;
          }
          
          // Check secondary vibes with synonym matching
          if (secondaryVibes.some(v => doVibesMatch(vibe, v))) {
            score += 7; // Secondary match (increased from 5)
            secondaryMatched = true;
          }
          
          // Bonus: Deck has this vibe in BOTH primary AND secondary
          if (primaryMatched && secondaryMatched) {
            score += 3;
          }
        }
        
        // CREATURE TYPE MATCHING - handle multiple selections (array) WITH SYNONYM SUPPORT
        if (userPreferences.creatureType) {
          const creatureTypes = Array.isArray(userPreferences.creatureType) 
            ? userPreferences.creatureType 
            : [userPreferences.creatureType];
          
          let matchCount = 0;
          creatureTypes.forEach(type => {
            const primaryTypes = (tags.creature_types?.primary || []);
            const secondaryTypes = (tags.creature_types?.secondary || []);
            
            let primaryMatched = false;
            let secondaryMatched = false;
            
            // Check primary types with synonym matching
            if (primaryTypes.some(t => doCreatureTypesMatch(type, t))) {
              score += 10;
              matchCount++;
              primaryMatched = true;
            }
            
            // Check secondary types with synonym matching
            if (secondaryTypes.some(t => doCreatureTypesMatch(type, t))) {
              score += 7; // Increased from 5 to 7
              matchCount++;
              secondaryMatched = true;
            }
            
            // Bonus: Deck has this creature type in BOTH primary AND secondary
            if (primaryMatched && secondaryMatched) {
              score += 3;
            }
          });
          
          // Fuzzy matching fallback after exact + synonym matching
          // Only apply if we got zero matches
          if (matchCount === 0) {
            creatureTypes.forEach(type => {
              const primaryTypes = (tags.creature_types?.primary || []);
              const secondaryTypes = (tags.creature_types?.secondary || []);
              
              // Fuzzy string matching with 80% similarity threshold
              primaryTypes.forEach(deckType => {
                if (calculateStringSimilarity(type, deckType) >= 0.8) {
                  score += 5; // Lower score for fuzzy match
                  matchCount++;
                }
              });
              
              secondaryTypes.forEach(deckType => {
                if (calculateStringSimilarity(type, deckType) >= 0.8) {
                  score += 3;
                  matchCount++;
                }
              });
            });
          }
          
          // Bonus for matching multiple creature types
          if (matchCount >= 2) {
            score += 5; // 1.5x equivalent bonus
          }
          if (matchCount >= 3) {
            score += 10; // 2x equivalent bonus
          }
        }
      }
      
    } else if (pathType === "power") {
      // POWER PATH SCORING
      
      // ARCHETYPE MATCHING WITH SYNONYM SUPPORT
      if (userPreferences.archetype) {
        const archetype = userPreferences.archetype;
        const primaryArchetypes = (tags.archetype?.primary || []);
        const secondaryArchetypes = (tags.archetype?.secondary || []);
        
        let primaryMatched = false;
        let secondaryMatched = false;
        
        // Check primary archetypes with synonym matching
        if (primaryArchetypes.some(a => doArchetypesMatch(archetype, a))) {
          score += 10; // Primary match
          primaryMatched = true;
        }
        
        // Check secondary archetypes with synonym matching
        if (secondaryArchetypes.some(a => doArchetypesMatch(archetype, a))) {
          score += 7; // Secondary match (increased from 5)
          secondaryMatched = true;
        }
        
        // Bonus: Deck has this archetype in BOTH primary AND secondary
        if (primaryMatched && secondaryMatched) {
          score += 3;
        }
        
        // Fuzzy matching fallback for archetypes
        if (!primaryMatched && !secondaryMatched) {
          [...primaryArchetypes, ...secondaryArchetypes].forEach(deckArchetype => {
            if (calculateStringSimilarity(archetype, deckArchetype) >= 0.8) {
              score += 4; // Lower score for fuzzy match
            }
          });
        }
      }
      
      // POWER LEVEL MATCHING
      if (userPreferences.powerLevelRange) {
        const preconPower = tags.power_level || 5;
        const [minPower, maxPower] = userPreferences.powerLevelRange;
        
        // Exact match within range
        if (preconPower >= minPower && preconPower <= maxPower) {
          score += 8;
        } 
        // Within 1 of range
        else if (preconPower === minPower - 1 || preconPower === maxPower + 1) {
          score += 4;
        }
      }
      
      // COLOR PREFERENCE MATCHING
      if (userPreferences.colorPreference && Array.isArray(userPreferences.colorPreference) && userPreferences.colorPreference.length > 0) {
        const preferredColors = userPreferences.colorPreference;
        const deckColors = precon.colors || [];
        
        // Check if deck contains any of the preferred colors
        const matchingColors = deckColors.filter(color => preferredColors.includes(color));
        
        if (matchingColors.length > 0) {
          // Score based on how many colors match
          score += matchingColors.length * 3;
          
          // Bonus if deck only uses preferred colors
          const allColorsMatch = deckColors.every(color => preferredColors.includes(color));
          if (allColorsMatch && deckColors.length > 0) {
            score += 5;
          }
        }
      }
    }
    
    // For pop_culture path, prefer power level 6-7
    if (pathType === "pop_culture") {
      const powerLevel = tags.power_level || 5;
      if (powerLevel >= 6 && powerLevel <= 7) {
        score += 5; // Bonus for ideal power level
      }
    }
    
    // Generate match reasons (using normalized comparisons)
    const reasons = [];
    
    if (pathType === "vibes") {
      if (userPreferences.vibe) {
        const vibe = userPreferences.vibe;
        const primaryVibes = (tags.aesthetic_vibe?.primary || []);
        if (primaryVibes.some(v => doVibesMatch(vibe, v))) {
          reasons.push(`Perfect ${vibe} vibe`);
        }
      }
      if (userPreferences.creatureType) {
        const creatureTypes = Array.isArray(userPreferences.creatureType) 
          ? userPreferences.creatureType 
          : [userPreferences.creatureType];
        
        creatureTypes.forEach(type => {
          const primaryTypes = (tags.creature_types?.primary || []);
          if (primaryTypes.some(t => doCreatureTypesMatch(type, t))) {
            reasons.push(`Focuses on ${type}s`);
          }
        });
      }
    } else if (pathType === "power") {
      if (userPreferences.archetype) {
        const archetype = userPreferences.archetype;
        const primaryArchetypes = (tags.archetype?.primary || []);
        if (primaryArchetypes.some(a => doArchetypesMatch(archetype, a))) {
          reasons.push(`${archetype.charAt(0).toUpperCase() + archetype.slice(1)} strategy`);
        }
      }
      if (userPreferences.powerLevelRange) {
        const preconPower = tags.power_level || 5;
        reasons.push(`Rated ${preconPower}/10 competitive - Perfect for your skill level`);
      }
    }
    
    reasons.push(`${tags.complexity || 'moderate'} difficulty to play`);
    
    // Keep raw match score separate from tiebreakers
    const rawScore = score;
    
    // Add tiebreaker factors ONLY for sorting (not for percentage calculation)
    let tiebreakerScore = 0;
    
    // 1. Variety bonus - decks with more diverse tags get slight bonus
    const tagCount = Object.keys(tags).length;
    tiebreakerScore += tagCount * 0.5;
    
    // 2. Recency factor - newer decks get tiny bonus
    if (precon.year) {
      tiebreakerScore += (precon.year - 2010) * 0.1;
    }
    
    // 3. Randomization tiebreaker - add 0-2 random points to break exact ties
    tiebreakerScore += Math.random() * 2;
    
    const finalScore = rawScore + tiebreakerScore;
    
    return { 
      precon, 
      rawScore,        // For percentage calculation
      score: finalScore, // For sorting only
      reasons,
      customText: parsedInput?.rawText || null,
      isCustomInput 
    };
  });
  
  // Sort by score descending
  scoredPrecons.sort((a, b) => b.score - a.score);
  
  // Return top 15 results for better replacement options
  return scoredPrecons.slice(0, 15);
}

/**
 * Calculate string similarity (Levenshtein distance based)
 * Returns value between 0 and 1 (1 = exact match)
 */
function calculateStringSimilarity(str1, str2) {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;
  
  if (longer.length === 0) return 1.0;
  
  const editDistance = levenshteinDistance(longer.toLowerCase(), shorter.toLowerCase());
  return (longer.length - editDistance) / longer.length;
}

/**
 * Calculate Levenshtein distance between two strings
 */
function levenshteinDistance(str1, str2) {
  const matrix = [];
  
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  
  return matrix[str2.length][str1.length];
}
