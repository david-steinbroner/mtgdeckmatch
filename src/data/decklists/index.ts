/**
 * Decklist data for Commander precon decks
 * Each file contains the full 100-card list + highlight cards
 */

import type { Decklist } from "@/types/decklistTypes";

// Import decklist JSON files
import sampleFallout from './sample-fallout.json';

/**
 * Map of preconId to Decklist data
 * Add new decklists here as they're created
 */
const decklistsMap: Record<string, Decklist> = {
  'mutant-menace': sampleFallout as Decklist,
};

/**
 * Get decklist by preconId
 * Returns null if decklist not found
 */
export const getDecklistById = (preconId: string): Decklist | null => {
  return decklistsMap[preconId] || null;
};

/**
 * Check if a decklist exists for a given preconId
 */
export const hasDeckllist = (preconId: string): boolean => {
  return preconId in decklistsMap;
};

/**
 * Get all available decklists
 */
export const getAllDecklists = (): Decklist[] => {
  return Object.values(decklistsMap);
};

/**
 * Get all preconIds that have decklists
 */
export const getAvailablePreconIds = (): string[] => {
  return Object.keys(decklistsMap);
};
