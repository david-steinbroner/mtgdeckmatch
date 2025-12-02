import { useState, useEffect, useRef } from "react";
import { getCardImageUrl, type ImageSize } from "@/utils/scryfallApi";
import { Skeleton } from "@/components/ui/skeleton";

interface CardImageProps {
  cardName: string;
  size?: ImageSize;
  className?: string;
  onClick?: () => void;
  lazy?: boolean; // Enable lazy loading (default: true)
}

/**
 * Component for displaying Magic card images from Scryfall
 * Features:
 * - Lazy loading with Intersection Observer
 * - Loading skeleton
 * - Error handling with fallback
 * - Click handler for enlarging
 * - Hover effect
 */
export const CardImage = ({
  cardName,
  size = 'normal',
  className = '',
  onClick,
  lazy = true,
}: CardImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(!lazy);
  const imgRef = useRef<HTMLDivElement>(null);

  // Lazy loading with Intersection Observer
  useEffect(() => {
    if (!lazy || shouldLoad) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before visible
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [lazy, shouldLoad]);

  const imageUrl = getCardImageUrl(cardName, size);

  const handleImageLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
    console.warn(`Failed to load image for card: ${cardName}`);
  };

  return (
    <div
      ref={imgRef}
      className={`relative aspect-[5/7] rounded-lg overflow-hidden bg-muted ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
      onClick={onClick}
    >
      {/* Loading Skeleton */}
      {isLoading && !hasError && (
        <Skeleton className="absolute inset-0 w-full h-full" />
      )}

      {/* Card Image */}
      {shouldLoad && !hasError && (
        <img
          src={imageUrl}
          alt={cardName}
          className={`w-full h-full object-cover transition-all duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          } ${onClick ? 'hover:scale-105 hover:shadow-lg' : ''}`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading={lazy ? 'lazy' : 'eager'}
        />
      )}

      {/* Error Fallback */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted p-2 text-center">
          <div className="text-4xl mb-2">🎴</div>
          <p className="text-xs text-muted-foreground font-medium line-clamp-2">
            {cardName}
          </p>
          <p className="text-xs text-muted-foreground/60 mt-1">
            Image unavailable
          </p>
        </div>
      )}

      {/* Hover Overlay (if clickable) */}
      {onClick && !isLoading && !hasError && (
        <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-200 flex items-center justify-center opacity-0 hover:opacity-100">
          <div className="bg-white/90 dark:bg-black/90 px-3 py-1 rounded-full text-xs font-semibold">
            View
          </div>
        </div>
      )}
    </div>
  );
};
