<script setup lang="ts">
import "@material/web/menu/menu.js";
import "@material/web/menu/menu-item.js";
import AppIcon from "@/core/components/AppIcon/AppIcon.vue";
import {Icon} from "@/core/components/AppIcon/icons";

export type AppMenuItemProps = {
  label?: string;
  icon?: Icon;
}

defineProps<AppMenuItemProps>();

</script>

<template>
  <md-menu-item>
    <span class="flex gap-2">
      <AppIcon
        v-if="icon"
        :icon="icon"
      />
      <span v-if="label">{{ label }}</span>
    </span>
  </md-menu-item>
</template>