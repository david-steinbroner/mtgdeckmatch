import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ProgressIndicator } from "@/components/ProgressIndicator";
import { Heart, Trophy, Film, ArrowLeft } from "lucide-react";

const PathSelection = () => {
  const navigate = useNavigate();

  const handlePathSelect = (path: "vibes" | "power" | "pop_culture") => {
    if (path === "vibes") {
      navigate("/vibes-questions");
    } else if (path === "power") {
      navigate("/power-questions");
    } else if (path === "pop_culture") {
      navigate("/ip-selection");
    }
  };

  return (
    <div className="min-h-[100dvh] bg-gradient-to-br from-background via-background to-muted p-2 md:p-4 flex flex-col">
      <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col py-2 md:py-4 md:pt-12">
        {/* Header */}
        <div className="flex items-center justify-between py-1 md:py-2 shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="gap-1 text-xs md:text-sm h-7 md:h-9"
          >
            <ArrowLeft className="w-3 h-3 md:w-4 md:h-4" />
            Back
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/")}
            className="text-xs md:text-sm h-7 md:h-9"
          >
            Start Over
          </Button>
        </div>

        {/* Progress */}
        <div className="py-2 md:py-3 shrink-0">
          <ProgressIndicator 
            currentStep={0} 
            totalSteps={5}
            onStepClick={(step) => console.log("Step clicked:", step)}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-center space-y-2 md:space-y-4 animate-fade-in min-h-0">
          <div className="text-center space-y-0.5 md:space-y-1 shrink-0">
            <h2 className="text-lg md:text-3xl font-bold text-foreground">
              How do you want to choose?
            </h2>
            <p className="text-muted-foreground text-xs md:text-base">
              Pick the approach that feels right for you
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-2.5 md:gap-4 max-w-4xl mx-auto w-full">
            {/* Vibes Option */}
            <button
              onClick={() => handlePathSelect("vibes")}
              className="group relative bg-gradient-to-br from-card to-card/80 rounded-lg md:rounded-xl p-3 md:p-6 border-2 border-border hover:border-primary transition-all duration-300 hover:shadow-card-hover text-left"
            >
              <div className="space-y-1.5 md:space-y-3">
                <div className="inline-flex items-center justify-center w-8 h-8 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-secondary/20 to-secondary/10 group-hover:from-secondary/30 group-hover:to-secondary/20 transition-all duration-300">
                  <Heart className="w-4 h-4 md:w-6 md:h-6 text-secondary" />
                </div>
                
                <div className="space-y-0.5 md:space-y-1">
                  <h3 className="text-base md:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    VIBES
                  </h3>
                  <p className="text-xs md:text-base text-foreground font-medium">
                    Match my personal style
                  </p>
                  <p className="text-muted-foreground text-[10px] md:text-sm">
                    Example: "Cute, creepy, or chaotic"
                  </p>
                </div>
              </div>

              <div className="absolute bottom-1 right-1 md:bottom-2 md:right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-accent font-semibold text-[9px] md:text-xs">Choose →</span>
              </div>
            </button>

            {/* Power Option */}
            <button
              onClick={() => handlePathSelect("power")}
              className="group relative bg-gradient-to-br from-card to-card/80 rounded-lg md:rounded-xl p-3 md:p-6 border-2 border-border hover:border-primary transition-all duration-300 hover:shadow-card-hover text-left"
            >
              <div className="space-y-1.5 md:space-y-3">
                <div className="inline-flex items-center justify-center w-8 h-8 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-accent/20 to-accent/10 group-hover:from-accent/30 group-hover:to-accent/20 transition-all duration-300">
                  <Trophy className="w-4 h-4 md:w-6 md:h-6 text-accent" />
                </div>
                
                <div className="space-y-0.5 md:space-y-1">
                  <h3 className="text-base md:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    POWER
                  </h3>
                  <p className="text-xs md:text-base text-foreground font-medium">
                    Build to win
                  </p>
                  <p className="text-muted-foreground text-[10px] md:text-sm">
                    Example: "I'm here to compete"
                  </p>
                </div>
              </div>

              <div className="absolute bottom-1 right-1 md:bottom-2 md:right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-accent font-semibold text-[9px] md:text-xs">Choose →</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PathSelection;
