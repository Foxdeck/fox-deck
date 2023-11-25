export class FetchQuestionException extends Error {
  constructor() {
    super();
    this.name = "FETCH_QUESTION_EXCEPTION";
    this.message = "FETCH_QUESTION_EXCEPTION_MESSAGE";
  }
}
