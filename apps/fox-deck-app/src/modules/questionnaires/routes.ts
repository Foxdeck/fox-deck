import type {FoxdeckRoute} from "@/router/foxdeck-route.type";

export enum QuestionnaireRouteNames {
  QUIZ = "quiz",
}

export const questionnaireRoutes: FoxdeckRoute[] = [
  {
    path: "/questionnaires",
    name: QuestionnaireRouteNames.QUIZ,
    component: () => import("./QuestionnairesView.vue"),
    isVisibleInNavigation: true,
    icon: "square",
    label: "questionnaires"
  },
];
