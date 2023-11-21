/**
 * Type definition for a question.
 */
export type Question = {
  id: string;
  question: string;
  solution: string;
  metrics: QuestionMetrics;
};

/**
 * How good the question can be answered
 */
type QuestionCompetence = {
  notGoodAt: number;
  average: number;
  goodAt: number;
};

/**
 * Metrics of the question.
 */
export type QuestionMetrics = QuestionCompetence & {
  timesAnswered: number;
};

/**
 * Shorthand for multiple questions.
 */
export type Questions = Question[];
