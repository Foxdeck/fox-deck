import { type RouteRecordRaw } from "vue-router";

export const loginRoutes: Route[] = [
  {
    path: "/login",
    name: "login",
    component: () => import("./LoginView.vue"),
    isVisibleInNavigation: false,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./RegisterView.vue"),
    isVisibleInNavigation: false,
  },
];

type Route = RouteRecordRaw & {
  readonly isVisibleInNavigation: boolean;
  readonly label?: string;
  readonly icon?: string;
};
