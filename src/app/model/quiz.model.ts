import { Difficulty } from './difficulty';

export interface QuizResponse {
  response_code: number;
  results: Quiz[];
}

export interface Quiz {
  category: string;
  type: string;
  difficulty: Difficulty;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  answers: string[];
}
