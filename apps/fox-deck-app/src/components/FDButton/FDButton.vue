<script setup lang="ts">
import type { Severity } from "@/components/severity.types";
import type { PropType } from "vue";

const props = defineProps({
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
  isRounded: {
    type: Boolean,
    required: false,
    default: true,
  },
});

const getButtonTypeStyle = () => {
  switch (props.type) {
    default:
    case "primary":
      return {
        "border-2 border-primary-950 bg-primary-950 text-primary-100":
          props.severity === "primary" || props.severity === undefined,
        "border-2 border-success-normal bg-success-normal text-success-darker":
          props.severity === "success",
        "border-2 border-danger-normal bg-danger-normal text-danger-lighter":
          props.severity === "danger",
        "border-2 border-warn-normal bg-warn-normal text-warn-darker":
          props.severity === "warn",
      };
    case "secondary":
      return {
        "border-2 border-primary-950 text-primary-950":
          props.severity === "primary",
        "border-2 border-success-darker text-success-darker":
          props.severity === "success",
        "border-2 border-danger-normal text-danger-normal":
          props.severity === "danger",
        "border-2 border-warn-normal text-warn-normal":
          props.severity === "warn",
      };
  }
};
</script>
<template>
  <button
    class="btn"
    :class="[getButtonTypeStyle(), { 'rounded-full': isRounded }]"
  >
    <vue-feather v-if="icon" class="inline-block" :type="icon" />
    <span v-if="label" class="font-sans 4xl:text-2xl">{{ label }}</span>
  </button>
</template>

<style scoped lang="scss">
.btn {
  @apply flex justify-center items-center
  font-medium
  px-6 py-3
  gap-2 w-fit
  transition ease-in-out
  4xl:py-5 4xl:px-8;

  &:hover {
    @apply opacity-70;
  }
}
</style>
