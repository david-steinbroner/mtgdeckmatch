export type PathType = "vibes" | "power" | "pop_culture";

export interface VibeOption {
  id: string;
  title: string;
  description: string;
  tags: string[];
}

export interface QuizAnswer {
  questionId: string;
  answerId: string | string[]; // Can be single answer or array for checkboxes
}

export interface QuizState {
  path: PathType | null;
  answers: QuizAnswer[];
  currentQuestion: number;
}
