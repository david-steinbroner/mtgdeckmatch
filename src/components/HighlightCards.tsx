import { useState } from "react";
import { CardImage } from "@/components/CardImage";
import { CardPreviewModal } from "@/components/CardPreviewModal";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Sparkles } from "lucide-react";
import type { HighlightCard } from "@/types/decklistTypes";

interface HighlightCardsProps {
  highlightCards: HighlightCard[];
}

/**
 * Component for showcasing key/highlight cards in a deck
 * Features:
 * - Horizontal scroll on mobile
 * - Tooltips with "why it's cool" descriptions
 * - Click to enlarge
 * - Visual emphasis on important cards
 */
export const HighlightCards = ({ highlightCards }: HighlightCardsProps) => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [showCardModal, setShowCardModal] = useState(false);

  const handleCardClick = (cardName: string) => {
    setSelectedCard(cardName);
    setShowCardModal(true);
  };

  if (!highlightCards || highlightCards.length === 0) {
    return null;
  }

  return (
    <TooltipProvider>
      <div className="space-y-4">
        {/* Section Header */}
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <h3 className="text-xl font-bold text-foreground">
            Key Cards in This Deck
          </h3>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="overflow-x-auto pb-4 -mx-4 px-4">
          <div className="flex gap-4 min-w-max">
            {highlightCards.map((card, index) => (
              <Tooltip key={`${card.name}-${index}`}>
                <TooltipTrigger asChild>
                  <div className="flex-shrink-0 w-40 space-y-2 cursor-pointer">
                    <CardImage
                      cardName={card.name}
                      size="normal"
                      onClick={() => handleCardClick(card.name)}
                      lazy={false} // Don't lazy load highlights
                      className="ring-2 ring-primary/20 hover:ring-primary/60 transition-all"
                    />
                    <div className="text-center px-1">
                      <p className="text-sm font-semibold text-foreground line-clamp-2">
                        {card.name}
                      </p>
                      {card.cardType === 'commander' && (
                        <p className="text-xs text-primary font-medium mt-1">
                          Your Commander
                        </p>
                      )}
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="max-w-xs p-3"
                >
                  <p className="text-sm font-semibold mb-1">{card.name}</p>
                  <p className="text-xs leading-relaxed">{card.whyItsCool}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>

        {/* Mobile Scroll Hint */}
        <p className="text-xs text-muted-foreground text-center md:hidden">
          Scroll horizontally to see all key cards →
        </p>
      </div>

      {/* Card Preview Modal */}
      <CardPreviewModal
        cardName={selectedCard}
        open={showCardModal}
        onClose={() => setShowCardModal(false)}
      />
    </TooltipProvider>
  );
};
