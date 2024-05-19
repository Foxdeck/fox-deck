<script setup lang="ts">
import "@material/web/menu/menu.js";
import "@material/web/menu/menu-item.js";
import AppIcon from "@/core/components/AppIcon/AppIcon.vue";
import {Icon} from "@/core/components/AppIcon/icons";
import FDTypography from "@/core/components/FDTypography/FDTypography.vue";

export type AppMenuItemProps = {
  label?: string;
  icon?: Icon;
}

defineProps<AppMenuItemProps>();

</script>

<template>
  <md-menu-item>
    <span class="flex gap-3">
      <AppIcon
        v-if="icon"
        :icon="icon"
      />
      <FDTypography
        v-if="label"
        type="psm"
      >{{ label }}</FDTypography>
    </span>
  </md-menu-item>
</template>

<style>
:root {
  --md-menu-item-label-text-line-height: 1rem;
  --md-menu-item-one-line-container-height: 1.2rem;
}
md-menu-item {
  padding: 0;
  margin: 0;
  min-width: 200px;
}
</style>