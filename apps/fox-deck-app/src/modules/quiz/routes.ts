import type { Route } from "@/router";

export enum QuizRouteNames {
  QUIZ = "quiz",
}

export const quizRoutes: Route[] = [
  {
    path: "/questionnaire/:id",
    name: QuizRouteNames.QUIZ,
    component: () => import("./QuizView.vue"),
    isVisibleInNavigation: false,
  },
];
