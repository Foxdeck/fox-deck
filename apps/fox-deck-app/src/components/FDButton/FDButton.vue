<script setup lang="ts">
import type { Severity } from "@/components/severity.types";
import type { PropType } from "vue";

defineProps({
  icon: { type: String, required: false },
  severity: {
    type: Object as PropType<Severity>,
    required: false,
    default: "primary",
  },
  label: { type: String, required: false },
  type: {
    type: Object as PropType<"primary" | "secondary">,
    required: false,
    default: "primary",
  },
});
</script>
<template>
  <button
    class="flex gap-2 justify-center border-2 border-primary-500 items-center px-4 py-2 rounded-md text-sm font-gabarito ring-primary-300/50 text-white bg-primary-500 hover:opacity-80 active:bg-grey-900 focus:outline-none focus:ring-2 transition-all"
    :class="{
      '!bg-danger-normal !border-danger-normal':
        type === 'primary' && severity === 'danger',
      '!bg-success-normal !border-success-normal':
        type === 'primary' && severity === 'success',
      '!bg-warn-normal !border-warn-normal':
        type === 'primary' && severity === 'warn',
      '!bg-transparent !border-danger-normal': type === 'secondary',
      '!border-primary-500 !text-primary-500':
        type === 'secondary' && severity === 'primary',
      '!border-danger-normal !text-danger-normal':
        type === 'secondary' && severity === 'danger',
      '!border-success-normal !text-success-normal':
        type === 'secondary' && severity === 'success',
      '!border-warn-normal !text-warn-normal':
        type === 'secondary' && severity === 'warn',
    }"
  >
    <vue-feather v-if="icon" :type="icon" size="16" />
    <span>{{ label }}</span>
  </button>
</template>
