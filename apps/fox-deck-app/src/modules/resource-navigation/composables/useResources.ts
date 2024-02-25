import {useAuthStore} from "@/core/stores/auth.store";
import {useResourceStore} from "@/modules/resource-navigation/stores/resource.store";
import {api} from "@/core/services";

export function useResources() {
    const {jwt} = useAuthStore();
    const resourceStore = useResourceStore();

    async function fetchResources() {
        const response = await api.resourceRoot.resourceControllerGetRootLevelResourceByUserId({
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });

        resourceStore.resources = response.data;
    }

    return {
        fetchResources: fetchResources
    }
}