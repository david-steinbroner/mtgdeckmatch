import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ProgressIndicator } from "@/components/ProgressIndicator";
import { OptionCard } from "@/components/OptionCard";
import { TextInputQuestion } from "@/components/TextInputQuestion";
import { vibeQuestion, creatureTypeQuestions } from "@/data/vibes-questions";
import { ArrowLeft } from "lucide-react";
import { QuizAnswer } from "@/types/quiz";

const VibesQuestions = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [selectedVibe, setSelectedVibe] = useState<string | null>(null);

  const totalQuestions = 2;

  // Get current question based on index and selected vibe
  const getCurrentQuestion = () => {
    if (currentQuestionIndex === 0) {
      return vibeQuestion;
    } else {
      // Question 2 is dynamic based on vibe
      return selectedVibe ? creatureTypeQuestions[selectedVibe] : null;
    }
  };

  const currentQuestion = getCurrentQuestion();

  const handleAnswer = (answerId: string | string[]) => {
    // Save answer
    const newAnswer: QuizAnswer = {
      questionId: currentQuestion!.id,
      answerId,
    };
    
    const newAnswers = [...answers, newAnswer];
    setAnswers(newAnswers);

    // If this was Question 1, save the vibe choice
    if (currentQuestionIndex === 0 && typeof answerId === "string") {
      setSelectedVibe(answerId);
    }

    // Move to next question or results
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Quiz complete, navigate to loading screen with answers and path type
      navigate("/loading", { state: { answers: newAnswers, path: "vibes" } });
    }
  };

  const handleOptionSelect = (answerId: string) => {
    handleAnswer(answerId);
  };

  const handleStartOver = () => {
    navigate("/");
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      // Remove last answer
      setAnswers(answers.slice(0, -1));
    } else {
      navigate("/path-selection");
    }
  };

  const handleStepClick = (step: number) => {
    if (step < currentQuestionIndex) {
      // Allow going back to previous questions
      setCurrentQuestionIndex(step);
      setAnswers(answers.slice(0, step));
      // Reset vibe selection if going back to Q1
      if (step === 0) {
        setSelectedVibe(null);
      }
    }
  };

  if (!currentQuestion) {
    return null; // Safety check
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <div className="pt-[10vh]">
        <div className="max-w-[900px] mx-auto px-6">
          {/* Header */}
          <div className="flex items-center justify-between py-4 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleStartOver}
          >
            Start Over
          </Button>
        </div>

          {/* Progress */}
          <div className="mb-10">
            <ProgressIndicator 
              currentStep={currentQuestionIndex} 
              totalSteps={totalQuestions}
              onStepClick={handleStepClick}
            />
          </div>

          {/* Question Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-3 mb-10">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                {currentQuestion.question}
              </h2>
              <p className="text-muted-foreground text-lg">
                Choose the one that speaks to you most
              </p>
            </div>

            {/* Multiple Choice Options */}
            {currentQuestion.type === "multiple-choice" && currentQuestion.options && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {currentQuestion.options.map((option) => (
                <OptionCard
                  key={option.id}
                  title={option.title}
                  description={option.description}
                  icon={option.icon}
                  onClick={() => handleOptionSelect(option.id)}
                />
                ))}
              </div>
            )}

            {/* Text Input Question */}
            {currentQuestion.type === "text-input" && (
              <TextInputQuestion
                placeholder={currentQuestion.placeholder}
                quickSelects={currentQuestion.quickSelects}
                onSubmit={handleAnswer}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VibesQuestions;
