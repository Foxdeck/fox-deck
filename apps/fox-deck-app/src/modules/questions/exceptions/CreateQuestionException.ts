export class CreateQuestionException extends Error {
  constructor() {
    super();
    this.name = "CREATE_QUESTION_EXCEPTION";
    this.message =
      "Beim erstellen der Frage ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.";
  }
}
