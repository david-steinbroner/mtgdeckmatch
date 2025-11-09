import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface OptionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
  className?: string;
}

export const OptionCard = ({ title, description, icon: Icon, onClick, className }: OptionCardProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative bg-gradient-to-br from-card to-card/80 rounded-lg md:rounded-xl p-2 md:p-6",
        "border-2 border-border hover:border-primary",
        "transition-all duration-300 hover:shadow-card-hover hover:scale-105",
        "text-left w-full",
        className
      )}
    >
      <div className="space-y-1 md:space-y-3">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-7 h-7 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300">
          <Icon className="w-4 h-4 md:w-7 md:h-7 text-primary" />
        </div>
        
        {/* Text */}
        <div className="space-y-0 md:space-y-1">
          <h3 className="text-sm md:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-[10px] md:text-sm text-muted-foreground leading-tight md:leading-normal">
            {description}
          </p>
        </div>
      </div>

      {/* Hover indicator */}
      <div className="absolute top-2 right-2 md:top-4 md:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-primary flex items-center justify-center">
          <svg 
            className="w-2.5 h-2.5 md:w-4 md:h-4 text-primary-foreground" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
    </button>
  );
};
