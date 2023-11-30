import {type RouteParamsRaw, useRouter} from "vue-router";
import type {RouteNames} from "@/router";

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
  async function push({ name, params = {} }: { name: RouteNames, params?: RouteParamsRaw }) {
    console.debug(`[useFoxdeckRouter] => navigated to ${name} page with params:`, params);
    await router.push({ name, params });
  }

  /**
   * Public API
   */
  return {
    push: push
  }
}