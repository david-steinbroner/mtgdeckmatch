export function matchPrecons(precons, userPreferences) {
  const scoredPrecons = precons.map(precon => {
    let score = 0;
    const tags = precon.tags || {};
    
    // VIBE MATCHING (high weight)
    if (userPreferences.vibe) {
      const vibe = userPreferences.vibe.toLowerCase();
      const primaryVibes = (tags.aesthetic_vibe?.primary || []).map(v => v.toLowerCase());
      const secondaryVibes = (tags.aesthetic_vibe?.secondary || []).map(v => v.toLowerCase());
      
      if (primaryVibes.includes(vibe)) {
        score += 10; // Primary match
      } else if (secondaryVibes.includes(vibe)) {
        score += 5; // Secondary match
      }
    }
    
    // CREATURE TYPE MATCHING
    if (userPreferences.creatureType) {
      const type = userPreferences.creatureType.toLowerCase();
      const primaryTypes = (tags.creature_types?.primary || []).map(t => t.toLowerCase());
      const secondaryTypes = (tags.creature_types?.secondary || []).map(t => t.toLowerCase());
      
      if (primaryTypes.includes(type)) {
        score += 10;
      } else if (secondaryTypes.includes(type)) {
        score += 5;
      }
    }
    
    // COLOR MATCHING (must-have filter)
    if (userPreferences.colors && userPreferences.colors.length > 0) {
      const preconColors = new Set(precon.colors || []);
      const userColors = new Set(userPreferences.colors);
      
      // Precon colors must be subset of user's selected colors
      const isValidColorCombo = [...preconColors].every(c => userColors.has(c));
      if (!isValidColorCombo) {
        return null; // Eliminate this deck
      }
      
      // Bonus for exact match
      if (preconColors.size === userColors.size) {
        score += 5;
      }
    }
    
    // Generate match reasons
    const reasons = [];
    if (userPreferences.vibe) {
      const vibe = userPreferences.vibe.toLowerCase();
      if ((tags.aesthetic_vibe?.primary || []).map(v => v.toLowerCase()).includes(vibe)) {
        reasons.push(`Perfect ${vibe} vibe`);
      }
    }
    if (userPreferences.creatureType) {
      const type = userPreferences.creatureType.toLowerCase();
      if ((tags.creature_types?.primary || []).map(t => t.toLowerCase()).includes(type)) {
        reasons.push(`Focuses on ${type}s`);
      }
    }
    reasons.push(`Power level ${tags.power_level}/10`);
    reasons.push(`${tags.complexity || 'moderate'} to play`);
    
    return { precon, score, reasons };
  }).filter(result => result !== null); // Remove eliminated decks
  
  // Sort by score descending
  scoredPrecons.sort((a, b) => b.score - a.score);
  
  // Return top 3
  return scoredPrecons.slice(0, 3);
}
