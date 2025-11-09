import { useState } from "react";
import { getScryfallImageUrl, isPlaceholderUrl } from "@/utils/cardImageUtils";
import { Sparkles } from "lucide-react";

interface CommanderCardImageProps {
  commanderCard: {
    name: string;
    image_url?: string;
    type_line?: string;
  };
  deckName: string;
}

export const CommanderCardImage = ({ commanderCard, deckName }: CommanderCardImageProps) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Determine the image URL to use
  const shouldUseScryfallApi = !commanderCard.image_url || isPlaceholderUrl(commanderCard.image_url);
  const imageUrl = shouldUseScryfallApi 
    ? getScryfallImageUrl(commanderCard.name)
    : commanderCard.image_url;

  const handleImageError = () => {
    console.error(`Failed to load image for: ${commanderCard.name}`, {
      attemptedUrl: imageUrl,
      usedScryfallApi: shouldUseScryfallApi
    });
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Show fallback if image fails to load
  if (imageError) {
    return (
      <div className="w-full h-80 overflow-hidden bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 relative flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-80"></div>
        <div className="relative z-10 text-center space-y-4 p-8">
          <Sparkles className="w-16 h-16 mx-auto text-primary opacity-70" />
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-foreground drop-shadow-lg">
              {commanderCard.name}
            </h3>
            <p className="text-sm text-muted-foreground drop-shadow">
              {commanderCard.type_line || "Legendary Creature"}
            </p>
            <p className="text-xs text-muted-foreground/80 italic mt-4">
              Card image unavailable
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-80 overflow-hidden bg-muted relative">
      {!imageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <div className="animate-pulse text-muted-foreground">Loading card...</div>
        </div>
      )}
      <img 
        src={imageUrl} 
        alt={`${commanderCard.name} - ${deckName}`}
        className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${!imageLoaded ? 'opacity-0' : 'opacity-100'}`}
        onError={handleImageError}
        onLoad={handleImageLoad}
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-80"></div>
    </div>
  );
};
