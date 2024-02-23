import type {RouteRecordRaw} from "vue-router";

export enum LoginRouteNames {
  LOGIN = "login",
  REGISTER = "register",
}

export const loginRoutes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: LoginRouteNames.LOGIN,
    component: () => import("./LoginView.vue"),
  },
  {
    path: "/register",
    name: LoginRouteNames.REGISTER,
    component: () => import("./SignUpView.vue"),
  },
];
