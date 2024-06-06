<script setup lang="ts">
import {Icon} from "@/core/components/AppIcon/icons";
import AppButton from "@/core/components/AppButton/AppButton.vue";

defineProps<{
  tooltip?: string;
  label?: string;
  icon?: Icon;
}>();

</script>
<template>
  <AppButton
    v-if="icon"
    variant="text"
    :tooltip="tooltip"
    :label="label"
    :icon="icon"
  />
</template>
