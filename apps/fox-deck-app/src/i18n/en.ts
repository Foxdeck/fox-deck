export const en = {
  common: {
    hello: "Hello",
    light_theme: "Light theme",
    settings: "Settings",
    more_settings: "more settings",
    foxdeck: "Foxdeck",
    intro_text: "Create, share and experience interactive learning"
  },
  home: {
    title: "Get started with learning!",
    text: "Develop your own learning modules with targeted questions that effectively expand your knowledge. Create questions that help you to memorize facts and then assign them to different learning units.",
    create_questions_now: "Create questions now"
  },
  login: {
    title: "Login",
    new_user: "New User?",
    create_account: "Create account",
    email: "email",
    password: "password",
    validation: {
      email_required: "Please enter your email",
      password_required: "Please enter your password",
      login_error: "Login failed! Please check your e-mail and password."
    },
    login: "Login"
  },
  register: {
    title: "Register",
    already_an_account: "Already have an account?",
    login_now: "Login now",
    email: "email",
    username: "username",
    password: "password",
    password_repeat: "repeat password",
    register: "Register",
    validation: {
      register_error: "Registration failed!"
    }
  },
  questions: {
    title: "Questions",
    text: "Here you can create your own questions, which you can later add to different learning units. You can also discover exciting questions from the community and, if they appeal to you, you can simply add them to your content.",
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
        wiso: "WiSo"
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
  // exceptions
  FETCH_QUESTION_EXCEPTION: "Error while getting questions",
  FETCH_QUESTION_EXCEPTION_MESSAGE: "Please refresh the page or try again later.",
  CREATE_QUESTION_EXCEPTION: "Error while creating your question",
  CREATE_QUESTION_EXCEPTION_MESSAGE: "Please refresh the page or try again later.",
  SEARCH_QUESTION_EXCEPTION: "Error while searching for your question",
  SEARCH_QUESTION_EXCEPTION_MESSAGE: "Please refresh the page or try again later.",
  DELETE_QUESTION_EXCEPTION: "Error while deleting your question",
  DELETE_QUESTION_EXCEPTION_MESSAGE: "Please refresh the page or try again later."
}