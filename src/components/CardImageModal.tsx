import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { X } from "lucide-react";

interface CardImageModalProps {
  imageUrl: string;
  cardName: string;
  deckName: string;
}

export const CardImageModal = ({ imageUrl, cardName, deckName }: CardImageModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary rounded-lg transition-all hover:opacity-90">
          <img
            src={imageUrl}
            alt={`${cardName} - Commander of ${deckName}`}
            className="w-full rounded-t-lg object-cover h-48 lg:h-56"
            loading="lazy"
          />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl p-0 border-0 bg-transparent">
        <div className="relative">
          <img
            src={imageUrl}
            alt={`${cardName} - Commander of ${deckName}`}
            className="w-full rounded-lg"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
