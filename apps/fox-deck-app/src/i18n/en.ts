export const en = {
  common: {
    add: "Add",
    hello: "Hello",
    light_theme: "Light theme",
    settings: "Settings",
    foxdeck: "Foxdeck",
    edit: "Edit",
    delete: "Delete",
    sign_out: "Sign out",
  },
  home: {
    title: "Welcome to Fox Deck",
    search_in_notes: "Search in my notes...",
    suggestions: "Suggestions"
  },
  login: {
    title: "Login",
    new_user: "Don't have an account?",
    create_account: "Sign up",
    email: "Email",
    password: "Password",
    validation: {
      email_required: "Please enter your email",
      email_invalid: "Please enter a valid e-mail",
      password_required: "Please enter your password",
      login_error: "Login failed! Please check your e-mail and password."
    },
    error: {
      authentication_error: "The email address or password you entered is invalid. Please check your entries and try again.",
      generic_error: "An unexpected error has occurred. Please reload the page and try again",
      generic_error_title: "An error occurred",
    },
    login: "Sign In"
  },
  register: {
    title: "Sign Up",
    already_an_account: "Already have an account?",
    login_now: "Login now",
    email: "Email",
    username: "Username",
    password: "Password",
    password_repeat: "Repeat password",
    register: "Sign Up",
    validation: {
      email_required: "Please enter a valid e-mail",
      email_invalid: "Please enter a valid e-mail",
      username_required: "Please enter a username",
      username_min_length_required: "Username must contain at least {chars} characters",
      password_required: "Please enter your password",
      password_min_length_required: "Password must contain at least {chars} characters",
      password_must_match: "Passwords must match",
      register_error: "Registration failed!"
    }
  },
  questions: {
    title: "Questions",
    text: "Find exciting questions from the community or create your own.",
    question_amount: "{amount} questions found",
    question_search_placeholder: "Search",
    question_create: "create question",
    question_filter: {
      title: "Filter",
      text: "Find exactly the questions you are looking for.",
      visibility_items: {
        private_label: "My questions",
        private_text: "Only show my own questions.",
        public_label: "Public questions",
        public_text: "Show questions from the community.",
      },
      category: "Category",
      category_items: {
        all: "All",
      }
    },
    creation: {
      title: "Create question",
      text: "Create your own question and share it with the community!",
      what_is_your_question: "What is your question?",
      what_is_the_answer: "What is the answer for your question?",
      answer: "answer",
      question: "question",
      is_question_public: "Is your question public?",
      is_question_public_explanation: "If you want to share your question with the community, other users can use them for their own learning units.",
      create_question: "Create question",
      validation: {
        question_required: "Please enter your question",
        answer_required: "Please enter your answer"
      }
    }
  },
  resource_navigation: {
    treeview_header: "Learning area",
    treeview_empty_text: "There are currently no learning modules or notes available."
  },
  // exceptions
  FETCH_QUESTION_EXCEPTION: "Error while getting questions",
  FETCH_QUESTION_EXCEPTION_MESSAGE: "Please refresh the page or try again later.",
  CREATE_QUESTION_EXCEPTION: "Error while creating your question",
  CREATE_QUESTION_EXCEPTION_MESSAGE: "Please refresh the page or try again later.",
  SEARCH_QUESTION_EXCEPTION: "Error while searching for your question",
  SEARCH_QUESTION_EXCEPTION_MESSAGE: "Please refresh the page or try again later.",
  DELETE_QUESTION_EXCEPTION: "Error while deleting your question",
  DELETE_QUESTION_EXCEPTION_MESSAGE: "Please refresh the page or try again later."
};