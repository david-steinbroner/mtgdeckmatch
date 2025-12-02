/**
 * Scryfall API utilities for fetching Magic card data
 * API Documentation: https://scryfall.com/docs/api
 * Rate limit: 10 requests per second (very generous)
 */

const SCRYFALL_API = 'https://api.scryfall.com';

export type ImageSize = 'small' | 'normal' | 'large' | 'png' | 'art_crop' | 'border_crop';

/**
 * Get direct image URL for a card by exact name
 * This returns a URL that can be used directly in <img src="">
 *
 * @param cardName - Exact card name
 * @param size - Image size (small=146x204, normal=488x680, large=672x936)
 * @returns Direct URL to card image
 */
export const getCardImageUrl = (
  cardName: string,
  size: ImageSize = 'normal'
): string => {
  const encodedName = encodeURIComponent(cardName);
  return `${SCRYFALL_API}/cards/named?exact=${encodedName}&format=image&version=${size}`;
};

/**
 * Fetch full card data from Scryfall by exact name
 * Returns card object with oracle_text, type_line, mana_cost, etc.
 *
 * @param cardName - Exact card name
 * @returns Card data object or null if not found
 */
export const fetchCardData = async (cardName: string) => {
  try {
    const encodedName = encodeURIComponent(cardName);
    const response = await fetch(
      `${SCRYFALL_API}/cards/named?exact=${encodedName}`
    );

    if (!response.ok) {
      console.warn(`Card not found: ${cardName}`);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching card data for ${cardName}:`, error);
    return null;
  }
};

/**
 * Fetch card data by Scryfall ID (faster than name lookup)
 *
 * @param scryfallId - Scryfall card ID
 * @returns Card data object or null if not found
 */
export const fetchCardById = async (scryfallId: string) => {
  try {
    const response = await fetch(`${SCRYFALL_API}/cards/${scryfallId}`);

    if (!response.ok) {
      console.warn(`Card not found: ${scryfallId}`);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching card by ID ${scryfallId}:`, error);
    return null;
  }
};

/**
 * Rate limiting helper - Scryfall allows 10 req/sec
 * Use between consecutive requests to avoid rate limiting
 *
 * @param ms - Milliseconds to delay (default 100ms = 10 req/sec)
 */
export const delay = (ms: number = 100): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Search for cards by set code
 * Useful for bulk-loading precon decklists
 *
 * @param setCode - MTG set code (e.g., "woc" for Fallout Commander)
 * @param query - Additional search parameters
 * @returns Array of card objects
 */
export const searchCardsBySet = async (setCode: string, query: string = '') => {
  try {
    const searchQuery = `set:${setCode} ${query}`.trim();
    const encodedQuery = encodeURIComponent(searchQuery);
    const response = await fetch(
      `${SCRYFALL_API}/cards/search?q=${encodedQuery}`
    );

    if (!response.ok) {
      console.warn(`No cards found for set: ${setCode}`);
      return [];
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error(`Error searching set ${setCode}:`, error);
    return [];
  }
};

/**
 * Get Scryfall page URL for a card (for "View on Scryfall" links)
 *
 * @param cardName - Card name
 * @returns URL to card page on Scryfall
 */
export const getScryfallPageUrl = (cardName: string): string => {
  const encodedName = encodeURIComponent(cardName);
  return `https://scryfall.com/search?q=!"${encodedName}"`;
};

/**
 * Card data interface (subset of full Scryfall card object)
 */
export interface ScryfallCard {
  id: string;
  name: string;
  type_line: string;
  oracle_text?: string;
  mana_cost?: string;
  cmc: number;
  colors?: string[];
  color_identity?: string[];
  image_uris?: {
    small: string;
    normal: string;
    large: string;
    png: string;
    art_crop: string;
    border_crop: string;
  };
  prices?: {
    usd?: string;
    usd_foil?: string;
    eur?: string;
  };
  scryfall_uri: string;
}
