<script setup lang="ts">
import AppButton from "@/core/components/AppButton/AppButton.vue";
import type {AppPaginatorItemProps} from "@/core/components/AppPaginator/AppPaginator.types";


withDefaults(defineProps<AppPaginatorItemProps>(), {
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
