/**
 * Validates that all quiz options have matching decks in precons-data.json
 * Run with: npm run validate-quiz
 * 
 * This script checks:
 * - Creature type options have decks with those creature types
 * - Vibe options have decks with those vibes
 * - Archetype options have decks with those archetypes
 * 
 * Reports:
 * - ERROR: Options with zero matching decks (MUST FIX)
 * - WARNING: Options with < 3 matching decks (review recommended)
 * - OK: Options with sufficient matches
 */

import preconsData from '../data/precons-data.json';
import { vibeQuestion, creatureTypeQuestions } from '../data/vibes-questions';
import { powerQuestions } from '../data/power-questions';
import { 
  doCreatureTypesMatch, 
  doVibesMatch, 
  doArchetypesMatch 
} from '../utils/synonymMapper';

interface ValidationResult {
  category: string;
  option: string;
  matchCount: number;
  status: 'OK' | 'WARNING' | 'ERROR';
  message: string;
}

const results: ValidationResult[] = [];

// Validate creature types for each vibe category
function validateCreatureTypes() {
  Object.entries(creatureTypeQuestions).forEach(([vibe, question]) => {
    question.options?.forEach(option => {
      const matchingDecks = preconsData.filter(deck => {
        const primaryTypes = deck.tags?.creature_types?.primary || [];
        const secondaryTypes = deck.tags?.creature_types?.secondary || [];
        
        // Check if any deck tag matches the option using synonym matching
        return [...primaryTypes, ...secondaryTypes].some(deckType => 
          doCreatureTypesMatch(option.id, deckType)
        );
      });
      
      const status = matchingDecks.length === 0 ? 'ERROR' : 
                     matchingDecks.length < 3 ? 'WARNING' : 'OK';
      
      results.push({
        category: `${vibe} creatures`,
        option: option.title,
        matchCount: matchingDecks.length,
        status,
        message: status === 'ERROR' 
          ? `ZERO decks match "${option.id}" - REMOVE THIS OPTION`
          : status === 'WARNING'
          ? `Only ${matchingDecks.length} deck(s) match - consider if this is enough`
          : `${matchingDecks.length} decks found`
      });
    });
  });
}

// Validate vibe options
function validateVibes() {
  vibeQuestion.options?.forEach(option => {
    const matchingDecks = preconsData.filter(deck => {
      const primaryVibes = deck.tags?.aesthetic_vibe?.primary || [];
      const secondaryVibes = deck.tags?.aesthetic_vibe?.secondary || [];
      
      // Check if any deck tag matches the option using synonym matching
      return [...primaryVibes, ...secondaryVibes].some(deckVibe => 
        doVibesMatch(option.id, deckVibe)
      );
    });
    
    const status = matchingDecks.length === 0 ? 'ERROR' : 
                   matchingDecks.length < 5 ? 'WARNING' : 'OK';
    
    results.push({
      category: 'vibes',
      option: option.title,
      matchCount: matchingDecks.length,
      status,
      message: status === 'ERROR' 
        ? `ZERO decks match "${option.id}" vibe - CRITICAL ERROR`
        : `${matchingDecks.length} decks found`
    });
  });
}

// Validate archetype options
function validateArchetypes() {
  const archetypeQuestion = powerQuestions.find(q => q.id === 'archetype');
  archetypeQuestion?.options?.forEach(option => {
    const matchingDecks = preconsData.filter(deck => {
      const primaryArchetypes = deck.tags?.archetype?.primary || [];
      const secondaryArchetypes = deck.tags?.archetype?.secondary || [];
      
      // Check if any deck tag matches the option using synonym matching
      return [...primaryArchetypes, ...secondaryArchetypes].some(deckArchetype => 
        doArchetypesMatch(option.id, deckArchetype)
      );
    });
    
    const status = matchingDecks.length === 0 ? 'ERROR' : 
                   matchingDecks.length < 5 ? 'WARNING' : 'OK';
    
    results.push({
      category: 'archetypes',
      option: option.title,
      matchCount: matchingDecks.length,
      status,
      message: status === 'ERROR'
        ? `ZERO decks match "${option.id}" archetype - CRITICAL ERROR`
        : `${matchingDecks.length} decks found`
    });
  });
}

// Run all validations
function runValidation() {
  console.log('🔍 VALIDATING QUIZ OPTIONS AGAINST DECK DATA...\n');
  
  validateVibes();
  validateCreatureTypes();
  validateArchetypes();
  
  // Sort by status (ERROR first)
  results.sort((a, b) => {
    if (a.status === 'ERROR' && b.status !== 'ERROR') return -1;
    if (a.status !== 'ERROR' && b.status === 'ERROR') return 1;
    if (a.status === 'WARNING' && b.status === 'OK') return -1;
    if (a.status === 'OK' && b.status === 'WARNING') return 1;
    return 0;
  });
  
  // Print results
  const errors = results.filter(r => r.status === 'ERROR');
  const warnings = results.filter(r => r.status === 'WARNING');
  const success = results.filter(r => r.status === 'OK');
  
  if (errors.length > 0) {
    console.log('❌ CRITICAL ERRORS (must fix):\n');
    errors.forEach(r => {
      console.log(`  [${r.category}] ${r.option}: ${r.message}`);
    });
    console.log('');
  }
  
  if (warnings.length > 0) {
    console.log('⚠️  WARNINGS (review recommended):\n');
    warnings.forEach(r => {
      console.log(`  [${r.category}] ${r.option}: ${r.message}`);
    });
    console.log('');
  }
  
  console.log(`✅ SUCCESS: ${success.length} options validated\n`);
  
  console.log('SUMMARY:');
  console.log(`  Total options checked: ${results.length}`);
  console.log(`  ❌ Errors: ${errors.length}`);
  console.log(`  ⚠️  Warnings: ${warnings.length}`);
  console.log(`  ✅ OK: ${success.length}`);
  
  // Exit with error code if critical errors found
  if (errors.length > 0) {
    process.exit(1);
  }
}

runValidation();
