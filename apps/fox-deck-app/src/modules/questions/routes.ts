import type {FoxdeckRoute} from "@/router/foxdeck-route.type";
import {Icon} from "@/core/components/AppIcon/icons";

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
    icon: Icon.QUESTION,
    label: "Fragen",
  },
  {
    path: "/question/create",
    name: QuestionRouteNames.CREATE_QUESTION,
    component: () => import("./QuestionCreateView.vue"),
    isVisibleInNavigation: false,
  },
];
