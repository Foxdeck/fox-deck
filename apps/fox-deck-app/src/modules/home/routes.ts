import type {FoxdeckRoute} from "@/router/foxdeck-route.type";
import {Icon} from "@/core/components/AppIcon/icons";

export enum HomeRouteNames {
  HOME = "home",
}

export const homeRoutes: FoxdeckRoute[] = [
  {
    path: "/",
    name: HomeRouteNames.HOME,
    component: () => import("./HomeView.vue"),
    isVisibleInNavigation: true,
    icon: Icon.HOME,
    label: "Home",
  },
];
