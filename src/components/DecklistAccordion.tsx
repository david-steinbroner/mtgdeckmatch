import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CardImage } from "@/components/CardImage";
import { CardPreviewModal } from "@/components/CardPreviewModal";
import type { Decklist } from "@/types/decklistTypes";

interface DecklistAccordionProps {
  decklist: Decklist;
}

interface CardSection {
  id: string;
  title: string;
  cards: string[];
  defaultOpen?: boolean;
}

/**
 * Accordion component for displaying full decklist organized by card type
 * Features:
 * - Expandable sections for each card type
 * - Card counts in section headers
 * - Grid of card images when expanded
 * - Click card to enlarge
 * - Commander section expanded by default
 */
export const DecklistAccordion = ({ decklist }: DecklistAccordionProps) => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [showCardModal, setShowCardModal] = useState(false);

  const handleCardClick = (cardName: string) => {
    setSelectedCard(cardName);
    setShowCardModal(true);
  };

  // Build sections array
  const sections: CardSection[] = [
    {
      id: "commander",
      title: "Commander",
      cards: decklist.fullDecklist.commander,
      defaultOpen: true, // Commander section open by default
    },
    {
      id: "creatures",
      title: "Creatures",
      cards: decklist.fullDecklist.creatures,
    },
    {
      id: "instants-sorceries",
      title: "Instants & Sorceries",
      cards: decklist.fullDecklist.instantsSorceries,
    },
    {
      id: "artifacts-enchantments",
      title: "Artifacts & Enchantments",
      cards: decklist.fullDecklist.artifactsEnchantments,
    },
  ];

  // Add planeswalkers if present
  if (decklist.fullDecklist.planeswalkers && decklist.fullDecklist.planeswalkers.length > 0) {
    sections.push({
      id: "planeswalkers",
      title: "Planeswalkers",
      cards: decklist.fullDecklist.planeswalkers,
    });
  }

  // Add lands last
  sections.push({
    id: "lands",
    title: "Lands",
    cards: decklist.fullDecklist.lands,
  });

  return (
    <>
      <Accordion
        type="multiple"
        defaultValue={["commander"]} // Commander section open by default
        className="w-full space-y-2"
      >
        {sections.map((section) => (
          <AccordionItem
            key={section.id}
            value={section.id}
            className="border-2 border-border rounded-lg overflow-hidden"
          >
            <AccordionTrigger className="px-6 py-4 hover:bg-accent/50 transition-colors">
              <div className="flex items-center justify-between w-full">
                <span className="text-lg font-semibold">{section.title}</span>
                <span className="text-sm text-muted-foreground mr-2">
                  ({section.cards.length})
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 py-4 bg-muted/20">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {section.cards.map((cardName, index) => (
                  <div key={`${cardName}-${index}`} className="space-y-2">
                    <CardImage
                      cardName={cardName}
                      size="normal"
                      onClick={() => handleCardClick(cardName)}
                      lazy={true}
                    />
                    <p className="text-xs text-center text-foreground font-medium line-clamp-2 px-1">
                      {cardName}
                    </p>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Card Preview Modal */}
      <CardPreviewModal
        cardName={selectedCard}
        open={showCardModal}
        onClose={() => setShowCardModal(false)}
      />
    </>
  );
};
