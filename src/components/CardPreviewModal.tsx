import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink, X } from "lucide-react";
import { getCardImageUrl, fetchCardData, getScryfallPageUrl, type ScryfallCard } from "@/utils/scryfallApi";

interface CardPreviewModalProps {
  cardName: string | null;
  open: boolean;
  onClose: () => void;
}

/**
 * Modal for viewing an enlarged card with details
 * Features:
 * - Large card image
 * - Card oracle text
 * - Link to Scryfall page
 * - Keyboard navigation (ESC to close)
 */
export const CardPreviewModal = ({ cardName, open, onClose }: CardPreviewModalProps) => {
  const [cardData, setCardData] = useState<ScryfallCard | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch card data when modal opens
  useEffect(() => {
    if (!open || !cardName) {
      setCardData(null);
      return;
    }

    setIsLoading(true);
    fetchCardData(cardName)
      .then(data => {
        setCardData(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [cardName, open]);

  if (!cardName) return null;

  const imageUrl = getCardImageUrl(cardName, 'large');
  const scryfallUrl = getScryfallPageUrl(cardName);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] p-0 overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col md:flex-row gap-6 p-6">
          {/* Left side: Card Image */}
          <div className="flex-shrink-0 w-full md:w-auto">
            <div className="relative aspect-[5/7] w-full md:w-80 rounded-lg overflow-hidden bg-muted">
              <img
                src={imageUrl}
                alt={cardName}
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
          </div>

          {/* Right side: Card Details */}
          <div className="flex-1 space-y-4 overflow-y-auto">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-1">
                {cardName}
              </h2>
              {isLoading ? (
                <Skeleton className="h-5 w-48" />
              ) : (
                cardData && (
                  <p className="text-sm text-muted-foreground">
                    {cardData.type_line}
                  </p>
                )
              )}
            </div>

            {/* Mana Cost */}
            {!isLoading && cardData?.mana_cost && (
              <div>
                <p className="text-sm font-semibold text-muted-foreground mb-1">
                  Mana Cost
                </p>
                <p className="text-sm font-mono">{cardData.mana_cost}</p>
              </div>
            )}

            {/* Oracle Text */}
            {isLoading ? (
              <div className="space-y-2">
                <p className="text-sm font-semibold text-muted-foreground">
                  Oracle Text
                </p>
                <Skeleton className="h-20 w-full" />
              </div>
            ) : (
              cardData?.oracle_text && (
                <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-1">
                    Oracle Text
                  </p>
                  <p className="text-sm leading-relaxed whitespace-pre-line">
                    {cardData.oracle_text}
                  </p>
                </div>
              )
            )}

            {/* Price (if available) */}
            {!isLoading && cardData?.prices?.usd && (
              <div>
                <p className="text-sm font-semibold text-muted-foreground mb-1">
                  Price
                </p>
                <p className="text-sm">
                  ${cardData.prices.usd} USD
                </p>
              </div>
            )}

            {/* View on Scryfall Button */}
            <div className="pt-4 border-t border-border">
              <Button
                variant="outline"
                className="w-full flex items-center gap-2"
                onClick={() => window.open(scryfallUrl, '_blank')}
              >
                <ExternalLink className="w-4 h-4" />
                View on Scryfall
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
