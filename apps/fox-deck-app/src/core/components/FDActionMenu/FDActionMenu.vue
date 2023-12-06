<script setup lang="ts">
import {ref} from "vue";
import FDButton from "@/core/components/FDButton/FDButton.vue";
import FDPopup from "@/core/components/FDPopup/FDPopup.vue";
import type {Severity} from "@/core/components/severity.types";

export type FDActionMenuItem = {
  id: string,
  label: string,
  icon: string,
  severity: Severity,
  action: Function
}

export type FDActionMenuProps = {
  readonly actionItems: FDActionMenuItem[];
}

defineProps<FDActionMenuProps>()

const isMenuOpen = ref(false);
</script>
<template>
  <FDPopup :is-open="isMenuOpen">
    <template #container>
      <FDButton
          class="dark:!text-white"
          variant="text"
          icon="more-vertical"
          data-testid="action-menu-button"
          @click="isMenuOpen = !isMenuOpen"
      />
    </template>
    <template #popupContent>
      <div class="flex flex-col">
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
    </template>
  </FDPopup>
</template>
