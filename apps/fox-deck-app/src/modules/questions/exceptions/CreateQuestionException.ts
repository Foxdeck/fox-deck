export class CreateQuestionException extends Error {
  constructor() {
    super();
    this.name = "CREATE_QUESTION_EXCEPTION";
    this.message = "CREATE_QUESTION_EXCEPTION_MESSAGE";
  }
}
