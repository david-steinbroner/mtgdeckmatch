import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface CardImageModalProps {
  imageUrl: string;
  cardName: string;
  deckName: string;
  triggerClassName?: string;
  imageClassName?: string;
}

export const CardImageModal = ({ imageUrl, cardName, deckName, triggerClassName, imageClassName }: CardImageModalProps) => {
  const [imgError, setImgError] = useState(false);
  
  // Fallback placeholder if image fails to load
  const fallbackUrl = "https://api.scryfall.com/cards/named?format=image&exact=Plains";
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className={cn(
          "cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary rounded-lg transition-all hover:opacity-90",
          triggerClassName
        )}>
          <img
            src={imgError ? fallbackUrl : imageUrl}
            alt={`${cardName} - Commander of ${deckName}`}
            className={cn("rounded-lg object-contain", imageClassName)}
            loading="lazy"
            onError={() => setImgError(true)}
          />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md p-6 border-0 bg-transparent">
        <div className="relative">
          <img
            src={imgError ? fallbackUrl : imageUrl}
            alt={`${cardName} - Commander of ${deckName}`}
            className="w-full max-h-[85vh] object-contain rounded-lg"
            onError={() => setImgError(true)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
