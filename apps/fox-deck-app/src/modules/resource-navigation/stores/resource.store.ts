import {defineStore} from "pinia";
import {ref} from "vue";
import type {GetResourceRootByUserIdResponseDto} from "@/core/services/api";
import type {AppTreeViewItemProps, AppTreeViewItemType} from "@/core/components/AppTreeViewItem/AppTreeViewItem.types";

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
    const resources = ref<GetResourceRootByUserIdResponseDto[]>([]);

    /**
     * Converts a given DTO and its children into an AppTreeViewItemProps object.
     *
     * @param {GetResourceRootByUserIdResponseDto} dto - The DTO to convert.
     * @param {GetResourceRootByUserIdResponseDto[]} allDtos - The array of all DTOs.
     * @returns {AppTreeViewItemProps} The converted AppTreeViewItemProps object.
     */
    function convertToAppTreeViewItem(dto: GetResourceRootByUserIdResponseDto, allDtos: GetResourceRootByUserIdResponseDto[]): AppTreeViewItemProps {
        const childrenDtos = allDtos.filter(childDto => childDto.parentResourceId === dto.resourceId);
        const children = childrenDtos.map(childDto => convertToAppTreeViewItem(childDto, allDtos));

        return {
            identifier: dto.resourceId,
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

        const convertedResources = [convertToAppTreeViewItem(resources.value[0], resources.value)];
        return convertedResources;
    }

    return {
        resources: resources,
        fetchResourcesAsNavigation: fetchResourcesAsNavigation,
    };
});