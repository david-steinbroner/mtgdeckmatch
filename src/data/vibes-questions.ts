import { Heart, Skull, Sparkles, PartyPopper, Sword, Trees } from "lucide-react";

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
  type: "multiple-choice" | "text-input" | "checkbox";
  options?: QuestionOption[];
  quickSelects?: string[];
  colorOptions?: { id: string; name: string; symbol: string }[];
  placeholder?: string;
}

export const vibesQuestions: Question[] = [
  {
    id: "vibe",
    type: "multiple-choice",
    question: "What's your vibe?",
    options: [
      {
        id: "cute",
        title: "Cute & Cuddly",
        description: "Puppies, bunnies, and friendship",
        icon: Heart,
        tags: ["cute", "cuddly", "playful", "wholesome"],
      },
      {
        id: "creepy",
        title: "Creepy & Dark",
        description: "Zombies, vampires, and nightmares",
        icon: Skull,
        tags: ["creepy", "dark", "horror", "spooky"],
      },
      {
        id: "whimsical",
        title: "Whimsical & Magical",
        description: "Faeries, wizards, and wonder",
        icon: Sparkles,
        tags: ["whimsical", "magical", "enchanting", "mysterious"],
      },
      {
        id: "chaotic",
        title: "Chaotic & Funny",
        description: "Goblins doing goblin things",
        icon: PartyPopper,
        tags: ["chaotic", "funny", "random", "silly"],
      },
      {
        id: "epic",
        title: "Epic & Heroic",
        description: "Knights, angels, and legends",
        icon: Sword,
        tags: ["epic", "heroic", "legendary", "noble"],
      },
      {
        id: "nature",
        title: "Nature & Primal",
        description: "Dinosaurs, beasts, and the wild",
        icon: Trees,
        tags: ["nature", "primal", "wild", "forest"],
      },
    ],
  },
  {
    id: "creature-types",
    type: "text-input",
    question: "Any specific creature types you love?",
    placeholder: "e.g., squirrels, dragons, vampires...",
    quickSelects: ["Squirrels", "Dragons", "Zombies", "Cats", "Elves", "Skip this question"],
  },
];
