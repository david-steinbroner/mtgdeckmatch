/**
 * Constructs a Scryfall API URL for fetching a card image by exact name
 * @param cardName - The exact name of the Magic card
 * @returns The Scryfall API URL for the card image
 */
export const getScryfallImageUrl = (cardName: string): string => {
  const encodedName = encodeURIComponent(cardName);
  return `https://api.scryfall.com/cards/named?format=image&exact=${encodedName}`;
};

/**
 * Checks if a URL is a placeholder or invalid
 * @param url - The image URL to check
 * @returns true if the URL is a placeholder or invalid
 */
export const isPlaceholderUrl = (url: string): boolean => {
  if (!url) return true;
  return url.includes('placeholder') || url.includes('/x/x/');
};
