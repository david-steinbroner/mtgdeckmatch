// Temporary utility to extract all deck IDs from precons-data.json
import preconsData from './src/data/precons-data.json' assert { type: 'json' };
import { deckELI5 } from './src/utils/deckDescriptions.ts';

const allDeckIds = preconsData.map(deck => deck.id).sort();
const existingDescriptionIds = Object.keys(deckELI5).sort();

console.log('=== TOTAL COUNTS ===');
console.log(`Total decks in precons-data.json: ${allDeckIds.length}`);
console.log(`Total descriptions in deckELI5: ${existingDescriptionIds.length}`);
console.log('');

console.log('=== MISSING DESCRIPTIONS (in precons-data.json but NOT in deckELI5) ===');
const missingDescriptions = allDeckIds.filter(id => !existingDescriptionIds.includes(id));
console.log(`Count: ${missingDescriptions.length}`);
missingDescriptions.forEach(id => {
  const deck = preconsData.find(d => d.id === id);
  console.log(`"${id}": "${deck.name}" - Commander: ${deck.commander}`);
});
console.log('');

console.log('=== EXTRA DESCRIPTIONS (in deckELI5 but NOT in precons-data.json) ===');
const extraDescriptions = existingDescriptionIds.filter(id => !allDeckIds.includes(id));
console.log(`Count: ${extraDescriptions.length}`);
extraDescriptions.forEach(id => {
  console.log(`"${id}"`);
});
console.log('');

console.log('=== ALL DECK IDs IN precons-data.json (for reference) ===');
console.log(JSON.stringify(allDeckIds, null, 2));
