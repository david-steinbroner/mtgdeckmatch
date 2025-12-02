import { Button } from "@/components/ui/button";
import { HighlightCards } from "@/components/HighlightCards";
import { DecklistAccordion } from "@/components/DecklistAccordion";
import { ExternalLink } from "lucide-react";
import type { Decklist } from "@/types/decklistTypes";
import { calculateDecklistCounts } from "@/types/decklistTypes";

interface DecklistViewProps {
  decklist: Decklist;
  deckName: string;
  onBuyClick?: () => void;
}

/**
 * Full decklist view combining highlight cards and accordion
 * Features:
 * - Deck header with name and card count
 * - Highlight cards section
 * - Full decklist accordion
 * - Buy button
 */
export const DecklistView = ({ decklist, deckName, onBuyClick }: DecklistViewProps) => {
  const counts = calculateDecklistCounts(decklist);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2 pb-6 border-b border-border">
        <h2 className="text-3xl font-bold text-foreground">
          {deckName}
        </h2>
        <p className="text-muted-foreground">
          {counts.total} cards · Ready to play out of the box
        </p>
      </div>

      {/* Highlight Cards Section */}
      {decklist.highlightCards && decklist.highlightCards.length > 0 && (
        <div className="pb-6 border-b border-border">
          <HighlightCards highlightCards={decklist.highlightCards} />
        </div>
      )}

      {/* Full Decklist Section */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-foreground">
          Full Decklist
        </h3>
        <DecklistAccordion decklist={decklist} />
      </div>

      {/* Buy Button */}
      {onBuyClick && (
        <div className="pt-6 border-t border-border">
          <Button
            variant="default"
            size="lg"
            className="w-full flex items-center gap-2"
            onClick={onBuyClick}
          >
            <ExternalLink className="w-5 h-5" />
            Buy This Deck on TCGPlayer
          </Button>
        </div>
      )}
    </div>
  );
};
