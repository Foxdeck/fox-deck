import type {FoxdeckRoute} from "@/router/foxdeck-route.type";

export enum QuestionRouteNames {
  QUESTIONS = "questions",
  CREATE_QUESTION = "create-question",
}

export const questionRoutes: FoxdeckRoute[] = [
  {
    path: "/questions",
    name: QuestionRouteNames.QUESTIONS,
    component: () => import("./QuestionsView.vue"),
    isVisibleInNavigation: true,
    icon: "book",
    label: "Fragen",
  },
  {
    path: "/question/create",
    name: QuestionRouteNames.CREATE_QUESTION,
    component: () => import("./QuestionCreateView.vue"),
    isVisibleInNavigation: false,
  },
];
