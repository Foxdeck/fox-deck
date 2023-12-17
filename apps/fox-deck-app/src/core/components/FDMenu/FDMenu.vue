<script setup lang="ts">
import {ref} from "vue";
import type {Severity} from "@/core/components/severity.types";
import FadeOutInTransition from "@/core/components/Transitions/FadeOutInTransition.vue";
import AppButton from "@/core/components/AppButton/AppButton.vue";
import {Icon} from "@/core/components/AppIcon/icons";

export type FDActionMenuItem = {
  id: string,
  label: string,
  icon: Icon,
  severity: Severity,
  action: Function
}

export type FDActionMenuProps = {
  /**
   * The items, which should be rendered in the menu.
   */
  readonly actionItems?: FDActionMenuItem[];

  /**
   * The icon, which should be rendered to open the menu
   */
  readonly menuIcon?: Icon;
}

withDefaults(defineProps<FDActionMenuProps>(), {
  menuIcon: Icon.MENU_VERTICAL
});

const isMenuOpen = ref(false);
</script>
<template>
  <div class="relative flex select-none">
    <AppButton
      variant="text"
      :icon="menuIcon"
      data-testid="action-menu-button"
      @click="isMenuOpen = !isMenuOpen"
    />
    <FadeOutInTransition>
      <div
        v-if="isMenuOpen"
        class="absolute top-full right-0 z-50 mt-1 flex h-fit flex-col rounded-md border bg-white shadow-md dark:bg-primary-900 dark:border-black dark:text-white"
      >
        <div class="p-2">
          <slot name="menu" />
          <div
            v-if="actionItems"
            class="flex flex-col gap-1"
          >
            <AppButton
              v-for="item of actionItems"
              :key="item.id"
              variant="text"
              data-testid="action-menu-item"
              :icon="item.icon"
              :label="item.label"
              :severity="item.severity"
              @click="item.action()"
            />
          </div>
        </div>
      </div>
    </FadeOutInTransition>
  </div>
</template>
