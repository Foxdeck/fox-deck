import {type RouteParamsRaw, useRouter} from "vue-router";
import {type RouteNames, routes} from "@/router";
import type {FoxdeckRoute} from "@/router/foxdeck-route.type";
import type {NoteResponseDto} from "@/core/services/api";
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
   * Returns an array of visible routes from the available routes.
   * Only the routes that have the property isVisibleInNavigation set to true are considered as visible.
   *
   * @returns {FoxdeckRoute[]} An array of visible routes.
   */
  function getVisibleRoutes(): FoxdeckRoute[] {
    return routes.filter((r) => r.isVisibleInNavigation);
  }

  /**
   * Checks if the note route is selected.
   *
   * @param {NoteResponseDto} note - The note object.
   */
  function isNoteRouteSelected(note: NoteResponseDto): boolean {
    return router.currentRoute.value.params?.id === note.id;
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
    getVisibleRoutes: getVisibleRoutes,
    isNoteRouteSelected: isNoteRouteSelected,
    isRouteSelected: isRouteSelected
  }
}