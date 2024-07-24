import {HttpStatusCode} from "axios";

import {api} from "@/core/services";
import type {DatabaseResource} from "@/core/services/api";
import {useAuthStore} from "@/core/stores/auth.store";
import {Logger} from "@/core/util/logging.util";
import {useResourceStore} from "@/modules/resource-navigation/stores/resource.store";


/**
 * Fetches resources from the API and updates the resource store.
 *
 * @return {Promise<void>} A promise that resolves when the resources are fetched and stored successfully.
 */
export function useResources() {
  const {jwt} = useAuthStore();
  const resourceStore = useResourceStore();

  /**
   * Fetches resources from the API and updates the resource store.
   *
   * @return {Promise<void>} A promise that resolves when the resources are fetched and stored successfully.
   */
  async function fetchResources(): Promise<void> {
    const response = await api.resource.resourceList("", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    if (response.status === HttpStatusCode.Ok) {
      resourceStore.resources = response.data;
    }
  }

  /**
   * Removes children of the resource with the given ID.
   *
   * @param {string} resourceId - The ID of the resource.
   */
  function removeResourceChildren(resourceId: string) {
    Logger.debug({
      filename: "useResources",
      method: "removeResourceChildren",
      message: `remove children of resource with id '${resourceId}'`
    });
    resourceStore.resources = [...resourceStore.resources.filter((resource) => resource.parentResourceId !== resourceId)];
  }

  /**
   * Checks if a resource is expanded in the TreeView.
   *
   * @param {string} resourceId - The identifier of the resource to check.
   * @returns {boolean} - True if the resource is expanded, false otherwise.
   */
  function isResourceExpanded(resourceId: string) {
    const isResourceExpanded = resourceStore.resources.find(resource => resource.parentResourceId === resourceId) !== undefined;
    Logger.debug({
      filename: "useResources",
      method: "isResourceExpanded",
      message: `resource with id '${resourceId}' is expanded: '${isResourceExpanded}'`
    });

    return isResourceExpanded;
  }

  /**
   * Retrieves the children of a resource.
   *
   * @param {string} resourceId - The ID of the resource.
   *
   * @returns {Promise<void>} - A Promise that resolves when the children of the resource have been retrieved.
   */
  async function getResourceChildren(resourceId: string) {
    Logger.debug({
      filename: "useResources",
      method: "getResourceChildren",
      message: `get children of resource with id '${resourceId}'`
    });

    // we add a placeholder which is rendered and shows, that the TreeView is currently loading
    resourceStore.resources = [...resourceStore.resources, getLoadingResourcePlaceholder(resourceId)];

    const response = await api.resource.resourceList(resourceId, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    // we remove the placeholder which is rendered and shows, that the TreeView is currently loading
    resourceStore.resources = [...resourceStore.resources.filter((resource) =>
      (resource.id !== getLoadingResourcePlaceholder(resourceId).id))
    ];

    resourceStore.resources = [...resourceStore.resources, ...response.data];
  }

  /**
   * Retrieves the loading resource placeholder for a given parent resource ID.
   * This Resource contains mainly dummy data.
   *
   * @param {string} parentResourceId - The ID of the parent resource to retrieve the loading placeholder for.
   *
   * @returns {GetResourceRootByUserIdResponseDto} - The loading resource placeholder object.
   */
  function getLoadingResourcePlaceholder(parentResourceId: string): DatabaseResource {
    return {
      id: "loadingPlaceholder",
      type: "loading",
      name: "loading",
      parentResourceId,
      content: "",
      createdAt: new Date().toISOString()
    };
  }

  /**
   * Public API
   */
  return {
    fetchResources: fetchResources,
    getResourceChildren: getResourceChildren,
    removeResourceChildren: removeResourceChildren,
    getLoadingResourcePlaceholder: getLoadingResourcePlaceholder,
    isResourceExpanded: isResourceExpanded,
  };
}