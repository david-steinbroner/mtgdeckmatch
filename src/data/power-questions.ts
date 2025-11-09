import { Sword, Shield, Zap, TrendingUp, Handshake } from "lucide-react";

export interface QuestionOption {
  id: string;
  title: string;
  description: string;
  icon: any;
  tags: string[];
}

export interface Question {
  id: string;
  question: string;
  type: "multiple-choice";
  options?: QuestionOption[];
}

export const powerQuestions: Question[] = [
  {
    id: "archetype",
    type: "multiple-choice",
    question: "How do you want to win?",
    options: [
      {
        id: "aggro",
        title: "Aggressive",
        description: "Attack fast and often",
        icon: Sword,
        tags: ["aggro", "aggressive"],
      },
      {
        id: "control",
        title: "Controlling",
        description: "Stop their plan, execute mine",
        icon: Shield,
        tags: ["control"],
      },
      {
        id: "combo",
        title: "Combo",
        description: "Pull off the perfect sequence",
        icon: Zap,
        tags: ["combo"],
      },
      {
        id: "midrange",
        title: "Midrange/Value",
        description: "Grind them out",
        icon: TrendingUp,
        tags: ["midrange", "value"],
      },
      {
        id: "political",
        title: "Political",
        description: "Make deals and backstab",
        icon: Handshake,
        tags: ["political", "group hug"],
      },
    ],
  },
  {
    id: "power-level",
    type: "multiple-choice",
    question: "What power level?",
    options: [
      {
        id: "beginner",
        title: "Beginner-Friendly",
        description: "Just learning the game (Power 4-6)",
        icon: Shield,
        tags: ["4", "5", "6"],
      },
      {
        id: "focused",
        title: "Focused",
        description: "I know what I'm doing (Power 7-8)",
        icon: Sword,
        tags: ["7", "8"],
      },
      {
        id: "high-power",
        title: "High Power",
        description: "Bring on the challenge (Power 9-10)",
        icon: Zap,
        tags: ["9", "10"],
      },
    ],
  },
];
