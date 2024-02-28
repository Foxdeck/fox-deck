<script async setup lang="ts">
import {useI18n} from "vue-i18n";
import Logo from "@/assets/icons/foxdeck-logo.svg";
import {useAuthStore} from "@/core/stores/auth.store";
import {useFoxdeckRouter} from "@/core/composables/useFoxdeckRouter";
import {Icon} from "@/core/components/AppIcon/icons";
import FDTypography from "@/core/components/FDTypography/FDTypography.vue";
import AppButton from "@/core/components/AppButton/AppButton.vue";
import AppTreeView from "@/core/components/AppTreeView/AppTreeView.vue";
import {LoginRouteNames} from "@/modules/login/routes";
import {useResources} from "@/modules/resource-navigation/composables/useResources";
import {useResourceStore} from "@/modules/resource-navigation/stores/resource.store";

// stores
const authStore = useAuthStore();
const resourceStore = useResourceStore();

// composables
const {fetchResources} = useResources();
const {t} = useI18n();
const {push} = useFoxdeckRouter();

await fetchResources();

/**
 * Logs out the user by performing the necessary actions such as logging out from the authentication store
 * and redirecting to the login page.
 *
 * @async
 * @function onLogoutClick
 * @returns {Promise<void>} - A promise that resolves once the logout process has been completed.
 */
async function onLogoutClick() {
  await authStore.logout();
  await push({name: LoginRouteNames.LOGIN});
}

</script>
<template>
  <aside
    v-if="authStore.isAuthenticated()"
    class="flex flex-col justify-between w-full max-w-[300px] min-h-screen on-surface-text p-4 border-r shadow-md surface-container-lowest"
  >
    <div class="flex flex-col">
      <FDTypography class="flex gap-2 font-bold items-center">
        <Logo class="w-8 self-center" />
        {{ t("common.hello") }}, {{ authStore.getUsername() }}
      </FDTypography>
      <RouterLink to="/create-note">
        <AppButton
          class="my-6"
          width="full"
          :label="t('notes.new_note')"
          :icon="Icon.PLUS"
        />
      </RouterLink>

      <div class="mt-6 mb-2">
        <span class="uppercase text-sm font-bold on-surface-text">notes</span>
      </div>

      <div class="flex flex-col gap-2">
        <AppTreeView :items="resourceStore.fetchResourcesAsNavigation()" />
      </div>
    </div>

    <div class="flex gap-2 flex-wrap">
      <AppButton
        variant="text"
        width="full"
        :label="t('common.sign_out')"
        :icon="Icon.SIGN_OUT"
        @click="onLogoutClick"
      />
      <AppButton
        variant="outlined"
        width="full"
        :label="t('common.settings')"
        :icon="Icon.SETTINGS"
      />
    </div>
  </aside>
</template>
