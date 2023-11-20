import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalized,
  type RouteRecordRaw,
} from "vue-router";
import { useAuthStore } from "@/core/stores/auth.store";
import { loginRoutes } from "@/modules/login/routes";
import { homeRoutes } from "@/modules/home/routes";
import { quizRoutes } from "@/modules/quiz/routes";
import { questionRoutes } from "@/modules/questions/routes";

export type Route = RouteRecordRaw & {
  readonly isVisibleInNavigation: boolean;
  readonly label?: string;
  readonly icon?: string;
};

export const routes: Route[] = [
  ...loginRoutes,
  ...homeRoutes,
  ...quizRoutes,
  ...questionRoutes,
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
    next: Function
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
  }
);

export default router;
