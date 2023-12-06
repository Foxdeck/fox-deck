import type {FoxdeckRoute} from "@/router/foxdeck-route.type";
import {Icon} from "@/core/components/FDIcon/icons";

export enum QuestionnaireRouteNames {
  QUIZ = "quiz",
}

export const questionnaireRoutes: FoxdeckRoute[] = [
  {
    path: "/questionnaires",
    name: QuestionnaireRouteNames.QUIZ,
    component: () => import("./QuestionnairesView.vue"),
    isVisibleInNavigation: true,
    icon: Icon.GRADUATION,
    label: "questionnaires"
  },
];
