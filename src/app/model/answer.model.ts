import { Quiz } from "./quiz.model";

export interface Answer {
  quiz: Quiz;
  answer: string | null;
}
