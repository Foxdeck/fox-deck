<script setup lang="ts">
import type {PropType} from "vue";

import FDTypography from "@/core/components/FDTypography/FDTypography.vue";
import type {Severity} from "@/core/components/severity.types";

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
    class="max-w-[500px] rounded border-s-4 p-4"
    :class="{
      'border-primary-500': severity === 'primary',
      'bg-success-light border-success-darker': severity === 'success',
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
        data-testid="notification-error-icon"
        type="alert-triangle"
        size="20"
      />
      <vue-feather
        v-if="severity === 'success'"
        type="check"
        size="20"
      />
      <FDTypography data-testid="notification-title">
        {{ title }}
      </FDTypography>
    </div>

    <FDTypography
      type="psm"
      class="mt-2"
      data-testid="notification-text"
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
