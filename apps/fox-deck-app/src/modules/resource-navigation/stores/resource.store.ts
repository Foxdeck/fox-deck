import {defineStore} from "pinia";
import {ref} from "vue";

import type {AppTreeViewItemProps, AppTreeViewItemType} from "@/core/components/AppTreeViewItem/AppTreeViewItem.types";
import type {DatabaseResource} from "@/core/services/api";

/**
 * A variable `useResourceStore` that defines a store for managing resources.
 *
 * The `useResourceStore` variable is a store created using the `defineStore` function. It contains the following methods and properties:
 *
 * - `resources`: A reactive reference to an array of resources of type `GetResourceRootByUserIdResponseDto[]`.
 *
 * - `fetchResourcesAsNavigation`: A function that fetches resources and converts them into navigation items for a tree view.
 *                                It returns an array of navigation items represented as `AppTreeViewItemProps[]`.
 *                                If there are no resources or if the resources array is empty, it returns an empty array.
 */
export const useResourceStore = defineStore("resourceStore", () => {
  const resources = ref<DatabaseResource[]>([]);

  /**
     * Converts a given DTO and its children into an AppTreeViewItemProps object.
     *
     * @param {DatabaseResource} dto - The DTO to convert.
     * @param {DatabaseResource[]} allDtos - The array of all DTOs.
     * @returns {AppTreeViewItemProps} The converted AppTreeViewItemProps object.
     */
  function convertToAppTreeViewItem(dto: DatabaseResource, allDtos: DatabaseResource[]): AppTreeViewItemProps {
    const childrenDtos = allDtos.filter(childDto => childDto.parentResourceId === dto.id);
    const children = childrenDtos.map(childDto => convertToAppTreeViewItem(childDto, allDtos));

    return {
      identifier: dto.id as string,
      type: dto.type as AppTreeViewItemType,
      label: dto.name,
      children: children.length > 0 ? children : undefined,
    };
  }

  /**
     * Fetches resources and converts them into navigation items for a tree view.
     *
     * @returns An array of navigation items for the tree view, represented as AppTreeViewItemProps.
     *          Returns an empty array if there are no resources or if the resources array is empty.
     */
  function fetchResourcesAsNavigation(): AppTreeViewItemProps[] {
    if (!resources.value || resources.value.length === 0) {
      return [];
    }

    return [convertToAppTreeViewItem(resources.value[0], resources.value)];
  }

  return {
    resources: resources,
    fetchResourcesAsNavigation: fetchResourcesAsNavigation,
  };
});