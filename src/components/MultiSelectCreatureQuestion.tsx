import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CreatureOption {
  id: string;
  label: string;
}

interface MultiSelectCreatureQuestionProps {
  options: CreatureOption[];
  onSubmit: (selectedCreatures: string[]) => void;
  maxSelections?: number;
}

export const MultiSelectCreatureQuestion = ({ 
  options, 
  onSubmit,
  maxSelections = 3 
}: MultiSelectCreatureQuestionProps) => {
  const [selectedCreatures, setSelectedCreatures] = useState<string[]>([]);
  const [skipped, setSkipped] = useState(false);

  const canSelectMore = selectedCreatures.length < maxSelections;
  const isDisabled = (creatureId: string) => 
    !selectedCreatures.includes(creatureId) && !canSelectMore;

  const toggleCreature = (creatureId: string) => {
    if (selectedCreatures.includes(creatureId)) {
      // Deselect
      setSelectedCreatures(prev => prev.filter(c => c !== creatureId));
      setSkipped(false);
    } else if (canSelectMore) {
      // Select
      setSelectedCreatures(prev => [...prev, creatureId]);
      setSkipped(false);
    }
  };

  const handleSkip = () => {
    setSelectedCreatures([]);
    setSkipped(true);
    onSubmit(["Skip this question"]);
  };

  const handleContinue = () => {
    onSubmit(selectedCreatures);
  };

  const canContinue = selectedCreatures.length > 0 || skipped;

  const getCounterText = () => {
    if (selectedCreatures.length === 0) {
      return "Select up to 3";
    } else if (selectedCreatures.length === maxSelections) {
      return `${selectedCreatures.length} of ${maxSelections} selected (max reached)`;
    } else {
      return `${selectedCreatures.length} of ${maxSelections} selected`;
    }
  };

  return (
    <div className="space-y-3 md:space-y-6 max-w-6xl mx-auto">
      {/* Selection Counter */}
      <div className="text-center">
        <p className={cn(
          "text-xs md:text-base font-medium transition-colors",
          selectedCreatures.length === maxSelections 
            ? "text-accent" 
            : "text-muted-foreground"
        )}>
          {getCounterText()}
        </p>
      </div>

      {/* Creature Options Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1.5 md:gap-3">
        {options.map((option) => {
          const isSelected = selectedCreatures.includes(option.id);
          const disabled = isDisabled(option.id);

          return (
            <button
              key={option.id}
              onClick={() => toggleCreature(option.id)}
              disabled={disabled}
              className={cn(
                "relative bg-gradient-to-br from-card to-card/80 rounded-lg md:rounded-xl p-1.5 md:p-4",
                "border-2 transition-all duration-200",
                "text-left min-h-[44px] md:min-h-[80px] flex items-center justify-center",
                isSelected
                  ? "border-accent shadow-card-hover bg-accent/5 scale-[1.02]"
                  : "border-border hover:border-primary/50 hover:scale-[1.01]",
                disabled && "opacity-40 cursor-not-allowed hover:scale-100",
                !disabled && !isSelected && "hover:shadow-md"
              )}
            >
              {/* Checkmark for selected */}
              {isSelected && (
                <div className="absolute top-1 right-1 md:top-2 md:right-2 w-4 h-4 md:w-6 md:h-6 rounded-full bg-accent flex items-center justify-center animate-scale-in">
                  <Check className="w-2.5 h-2.5 md:w-4 md:h-4 text-accent-foreground" />
                </div>
              )}

              {/* Creature Label */}
              <span className={cn(
                "text-[10px] md:text-base font-semibold text-center px-1 md:px-6",
                isSelected ? "text-accent" : "text-foreground"
              )}>
                {option.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Bottom Buttons */}
      <div className="flex flex-col sm:flex-row gap-1.5 md:gap-4 justify-between items-center pt-1 md:pt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={handleSkip}
          className="w-full sm:w-auto text-xs md:text-base h-8 md:h-9"
        >
          Skip this question
        </Button>

        <Button
          variant="hero"
          size="sm"
          onClick={handleContinue}
          disabled={!canContinue}
          className="w-full sm:w-auto gap-1 md:gap-2 text-xs md:text-base h-8 md:h-9"
        >
          Continue
          <span className="text-sm md:text-lg">→</span>
        </Button>
      </div>
    </div>
  );
};
