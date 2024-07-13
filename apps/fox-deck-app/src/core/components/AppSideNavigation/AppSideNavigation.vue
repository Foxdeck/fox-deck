<script async setup lang="ts">
import {Icon} from "@/core/components/AppIcon/icons";
import type {AppSideNavigationProps} from "@/core/components/AppSideNavigation/AppSideNavigation.types";
import AppSideNavigationItem from "@/core/components/AppSideNavigation/AppSideNavigationItem.vue";

// For now, Material Design 3 Web does not have the 'Navigation Drawer' as a component. Therefore, we need to implement
// our own kind of 'Navigation Drawer' based on the concepts for Material Design.
// @see https://m3.material.io/components/navigation-drawer/specs

const props = withDefaults(defineProps<AppSideNavigationProps>(), {
  isExpanded: true,
  isLightTheme: true,
});


/**
 * Returns the label based on the condition, if the side navigation is expanded, else return 'undefined'.
 * @param label the label to show, if the navigation is expanded
 */
function showLabelIfExpanded(label: string): string | undefined {
  return props.isExpanded ? label : undefined;
}

defineEmits<{
  onMenuToggle: () => void;
  onThemeToggle: () => void;
}>();
</script>
<template>
  <aside
    class="surface on-surface-text flex min-h-screen w-full flex-col justify-between p-2 transition-all"
    :class="{
      'max-w-[300px] items-start': isExpanded,
      'max-w-[130px] items-center': !isExpanded
    }"
  >
    <div class="flex w-full flex-col gap-4">
      <div class="flex flex-wrap justify-between">
        <!-- Navigation Header   -->
        <AppSideNavigationItem
          tooltip="Menu"
          :icon="Icon.MENU_BURGER"
          @click="$emit('onMenuToggle')"
        />

        <AppSideNavigationItem
          :icon="isLightTheme ? Icon.SUN : Icon.MOON"
          @click="$emit('onThemeToggle')"
        />
      </div>

      <!-- Navigation Content Area   -->
      <div class="w-full">
        <slot name="content" />
      </div>
    </div>

    <!-- Navigation Footer   -->
    <div class="flex flex-row flex-wrap gap-2">
      <AppSideNavigationItem
        tooltip="Settings"
        :label="showLabelIfExpanded('Settings')"
        :icon="Icon.SETTINGS"
      />
      <AppSideNavigationItem
        tooltip="Sign Out"
        :label="showLabelIfExpanded('Sign Out')"
        :icon="Icon.SIGN_OUT"
      />
    </div>
  </aside>
</template>
