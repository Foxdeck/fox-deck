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
import type {
  AppTreeViewItemOnItemSelect,
  AppTreeViewItemOnMenuActionSelect,
  AppTreeViewItemProps
} from "@/core/components/AppTreeViewItem/AppTreeViewItem.types";

// stores
const authStore = useAuthStore();
const resourceStore = useResourceStore();

// composables
const {fetchResources, getResourceChildren, removeResourceChildren, isResourceExpanded} = useResources();
const {t} = useI18n();
const {push} = useFoxdeckRouter();

// initially fetch the resources from the database
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

const mockTreeViewItems: AppTreeViewItemProps[] = [
  {
    label: "Courses",
    identifier: "courses_root",
    children: [],
    isOpen: false,
    type: "folder",
    isSelected: false
  },
  {
    label: "Notes",
    identifier: "notes_root",
    children: [],
    isOpen: false,
    type: "folder",
    isSelected: false
  },
  {
    label: "Deadlines",
    identifier: "deadlines_root",
    children: [],
    isOpen: false,
    type: "folder",
    isSelected: false
  }
];

/**
 * Handles the click event on a resource item in the tree view
 *
 * @param {AppTreeViewItemOnItemSelect} selectedItem - The selected item from the tree view
 *
 * @returns {Promise<void>} - A promise that resolves after handling the click event
 */
async function onResourceClick(selectedItem: AppTreeViewItemOnItemSelect) {
  const {
    identifier
  } = selectedItem;

  if (isResourceExpanded(identifier)) {
    removeResourceChildren(identifier);
    return;
  }

  await getResourceChildren(identifier);
}

function onMenuActionSelect(menuActionSelectEvent: AppTreeViewItemOnMenuActionSelect) {
  console.debug(`(AppResourceNavigation:onMenuActionSelect) => menu-action '${menuActionSelectEvent.actionIdentifier}' for menu '${menuActionSelectEvent.itemIdentifier}' is triggered`);
}
</script>
<template>
  <aside
    v-if="authStore.isAuthenticated()"
    class="flex flex-col justify-between w-full max-w-[300px] min-h-screen on-surface-text p-4 border-r shadow-md surface-container-lowest"
  >
    <div class="flex flex-col gap-4">
      <FDTypography class="flex gap-2 font-bold items-center">
        <Logo class="w-8 self-center" />
        {{ t("common.hello") }}, {{ authStore.getUsername() }}
      </FDTypography>

      <div class="flex flex-col gap-2">
        <AppTreeView
          :items="mockTreeViewItems"
          @on-item-select="onResourceClick($event)"
          @on-menu-action-select="onMenuActionSelect($event)"
        />
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
