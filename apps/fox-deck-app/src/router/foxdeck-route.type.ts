import type {RouteRecordRaw} from "vue-router";
import type {Icon} from "@/core/components/FDIcon/icons";

/**
 * Extends the VueJS router type for usage in the navigation bar.
 */
export type FoxdeckRoute = RouteRecordRaw & {
  /**
   * If the route is visible in the navigation.
   */
  readonly isVisibleInNavigation: boolean;

  /**
   * The label of the route (optional, only used if route is visible in navigation).
   */
  readonly label?: string;

  /**
   * The icon of the route (optional, only used if route is visible in navigation).
   */
  readonly icon?: Icon;
};