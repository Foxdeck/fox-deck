export class SearchQuestionException extends Error {
  constructor() {
    super();
    this.name = "SEARCH_QUESTION_EXCEPTION";
    this.message = "SEARCH_QUESTION_EXCEPTION_MESSAGE";
  }
}
