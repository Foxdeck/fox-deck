import type { Route } from "@/router";

export enum LoginRouteNames {
  LOGIN = "login",
  REGISTER = "register",
}

export const loginRoutes: Route[] = [
  {
    path: "/login",
    name: LoginRouteNames.LOGIN,
    component: () => import("./LoginView.vue"),
    isVisibleInNavigation: false,
  },
  {
    path: "/register",
    name: LoginRouteNames.REGISTER,
    component: () => import("./RegisterView.vue"),
    isVisibleInNavigation: false,
  },
];
