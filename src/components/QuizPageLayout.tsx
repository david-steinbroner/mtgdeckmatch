import React from "react";
import { BackButton } from "@/components/BackButton";
import { cn } from "@/lib/utils";

interface QuizPageLayoutProps {
  children: React.ReactNode;
  showBackButton?: boolean;
  backButtonFallbackPath?: string;
  stepIndicator?: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

/**
 * Shared layout component for quiz flow pages to ensure consistent vertical spacing
 * and positioning throughout the user experience.
 *
 * Features:
 * - Optional header row with back button and step indicator
 * - Vertically centered main content area
 * - Consistent padding and responsive design
 */
export function QuizPageLayout({
  children,
  showBackButton = false,
  backButtonFallbackPath = "/play",
  stepIndicator,
  className = "",
  contentClassName = "",
}: QuizPageLayoutProps) {
  return (
    <div className={cn("max-w-6xl mx-auto w-full flex-1 flex flex-col p-2 md:p-4 py-2 md:py-4", className)}>
      {/* Header row - Back button and step indicator */}
      {(showBackButton || stepIndicator) && (
        <div className="grid grid-cols-3 items-center mb-3 shrink-0">
          {/* Back Button - Left Column */}
          <div className="justify-self-start">
            {showBackButton && <BackButton fallbackPath={backButtonFallbackPath} />}
          </div>

          {/* Step Indicator - Center Column */}
          <div className="justify-self-center">
            {stepIndicator}
          </div>

          {/* Empty Space - Right Column */}
          <div />
        </div>
      )}

      {/* Main content - vertically centered */}
      <div className={cn("flex-1 flex flex-col justify-center animate-fade-in min-h-0", contentClassName)}>
        {children}
      </div>
    </div>
  );
}
