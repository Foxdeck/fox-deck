import type {FoxdeckRoute} from "@/router";

export enum QuizRouteNames {
  QUIZ = "quiz",
}

export const quizRoutes: FoxdeckRoute[] = [
  {
    path: "/questionnaire/:id",
    name: QuizRouteNames.QUIZ,
    component: () => import("./QuizView.vue"),
    isVisibleInNavigation: false,
  },
];
