import {defineStore} from "pinia";
import {ref} from "vue";
import type {GetResourceRootByUserIdResponseDto} from "@/core/services/api";
import type {AppTreeViewItemProps, AppTreeViewItemType} from "@/core/components/AppTreeViewItem/AppTreeViewItem.types";

export const useResourceStore = defineStore("resourceStore", () => {
    const resources = ref<GetResourceRootByUserIdResponseDto[]>();

    function fetchResourcesAsNavigation(): AppTreeViewItemProps[] {

        if (resources.value === undefined) {
            return [];
        }

        return resources.value.map((resource) => {
            return {
                identifier: resource.resourceId,
                type: resource.type as AppTreeViewItemType,
                label: resource.name,
            }
        });
    }

    return {
        resources: resources,
        fetchResourcesAsNavigation: fetchResourcesAsNavigation
    }
});