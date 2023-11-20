import type { Route } from "@/router";

export enum LoginRouteNames {
  HOME = "home",
}

export const homeRoutes: Route[] = [
  {
    path: "/",
    name: LoginRouteNames.HOME,
    component: () => import("./HomeView.vue"),
    isVisibleInNavigation: true,
    icon: "home",
    label: "home",
  },
];
