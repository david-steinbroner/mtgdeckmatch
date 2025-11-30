/**
 * Script to fetch and populate real Scryfall image URLs for all commander cards
 * This replaces placeholder URLs with actual card images
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Add delay between requests to avoid rate limiting
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchScryfallImageUrl(cardName) {
  try {
    const encodedName = encodeURIComponent(cardName);
    const url = `https://api.scryfall.com/cards/named?exact=${encodedName}`;

    console.log(`Fetching: ${cardName}...`);
    const response = await fetch(url);

    if (!response.ok) {
      console.warn(`  ⚠️  Card not found: ${cardName} (${response.status})`);
      return null;
    }

    const data = await response.json();

    // Get the best quality image URL
    // Prefer 'large' size for good quality without being too big
    const imageUrl = data.image_uris?.large || data.image_uris?.normal || null;

    if (imageUrl) {
      console.log(`  ✓ Found: ${imageUrl.substring(0, 60)}...`);
    } else {
      console.warn(`  ⚠️  No image_uris found for: ${cardName}`);
    }

    return imageUrl;
  } catch (error) {
    console.error(`  ✗ Error fetching ${cardName}:`, error.message);
    return null;
  }
}

async function updateCommanderImages() {
  const dataPath = path.join(__dirname, 'src', 'data', 'precons-data.json');

  console.log('Reading precons-data.json...\n');
  const rawData = fs.readFileSync(dataPath, 'utf8');
  const decks = JSON.parse(rawData);

  console.log(`Found ${decks.length} decks to process\n`);

  let successCount = 0;
  let failCount = 0;
  let skippedCount = 0;

  for (let i = 0; i < decks.length; i++) {
    const deck = decks[i];
    const commanderCard = deck.cards?.find(card => card.is_commander);

    if (!commanderCard) {
      console.log(`Deck ${i + 1}/${decks.length}: ${deck.name} - No commander card found, skipping`);
      skippedCount++;
      continue;
    }

    // Check if already has a valid (non-placeholder) image URL
    const hasPlaceholder = !commanderCard.image_url ||
                          commanderCard.image_url.includes('placeholder') ||
                          commanderCard.image_url.includes('/x/x/');

    if (!hasPlaceholder) {
      console.log(`Deck ${i + 1}/${decks.length}: ${deck.name} - Already has valid image, skipping`);
      skippedCount++;
      continue;
    }

    console.log(`\nDeck ${i + 1}/${decks.length}: ${deck.name}`);
    console.log(`Commander: ${deck.commander}`);

    const imageUrl = await fetchScryfallImageUrl(deck.commander);

    if (imageUrl) {
      commanderCard.image_url = imageUrl;
      successCount++;
    } else {
      failCount++;
      // Keep placeholder URL so the fallback logic works
    }

    // Rate limiting: Wait 100ms between requests (max 10 requests/second)
    await delay(100);
  }

  console.log('\n' + '='.repeat(60));
  console.log('Summary:');
  console.log(`  ✓ Successfully fetched: ${successCount}`);
  console.log(`  ✗ Failed to fetch: ${failCount}`);
  console.log(`  ⊘ Skipped (already valid): ${skippedCount}`);
  console.log('='.repeat(60) + '\n');

  // Write updated data back to file
  console.log('Writing updated data to precons-data.json...');
  fs.writeFileSync(dataPath, JSON.stringify(decks, null, 2), 'utf8');
  console.log('✓ Done!\n');

  if (failCount > 0) {
    console.log('⚠️  Some cards failed to fetch. These will continue using Scryfall API fallback.');
    console.log('   This is expected for very new cards (2025) that might not be in Scryfall yet.\n');
  }
}

// Run the script
updateCommanderImages().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
