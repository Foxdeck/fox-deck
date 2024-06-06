<script async setup lang="ts">
import {useI18n} from "vue-i18n";
import {useAuthStore} from "@/core/stores/auth.store";
import {useFoxdeckRouter} from "@/core/composables/useFoxdeckRouter";
import AppTreeView from "@/core/components/AppTreeView/AppTreeView.vue";
import {LoginRouteNames} from "@/modules/login/routes";
import {useResources} from "@/modules/resource-navigation/composables/useResources";
import {useResourceStore} from "@/modules/resource-navigation/stores/resource.store";
import type {
  AppTreeViewItemOnItemSelect,
  AppTreeViewItemOnMenuActionSelect,
  AppTreeViewItemProps
} from "@/core/components/AppTreeViewItem/AppTreeViewItem.types";
import AppSideNavigation from "@/core/components/AppSideNavigation/AppSideNavigation.vue";
import {ref} from "vue";
import {useThemeStore} from "@/core/stores/theme.store";

// stores
const authStore = useAuthStore();
const resourceStore = useResourceStore();
const themeStore = useThemeStore();

// composables
const {fetchResources, getResourceChildren, removeResourceChildren, isResourceExpanded} = useResources();
const {t} = useI18n();
const {push} = useFoxdeckRouter();

const isNavigationExpanded = ref(false);

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
    isSelected: true
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
  console.debug(`(AppResourceNavigation:onMenuActionSelect) => menu-action '${  menuActionSelectEvent.actionIdentifier}' for menu '${menuActionSelectEvent.itemIdentifier}' is triggered`);
}
</script>
<template>
  <AppSideNavigation
    v-if="authStore.isAuthenticated()"
    :is-expanded="isNavigationExpanded"
    :is-light-theme="themeStore.isThemeLight()"
    @on-menu-toggle="isNavigationExpanded = !isNavigationExpanded"
    @on-theme-toggle="themeStore.switchTheme()"
  >
    <template #content>
      <AppTreeView
        :items="mockTreeViewItems"
        :is-expanded="isNavigationExpanded"
        @on-item-select="onResourceClick($event)"
        @on-menu-action-select="onMenuActionSelect($event)"
      />
    </template>
  </AppSideNavigation>
</template>
