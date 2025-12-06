import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCommanderCard, getColorSymbol } from "@/utils/deckHelpers";
import { deckDifficulty } from "@/utils/deckDifficulty";
import { getDecklistById, hasDeckllist } from "@/data/decklists";
import { DecklistView } from "@/components/DecklistView";
import { ExternalLink, List } from "lucide-react";

interface DeckDetailModalProps {
  deck: any | null;
  open: boolean;
  onClose: () => void;
}

export const DeckDetailModal = ({ deck, open, onClose }: DeckDetailModalProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  // Handle browser back button to close modal instead of navigating away
  useEffect(() => {
    if (open) {
      // Push a history state when modal opens
      window.history.pushState({ modal: true }, '');

      const handlePopState = () => {
        onClose();
      };

      window.addEventListener('popstate', handlePopState);

      return () => {
        window.removeEventListener('popstate', handlePopState);
      };
    }
  }, [open, onClose]);

  if (!deck) return null;

  const commanderCard = getCommanderCard(deck);
  const difficultyInfo = deckDifficulty[deck.id];
  const decklist = getDecklistById(deck.id);
  const hasDecklist = hasDeckllist(deck.id);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {deck.name}
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Tab Headers */}
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="decklist" disabled={!hasDecklist}>
              <List className="w-4 h-4 mr-2" />
              Full Decklist
              {!hasDecklist && <span className="ml-2 text-xs">(Coming Soon)</span>}
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <ScrollArea className="max-h-[60vh] pr-4">
              <div className="space-y-6">
            {/* Commander Section */}
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <span className="text-xl">👑</span>
                Commander
              </h3>
              <div className="border-2 border-primary/20 rounded-lg p-4 bg-accent/5">
                <h4 className="font-bold text-lg mb-2">{deck.commander}</h4>

                {/* Colors */}
                <div className="flex gap-1 mb-3">
                  {deck.colors.map((color: string) => (
                    <span key={color} className="text-lg">
                      {getColorSymbol(color)}
                    </span>
                  ))}
                </div>

                {/* Oracle Text */}
                {commanderCard?.oracle_text && (
                  <p className="text-sm text-muted-foreground italic leading-relaxed whitespace-pre-line">
                    {commanderCard.oracle_text}
                  </p>
                )}
              </div>
            </div>

            {/* Deck Info */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Deck Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Set</p>
                  <p className="font-medium">{deck.set}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Release Year</p>
                  <p className="font-medium">{deck.year}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Power Level</p>
                  <p className="font-medium">{deck.tags?.power_level || 'N/A'}/10</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Difficulty</p>
                  <p className="font-medium">
                    {difficultyInfo ? `${difficultyInfo.difficulty}/10` : 'TBD'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Complexity</p>
                  <p className="font-medium capitalize">
                    {deck.tags?.complexity || 'Unknown'}
                  </p>
                </div>
              </div>
            </div>

            {/* Themes & Strategy */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Strategy & Themes</h3>
              <div className="space-y-3">
                {deck.tags?.themes?.primary && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Primary Themes</p>
                    <div className="flex flex-wrap gap-2">
                      {deck.tags.themes.primary.map((theme: string) => (
                        <Badge key={theme} variant="default">{theme}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                {deck.tags?.archetype?.primary && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Archetype</p>
                    <div className="flex flex-wrap gap-2">
                      {deck.tags.archetype.primary.map((arch: string) => (
                        <Badge key={arch} variant="secondary">{arch}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                {deck.tags?.play_pattern?.primary && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Play Pattern</p>
                    <div className="flex flex-wrap gap-2">
                      {deck.tags.play_pattern.primary.map((pattern: string) => (
                        <Badge key={pattern} variant="outline">{pattern}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Full Decklist availability note */}
            {hasDecklist ? (
              <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
                <p className="text-sm text-foreground">
                  <strong className="flex items-center gap-2">
                    <List className="w-4 h-4" />
                    Full decklist available!
                  </strong>
                  <span className="text-muted-foreground">
                    Click the "Full Decklist" tab above to see all 100 cards in this deck.
                  </span>
                </p>
              </div>
            ) : (
              <div className="bg-muted/30 rounded-lg p-4 border border-border">
                <p className="text-sm text-muted-foreground">
                  <strong>Note:</strong> Full decklist coming soon! For now, visit TCGPlayer to view the complete card list.
                </p>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Overview Actions */}
        <div className="flex gap-3 pt-4 border-t">
          <Button
            variant="default"
            className="flex-1"
            onClick={() => {
              const searchQuery = encodeURIComponent(deck.name + " commander deck");
              window.open(`https://www.tcgplayer.com/search/magic/product?productLineName=magic&q=${searchQuery}&view=grid`, "_blank");
            }}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            View on TCGPlayer
          </Button>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </TabsContent>

      {/* Decklist Tab */}
      <TabsContent value="decklist">
        {decklist && (
          <ScrollArea className="max-h-[65vh] pr-4">
            <DecklistView
              decklist={decklist}
              deckName={deck.name}
              onBuyClick={() => {
                const searchQuery = encodeURIComponent(deck.name + " commander deck");
                window.open(`https://www.tcgplayer.com/search/magic/product?productLineName=magic&q=${searchQuery}&view=grid`, "_blank");
              }}
            />
          </ScrollArea>
        )}
      </TabsContent>
    </Tabs>
      </DialogContent>
    </Dialog>
  );
};
