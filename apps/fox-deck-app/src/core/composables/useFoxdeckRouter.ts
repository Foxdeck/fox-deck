import {type RouteParamsRaw, useRouter} from "vue-router";
import {type RouteNames} from "@/router";
import {ObjectUtil} from "@/core/util/object.util";

/**
 * Custom implementation of useRouter.
 * This is used to keep a consistent router API.
 */
export function useFoxdeckRouter() {
  const router = useRouter();

  /**
   * Navigate to a given route.
   * @param name
   * @param params
   */
  async function push({ name, params = {} }: { name: RouteNames, params?: RouteParamsRaw }): Promise<void> {
    console.debug(`[useFoxdeckRouter] => navigated to ${name} page with params:`, params);
    await router.push({ name, params });
  }

  /**
   * Determines whether a route is currently selected.
   */
  function isRouteSelected({ name = "", params = {} }: { name: string, params?: object}): boolean {
    const currentRoute = router.currentRoute.value;
    return currentRoute.name === name && ObjectUtil.deepEqual(currentRoute.params, params);
  }

  /**
   * Public API
   */
  return {
    push: push,
    isRouteSelected: isRouteSelected
  }
}