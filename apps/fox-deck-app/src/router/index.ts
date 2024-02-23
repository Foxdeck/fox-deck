import {createRouter, createWebHistory, type RouteLocationNormalized, type RouteRecordRaw,} from "vue-router";
import {useAuthStore} from "@/core/stores/auth.store";
import {LoginRouteNames, loginRoutes} from "@/modules/login/routes";
import {HomeRouteNames, homeRoutes} from "@/modules/home/routes";
import {NoteRouteNames, noteRoutes} from "@/modules/notes/routes";

export type RouteNames = LoginRouteNames
  | HomeRouteNames
  | NoteRouteNames;

export const routes: RouteRecordRaw[] = [
  ...loginRoutes,
  ...homeRoutes,
  ...noteRoutes
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

/**
 * Route guards
 */
router.beforeEach(
  async (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: Function,
  ) => {
    const authService = useAuthStore();
    const publicPaths = ["login", "register"];

    // prevent navigation for unauthenticated users
    if (
      !authService.isAuthenticated() &&
      !publicPaths.includes(to.name as string)
    ) {
      next("/login");
    }

    // prevent navigation to login page to prevent users from re-login
    if (
      authService.isAuthenticated() &&
      publicPaths.includes(to.name as string)
    ) {
      next(from.path);
    }

    return next();
  },
);

export default router;
