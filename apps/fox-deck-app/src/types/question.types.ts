/**
 * Type definition for a question.
 */
export type Question = {
  id: string;
  authorId: string;
  question: string;
  solution: string;
  isPublic: boolean;
  notGoodAt: number;
  average: number;
  goodAt: number;
  lastAnswered: any;
};

/**
 * Shorthand for multiple questions.
 */
export type Questions = Question[];
