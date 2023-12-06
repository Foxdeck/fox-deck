<script setup lang="ts">
import {ref} from "vue";
import FDButton from "@/core/components/FDButton/FDButton.vue";
import type {Severity} from "@/core/components/severity.types";
import FadeOutInTransition from "@/core/components/Transitions/FadeOutInTransition.vue";

export type FDActionMenuItem = {
  id: string,
  label: string,
  icon: string,
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
  readonly menuIcon?: string;
}

withDefaults(defineProps<FDActionMenuProps>(), {
  menuIcon: "more-vertical"
})

const isMenuOpen = ref(false);
</script>
<template>
  <div class="relative flex select-none">
    <FDButton
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
          <div v-if="actionItems" class="flex flex-col gap-1">
            <FDButton
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
