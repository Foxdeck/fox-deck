import type { Route } from "@/router";

export enum QuestionRouteNames {
  QUESTIONS = "questions",
}

export const questionRoutes: Route[] = [
  {
    path: "/questions",
    name: QuestionRouteNames.QUESTIONS,
    component: () => import("./QuestionsView.vue"),
    isVisibleInNavigation: true,
    icon: "book",
    label: "Fragen",
  },
];
