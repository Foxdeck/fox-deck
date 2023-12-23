<script setup lang="ts">

import type {Icon} from "@/core/components/AppIcon/icons";
import AppIcon from "@/core/components/AppIcon/AppIcon.vue";

type AppSideNavigationItemProps = {
  label?: string;
  icon?: Icon;
}

defineProps<AppSideNavigationItemProps>();
</script>

<template>
  <div class="flex gap-2 items-center p-2 rounded-md cursor-pointer hover:opacity-50">
    <AppIcon
      v-if="icon"
      :icon="icon"
    />
    <span class="text-sm font-gabarito">{{ label }}</span>
  </div>
</template>