/**
 * Quiz State Persistence Utility
 *
 * Stores quiz state in sessionStorage so it survives browser back/forward navigation.
 * State is cleared when quiz completes or when starting a fresh quiz.
 */

export interface PersistedQuizState {
  currentQuestionIndex: number;
  answers: Array<{ questionId: string; answerId: string | string[] }>;
  selectedPath: string | null;
  selectedArtStyle: string | null;
  selectedVibe: string | null;
}

const QUIZ_STATE_KEY = 'mtg-vibes-quiz-state';

/**
 * Save quiz state to sessionStorage
 */
export function saveQuizState(state: PersistedQuizState): void {
  try {
    sessionStorage.setItem(QUIZ_STATE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save quiz state:', error);
  }
}

/**
 * Load quiz state from sessionStorage
 */
export function loadQuizState(): PersistedQuizState | null {
  try {
    const saved = sessionStorage.getItem(QUIZ_STATE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error('Failed to load quiz state:', error);
    return null;
  }
}

/**
 * Clear quiz state from sessionStorage
 */
export function clearQuizState(): void {
  try {
    sessionStorage.removeItem(QUIZ_STATE_KEY);
  } catch (error) {
    console.error('Failed to clear quiz state:', error);
  }
}
