<script setup lang="ts">
import type {Severity} from "@/core/components/severity.types";
import {type PropType, ref} from "vue";
import FDTypography from "@/core/components/FDTypography/FDTypography.vue";

type Variant = "primary" | "secondary" | "text";

const props = defineProps({
  icon: {type: String, required: false, default: ""},
  severity: {
    type: String as PropType<Severity>,
    required: false,
    default: "primary",
  },
  label: {type: String, required: false, default: ""},
  variant: {
    type: String as PropType<Variant>,
    required: false,
    default: "primary",
  },
  testId: {type: String, default: ""},
});

const buttonRef = ref<HTMLButtonElement>();

function getSeverityClass(): string {
  const severityClasses: Record<Severity, string> = {
    primary: "bg-primary-500 border-primary-500 text-primary-white",
    danger: "bg-danger-normal border-danger-normal text-white",
    success: "bg-success-normal border-success-normal text-white",
    warn: "bg-warn-normal border-warn-normal text-white"
  };
  return severityClasses[props.severity];
}

function getVariantClass() {
  const variantClasses: Partial<Record<Variant, string>> = {
    secondary: "!bg-transparent",
    text: "!bg-transparent !border-transparent !justify-start"
  };

  return variantClasses[props.variant];
}

function getTextColorClassBasedOnBorder(): string {
  if (props.variant === "secondary" || props.variant === "text") {
    const textClass: Record<Severity, string> = {
      primary: "!text-primary-500",
      danger: "!text-danger-normal",
      warn: "!text-warn-normal",
      success: "!text-success-normal",
    };
    return textClass[props.severity];
  }
  return "";
}
</script>
<template>
  <button
    ref="buttonRef"
    class="flex items-center justify-center gap-3 rounded-md border-2 px-5 py-4 text-white transition-all font-gabarito ring-primary-300/50 hover:opacity-80 focus:outline-none focus:ring-2 active:bg-grey-900"
    :data-testid="testId"
    :class="[
      getSeverityClass(),
      getVariantClass(),
      getTextColorClassBasedOnBorder()
    ]"
  >
    <vue-feather
      v-if="icon"
      data-testid="button-icon"
      :type="icon"
      size="18"
    />
    <FDTypography
      v-if="label"
      type="psm"
    >
      {{ label }}
    </FDTypography>
  </button>
</template>
