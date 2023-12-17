<script setup lang="ts">
import "@material/web/menu/menu.js";
import "@material/web/menu/menu-item.js";
import FDIcon from "@/core/components/FDIcon/FDIcon.vue";
import {Icon} from "@/core/components/FDIcon/icons";

export type AppMenuItemProps = {
  label?: string;
  icon?: Icon;
}

defineProps<AppMenuItemProps>();

</script>

<template>
  <md-menu-item>
    <span class="flex gap-2">
      <FDIcon
        v-if="icon"
        :icon="icon"
      />
      <span v-if="label">{{ label }}</span>
    </span>
  </md-menu-item>
</template>