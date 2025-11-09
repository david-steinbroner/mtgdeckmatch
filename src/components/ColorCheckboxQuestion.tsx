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
}

export const ColorCheckboxQuestion = ({ colorOptions = [], onSubmit }: ColorCheckboxQuestionProps) => {
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [noPreference, setNoPreference] = useState(false);

  const handleColorToggle = (colorId: string) => {
    setNoPreference(false);
    setSelectedColors((prev) =>
      prev.includes(colorId)
        ? prev.filter((id) => id !== colorId)
        : [...prev, colorId]
    );
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
      {/* Color Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {colorOptions.map((color) => (
          <button
            key={color.id}
            onClick={() => handleColorToggle(color.id)}
            disabled={noPreference}
            className={cn(
              "group relative bg-gradient-to-br from-card to-card/80 rounded-xl p-6",
              "border-2 transition-all duration-300",
              selectedColors.includes(color.id) && !noPreference
                ? "border-primary shadow-card-hover scale-105"
                : "border-border hover:border-primary/50",
              noPreference && "opacity-50 cursor-not-allowed"
            )}
          >
            <div className="flex items-center space-x-3">
              <Checkbox
                checked={selectedColors.includes(color.id)}
                disabled={noPreference}
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
        ))}
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
              No preference - surprise me!
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
          See My Results
        </Button>
      )}
    </div>
  );
};
