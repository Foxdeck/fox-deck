<script setup lang="ts">
import AppButton from "@/core/components/AppButton/AppButton.vue";
import {Icon} from "@/core/components/FDIcon/icons";

type AppPaginatorItem = {
  isSelected?: boolean;
  label?: string;
  icon?: Icon
}

withDefaults(defineProps<AppPaginatorItem>(), {
  isSelected: false,
  label: undefined,
  icon: undefined
});

</script>
<template>
  <AppButton
    :variant="isSelected ? 'tonal' : 'text'"
    :label="label"
    :icon="icon"
  />
</template>
