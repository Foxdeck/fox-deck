import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalized,
  type RouteRecordRaw,
} from "vue-router";
import QuestionnaireView from "../views/QuestionnaireView.vue";
import HomeView from "@/views/HomeView.vue";
import QuestionsView from "@/views/QuestionsView.vue";
import LoginView from "@/views/LoginView.vue";
import { useAuthStore } from "@/stores/auth.store";
import RegisterView from "@/views/RegisterView.vue";

export const routes: Route[] = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    isVisibleInNavigation: true,
    icon: "home",
    label: "Home",
  },
  {
    path: "/questionnaire/:id",
    name: "questionnaire",
    component: QuestionnaireView,
    isVisibleInNavigation: false,
  },
  {
    path: "/questions",
    name: "questions",
    component: QuestionsView,
    isVisibleInNavigation: true,
    icon: "book",
    label: "Fragen",
  },
  {
    path: "/questionnaires",
    name: "questionnaires",
    component: QuestionsView,
    isVisibleInNavigation: true,
    icon: "file",
    label: "Lerneinheiten",
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    isVisibleInNavigation: false,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
    isVisibleInNavigation: false,
  },
];

type Route = RouteRecordRaw & {
  readonly isVisibleInNavigation: boolean;
  readonly label?: string;
  readonly icon?: string;
};

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
