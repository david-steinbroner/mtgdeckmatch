/**
 * Type definitions for precon decklists
 */

export interface HighlightCard {
  name: string;
  cardType: 'commander' | 'creature' | 'instant' | 'sorcery' | 'artifact' | 'enchantment' | 'planeswalker' | 'land';
  whyItsCool: string;
  scryfallId?: string; // Optional: for faster lookups
}

export interface Decklist {
  preconId: string; // Must match ID in precons-data.json
  highlightCards: HighlightCard[];
  fullDecklist: {
    commander: string[]; // Usually 1, but partners have 2
    creatures: string[];
    instantsSorceries: string[]; // Combined for simplicity
    artifactsEnchantments: string[]; // Combined for simplicity
    planeswalkers?: string[]; // Optional category
    lands: string[];
  };
}

/**
 * Helper type for card counts
 */
export interface DecklistCounts {
  commander: number;
  creatures: number;
  instantsSorceries: number;
  artifactsEnchantments: number;
  planeswalkers: number;
  lands: number;
  total: number;
}

/**
 * Calculate card counts from a decklist
 */
export const calculateDecklistCounts = (decklist: Decklist): DecklistCounts => {
  const { commander, creatures, instantsSorceries, artifactsEnchantments, planeswalkers = [], lands } = decklist.fullDecklist;

  return {
    commander: commander.length,
    creatures: creatures.length,
    instantsSorceries: instantsSorceries.length,
    artifactsEnchantments: artifactsEnchantments.length,
    planeswalkers: planeswalkers.length,
    lands: lands.length,
    total:
      commander.length +
      creatures.length +
      instantsSorceries.length +
      artifactsEnchantments.length +
      planeswalkers.length +
      lands.length,
  };
};
