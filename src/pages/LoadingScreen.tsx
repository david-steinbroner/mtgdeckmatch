import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { vibeQuestion, creatureTypeQuestions } from "@/data/vibes-questions";

const LoadingScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const answers = location.state?.answers || [];
  const pathType = location.state?.path || "vibes";
  const [interpretation, setInterpretation] = useState("");
  const [customText, setCustomText] = useState("");
  const [isCustomInput, setIsCustomInput] = useState(false);

  useEffect(() => {
    // Detect if user entered custom text
    let detectedCustomText = "";
    let hasCustomInput = false;

    if (pathType === "vibes") {
      const creatureAnswer = answers.find((a: any) => a.questionId === "creature-types");
      if (creatureAnswer) {
        const vibeAnswer = answers.find((a: any) => a.questionId === "vibe");
        const selectedVibe = vibeAnswer?.answerId;
        const creatureQuestion = selectedVibe ? creatureTypeQuestions[selectedVibe] : null;
        
        if (creatureQuestion?.quickSelects) {
          const isQuickSelect = creatureQuestion.quickSelects.some(
            (qs: any) => qs.value === creatureAnswer.answerId
          );
          
          if (!isQuickSelect && creatureAnswer.answerId !== "Skip this question") {
            hasCustomInput = true;
            detectedCustomText = creatureAnswer.answerId as string;
          }
        }
      }
    }

    setCustomText(detectedCustomText);
    setIsCustomInput(hasCustomInput);

    // Generate interpretation for custom text
    const generateInterpretation = async () => {
      if (hasCustomInput && detectedCustomText) {
        try {
          const { data } = await supabase.functions.invoke('generate-loading-interpretation', {
            body: { customText: detectedCustomText }
          });

          if (data?.interpretation) {
            setInterpretation(data.interpretation);
          }
        } catch (err) {
          console.error('Failed to generate interpretation:', err);
        }
      }
    };

    generateInterpretation();

    // Navigate to results after 2 seconds
    const timer = setTimeout(() => {
      navigate("/results", { 
        state: { 
          answers, 
          path: pathType,
          customText: detectedCustomText,
          isCustomInput: hasCustomInput
        } 
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <div className="pt-[25vh]">
        <div className="max-w-[600px] mx-auto px-6 text-center space-y-6 animate-fade-in">
          <div className="text-6xl mb-4">🔍</div>
          
          {isCustomInput && customText ? (
            <>
              <h2 className="text-2xl font-bold text-foreground">
                Searching for...
              </h2>
              <p className="text-xl text-primary font-semibold italic">
                "{customText}"
              </p>
              {interpretation && (
                <p className="text-base text-muted-foreground">
                  {interpretation}
                </p>
              )}
            </>
          ) : (
            <h2 className="text-2xl font-bold text-foreground">
              Finding your perfect deck...
            </h2>
          )}

          <div className="flex justify-center pt-4">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
