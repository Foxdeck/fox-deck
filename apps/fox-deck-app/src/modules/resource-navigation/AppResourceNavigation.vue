<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useI18n} from "vue-i18n";

import AppSideNavigation from "@/core/components/AppSideNavigation/AppSideNavigation.vue";
import AppTreeView from "@/core/components/AppTreeView/AppTreeView.vue";
import type {
  AppTreeViewItemOnItemSelect,
  AppTreeViewItemProps
} from "@/core/components/AppTreeViewItem/AppTreeViewItem.types";
import {useFoxdeckRouter} from "@/core/composables/useFoxdeckRouter";
import {useAuthStore} from "@/core/stores/auth.store";
import {useThemeStore} from "@/core/stores/theme.store";
import {LoginRouteNames} from "@/modules/login/routes";
import {useResources} from "@/modules/resource-navigation/composables/useResources";

const authStore = useAuthStore();
const themeStore = useThemeStore();

const {fetchResources, getResourceChildren, removeResourceChildren, isResourceExpanded} = useResources();
const {t} = useI18n();
const {push} = useFoxdeckRouter();

const isNavigationExpanded = ref(true);

onMounted( async() =>  await fetchResources());

async function onLogoutClick() {
  await authStore.logout();
  await push({name: LoginRouteNames.LOGIN});
}

const mockTreeViewItems: AppTreeViewItemProps[] = [
  {
    label: "My Notes",
    identifier: "root_folder",
    children: [
      {
        label: "Science",
        identifier: "courses_science",
        isOpen: false,
        type: "folder",
        isSelected: false,
      },
      {
        label: "Math",
        identifier: "courses_math",
        isOpen: false,
        type: "folder",
        isSelected: false,
        children: [
          {
            label: "Division",
            identifier: "courses_math_division",
            isOpen: false,
            type: "folder",
            isSelected: true,
            children: [
              {
                label: "Note",
                identifier: "courses_math_division_note",
                isOpen: false,
                type: "note",
                isSelected: false,
              },
            ]
          },
        ]
      },
    ],
    isOpen: false,
    type: "folder",
    isSelected: false
  },
  {
    label: "Favorites",
    identifier: "notes_root",
    children: [],
    isOpen: false,
    type: "favorite",
    isSelected: false
  },
  {
    label: "Wastebasket",
    identifier: "notes_root",
    children: [],
    isOpen: false,
    type: "wastebasket",
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

</script>
<template>
  <AppSideNavigation
    :is-expanded="isNavigationExpanded"
    :is-light-theme="themeStore.isThemeLight()"
    @on-menu-toggle="isNavigationExpanded = !isNavigationExpanded"
    @on-theme-toggle="themeStore.switchTheme()"
  >
    <template #content>
      <AppTreeView
        v-if="isNavigationExpanded"
        :items="mockTreeViewItems"
        :is-expanded="isNavigationExpanded"
        @on-item-select="onResourceClick($event)"
      />
    </template>
  </AppSideNavigation>
</template>
