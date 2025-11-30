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

// Manual name corrections for cards with wrong names in database
const NAME_CORRECTIONS = {
  "Valgavoth, Harvester of Souls": "Valgavoth, Terror Eater",
  "Stella, Wild Card": "Stella Lee, Wild Card",
};

async function fetchScryfallImageUrl(cardName) {
  // Check if we need to correct the card name
  const correctedName = NAME_CORRECTIONS[cardName] || cardName;
  if (correctedName !== cardName) {
    console.log(`  🔧 Correcting name: "${cardName}" → "${correctedName}"`);
  }

  try {
    // Try exact search first
    const encodedName = encodeURIComponent(correctedName);
    const url = `https://api.scryfall.com/cards/named?exact=${encodedName}`;

    console.log(`Fetching: ${correctedName}...`);
    const response = await fetch(url);

    if (!response.ok) {
      console.warn(`  ⚠️  Exact match not found: ${correctedName} (${response.status})`);
      // Try fuzzy search as fallback
      return await fetchWithFuzzySearch(correctedName);
    }

    const data = await response.json();

    // Handle double-faced cards (DFC)
    // Check card_faces first (for DFCs), then image_uris (for regular cards)
    let imageUrl = null;

    if (data.card_faces && data.card_faces.length > 0) {
      // Double-faced card - use front face
      imageUrl = data.card_faces[0].image_uris?.large || data.card_faces[0].image_uris?.normal;
      if (imageUrl) {
        console.log(`  ✓ Found (DFC): ${imageUrl.substring(0, 60)}...`);
      }
    } else {
      // Regular single-faced card
      imageUrl = data.image_uris?.large || data.image_uris?.normal;
      if (imageUrl) {
        console.log(`  ✓ Found: ${imageUrl.substring(0, 60)}...`);
      }
    }

    if (!imageUrl) {
      console.warn(`  ⚠️  No image_uris found for: ${correctedName}`);
    }

    return imageUrl;
  } catch (error) {
    console.error(`  ✗ Error fetching ${correctedName}:`, error.message);
    return null;
  }
}

async function fetchWithFuzzySearch(cardName) {
  try {
    console.log(`  🔍 Trying fuzzy search for: ${cardName}...`);
    const encodedQuery = encodeURIComponent(cardName);
    const url = `https://api.scryfall.com/cards/named?fuzzy=${encodedQuery}`;

    const response = await fetch(url);

    if (!response.ok) {
      console.warn(`  ⚠️  Fuzzy search failed: ${cardName}`);
      return null;
    }

    const data = await response.json();

    // Handle double-faced cards
    let imageUrl = null;
    if (data.card_faces && data.card_faces.length > 0) {
      imageUrl = data.card_faces[0].image_uris?.large || data.card_faces[0].image_uris?.normal;
      if (imageUrl) {
        console.log(`  ✓ Found via fuzzy (DFC): "${data.name}" - ${imageUrl.substring(0, 60)}...`);
      }
    } else {
      imageUrl = data.image_uris?.large || data.image_uris?.normal;
      if (imageUrl) {
        console.log(`  ✓ Found via fuzzy: "${data.name}" - ${imageUrl.substring(0, 60)}...`);
      }
    }

    return imageUrl;
  } catch (error) {
    console.warn(`  ⚠️  Fuzzy search error: ${error.message}`);
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
