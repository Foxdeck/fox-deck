import type {RouteRecordRaw} from "vue-router";

export enum HomeRouteNames {
  HOME = "home",
}

export const homeRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    name: HomeRouteNames.HOME,
    component: () => import("./HomeView.vue"),
  },
];
