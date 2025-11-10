import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface ColorOption {
  id: string;
  name: string;
  symbol: string;
}

interface ColorCheckboxQuestionProps {
  colorOptions?: ColorOption[];
  onSubmit: (selectedColors: string[]) => void;
  maxSelections?: number;
}

export const ColorCheckboxQuestion = ({ 
  colorOptions = [], 
  onSubmit,
  maxSelections = 4 
}: ColorCheckboxQuestionProps) => {
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [noPreference, setNoPreference] = useState(false);

  const handleColorToggle = (colorId: string) => {
    setNoPreference(false);
    setSelectedColors((prev) => {
      if (prev.includes(colorId)) {
        return prev.filter((id) => id !== colorId);
      } else if (prev.length < maxSelections) {
        return [...prev, colorId];
      }
      return prev;
    });
  };

  const handleNoPreference = () => {
    setNoPreference(!noPreference);
    if (!noPreference) {
      setSelectedColors([]);
    }
  };

  const handleSubmit = () => {
    if (noPreference) {
      onSubmit([]);
    } else {
      onSubmit(selectedColors);
    }
  };

  const canSubmit = noPreference || selectedColors.length > 0;

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      {/* Helper Text */}
      <p className="text-center text-muted-foreground text-sm md:text-base">
        Select up to {maxSelections} colors you'd like in your deck, or skip to see all options
      </p>
      
      {/* Color Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {colorOptions.map((color) => {
          const isDisabled = noPreference || (selectedColors.length >= maxSelections && !selectedColors.includes(color.id));
          
          return (
            <button
              key={color.id}
              onClick={() => handleColorToggle(color.id)}
              disabled={isDisabled}
              className={cn(
                "group relative bg-gradient-to-br from-card to-card/80 rounded-xl p-6",
                "border-2 transition-all duration-300",
                selectedColors.includes(color.id) && !noPreference
                  ? "border-primary shadow-card-hover scale-105"
                  : "border-border hover:border-primary/50",
                isDisabled && "opacity-50 cursor-not-allowed"
              )}
            >
              <div className="flex items-center space-x-3">
                <Checkbox
                  checked={selectedColors.includes(color.id)}
                  disabled={isDisabled}
                  className="h-6 w-6"
                />
                <div className="flex items-center space-x-2">
                  <span className="text-3xl">{color.symbol}</span>
                  <span className="text-lg font-semibold text-foreground">
                    {color.name}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* No Preference Option */}
      <div className="border-t border-border pt-6">
        <button
          onClick={handleNoPreference}
          className={cn(
            "w-full bg-gradient-to-br from-card to-card/80 rounded-xl p-6",
            "border-2 transition-all duration-300",
            noPreference
              ? "border-primary shadow-card-hover"
              : "border-border hover:border-primary/50"
          )}
        >
          <div className="flex items-center space-x-3">
            <Checkbox checked={noPreference} className="h-6 w-6" />
            <span className="text-lg font-semibold text-foreground">
              Skip this question - I'm open to any colors
            </span>
          </div>
        </button>
      </div>

      {/* Submit Button */}
      {canSubmit && (
        <Button
          onClick={handleSubmit}
          variant="hero"
          size="lg"
          className="w-full"
        >
          {selectedColors.length > 0 ? `Continue with ${selectedColors.length} color${selectedColors.length > 1 ? 's' : ''}` : 'Skip - See All Decks'}
        </Button>
      )}
    </div>
  );
};
