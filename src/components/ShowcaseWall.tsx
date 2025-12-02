import { useState, useMemo } from "react";
import { ShowcaseCard } from "@/components/ShowcaseCard";
import { DeckDetailModal } from "@/components/DeckDetailModal";
import preconsData from "@/data/precons-data.json";

interface ShowcaseWallProps {
  deckCount?: number;
}

/**
 * Shuffle array helper using Fisher-Yates algorithm
 */
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Get a diverse selection of decks for the showcase wall
 * Shuffles all decks and takes the first N
 */
const getShowcaseDecks = (allDecks: any[], count: number = 15) => {
  return shuffleArray(allDecks).slice(0, count);
};

export const ShowcaseWall = ({ deckCount = 15 }: ShowcaseWallProps) => {
  const [selectedDeck, setSelectedDeck] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Memoize the shuffled decks so they don't change on re-render
  // The empty dependency array means this will only run once on mount
  const showcaseDecks = useMemo(
    () => getShowcaseDecks(preconsData, deckCount),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [] // Intentionally empty - we want randomization only on mount
  );

  const handleDeckClick = (deck: any) => {
    setSelectedDeck(deck);
    setShowModal(true);
  };

  return (
    <>
      {/* Showcase Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {showcaseDecks.map((deck) => (
          <ShowcaseCard
            key={deck.id}
            deck={deck}
            onClick={() => handleDeckClick(deck)}
          />
        ))}
      </div>

      {/* Deck Detail Modal */}
      <DeckDetailModal
        deck={selectedDeck}
        open={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
};
