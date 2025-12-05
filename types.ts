export interface Word {
  id: string;
  french: string;
  type?: string; // e.g., "verbe", "nom féminin"
  exampleSentence?: string;
  english?: string; // Optional English translation
}

export interface Deck {
  id: string;
  title: string;
  description: string;
  words: Word[];
}

export enum AppMode {
  HOME = 'HOME',
  FLASHCARDS = 'FLASHCARDS',
  QUIZ = 'QUIZ',
  UPLOAD = 'UPLOAD',
}

export interface QuizState {
  currentWordIndex: number;
  score: number;
  attempts: number;
  isCorrect: boolean | null; // null = not answered yet
  userInput: string;
}
