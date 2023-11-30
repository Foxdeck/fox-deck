import type {FoxdeckRoute} from "@/router/foxdeck-route.type";

export enum HomeRouteNames {
  HOME = "home",
}

export const homeRoutes: FoxdeckRoute[] = [
  {
    path: "/",
    name: HomeRouteNames.HOME,
    component: () => import("./HomeView.vue"),
    isVisibleInNavigation: true,
    icon: "home",
    label: "Home",
  },
];
