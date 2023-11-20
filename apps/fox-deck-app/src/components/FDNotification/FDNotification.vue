<script setup lang="ts">
import FDTypography from "@/components/FDTypography/FDTypography.vue";
import type { PropType } from "vue";
import type { Severity } from "@/components/severity.types";

defineProps({
  severity: {
    type: Object as PropType<Severity>,
    required: false,
    default: "primary" satisfies Severity,
  },
  title: {
    type: String,
    required: false,
    default: "",
  },
  text: {
    type: String,
    required: false,
    default: "",
  },
});
</script>
<template>
  <div
    role="alert"
    class="rounded border-s-4 p-4 max-w-[500px]"
    :class="{
      'border-primary-500': severity === 'primary',
      'border-success-darker bg-success-light': severity === 'success',
      'border-warn-normal': severity === 'warn',
      'border-danger-normal bg-danger-light': severity === 'danger',
    }"
  >
    <div
      class="flex items-center gap-2"
      :class="{
        'text-primary-500': severity === 'primary',
        'text-success-darker': severity === 'success',
        'text-warn-darker': severity === 'warn',
        'text-danger-darker': severity === 'danger',
      }"
    >
      <vue-feather
        v-if="severity === 'danger' || severity === 'warn'"
        type="alert-triangle"
        size="20"
      />
      <vue-feather v-if="severity === 'success'" type="check" size="20" />
      <FDTypography>
        {{ title }}
      </FDTypography>
    </div>

    <FDTypography
      type="psm"
      class="mt-2"
      :class="{
        'text-primary-500': severity === 'primary',
        'text-success-darker': severity === 'success',
        'text-warn-darker': severity === 'warn',
        'text-danger-darker': severity === 'danger',
      }"
    >
      {{ text }}
    </FDTypography>
  </div>
</template>
