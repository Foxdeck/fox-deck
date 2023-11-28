export class DeleteQuestionException extends Error {
  constructor() {
    super();
    this.name = "DELETE_QUESTION_EXCEPTION";
    this.message = "DELETE_QUESTION_EXCEPTION_MESSAGE";
  }
}
