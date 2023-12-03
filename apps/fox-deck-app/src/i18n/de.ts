export const de = {
  common: {
    hello: "Hallo",
    light_theme: "Helles Design",
    settings: "Einstellungen",
    more_settings: "weitere Einstellungen",
    foxdeck: "Foxdeck",
    intro_text: "Erstelle, teile und erlebe interaktives Lernen"
  },
  home: {
    title: "Starte jetzt mit dem Lernen!",
    text: "Entwickle deine eigenen Lernmodule mit gezielten Fragen, die dein Wissen effektiv erweitern. Erstelle Fragen, die dir helfen, Fakten zu merken und ordne sie dann verschiedenen Lerneinheiten zu.",
    create_questions_now: "Jetzt Fragen erstellen"
  },
  login: {
    title: "Anmelden",
    new_user: "Neuer Benutzer?",
    create_account: "Konto erstellen",
    email: "E-Mail",
    password: "Passwort",
    validation: {
      email_required: "Bitte gib deine E-Mail ein",
      password_required: "Bitte gib dein Passwort ein",
      login_error: "Anmeldung fehlgeschlagen! Bitte überprüfe deine E-Mail und dein Passwort."
    },
    login: "Anmelden"
  },
  register: {
    title: "Registrieren",
    already_an_account: "Hast du bereits ein Konto?",
    login_now: "Jetzt anmelden",
    email: "E-Mail",
    username: "Benutzername",
    password: "Passwort",
    password_repeat: "Passwort wiederholen",
    register: "Registrieren",
    validation: {
      register_error: "Registrierung fehlgeschlagen!"
    }
  },
  questions: {
    title: "Fragen",
    text: "Finde spannende Fragen aus der Community oder erstelle deine eigenen Fragen.",
    question_amount: "{amount} Fragen gefunden",
    question_search_placeholder: "Suchen",
    question_create: "Frage erstellen",
    question_filter: {
      title: "Filter",
      text: "Finde genau die Fragen, die du suchst.",
      visibility_items: {
        private_label: "Meine Fragen",
        private_text: "Nur meine eigenen Fragen anzeigen.",
        public_label: "Öffentliche Fragen",
        public_text: "Fragen aus der Community anzeigen.",
      },
      category: "Kategorie",
      category_items: {
        all: "Alle"
      }
    },
    creation: {
      title: "Frage erstellen",
      text: "Erstelle deine eigene Frage und teile sie mit der Community!",
      what_is_your_question: "Was ist deine Frage?",
      what_is_the_answer: "Was ist die Antwort auf deine Frage?",
      answer: "Antwort",
      question: "Frage",
      is_question_public: "Ist deine Frage öffentlich?",
      is_question_public_explanation: "Wenn du deine Frage mit der Community teilen möchtest, können andere Benutzer sie für ihre eigenen Lerneinheiten verwenden.",
      create_question: "Frage erstellen",
      validation: {
        question_required: "Bitte gib deine Frage ein",
        answer_required: "Bitte gib deine Antwort ein"
      }
    }
  },
  // Exceptions
  FETCH_QUESTION_EXCEPTION: "Fehler beim Abrufen der Fragen",
  FETCH_QUESTION_EXCEPTION_MESSAGE: "Bitte aktualisiere die Seite oder versuche es später noch einmal.",
  CREATE_QUESTION_EXCEPTION: "Fehler beim Erstellen deiner Frage",
  CREATE_QUESTION_EXCEPTION_MESSAGE: "Bitte aktualisiere die Seite oder versuche es später noch einmal.",
  SEARCH_QUESTION_EXCEPTION: "Fehler bei der Suche nach deiner Frage",
  SEARCH_QUESTION_EXCEPTION_MESSAGE: "Bitte aktualisiere die Seite oder versuche es später noch einmal.",
  DELETE_QUESTION_EXCEPTION: "Fehler beim Löschen der Frage",
  DELETE_QUESTION_EXCEPTION_MESSAGE: "Bitte aktualisiere die Seite oder versuche es später noch einmal."
}