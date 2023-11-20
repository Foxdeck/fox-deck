<script setup lang="ts">
import FDTypography from "@/components/FDTypography/FDTypography.vue";
import type { PropType } from "vue";
import type { Severity } from "@/components/severity.types";

const props = defineProps({
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
  <aside
    class="bg-white border-l-4 flex justify-between p-4 shadow-2xl w-[500px] rounded-md"
    :class="{
      'border-primary-500': props.severity === 'primary',
      'border-warn-normal': props.severity === 'warn',
      'border-danger-normal': props.severity === 'danger',
      'border-success-darker': props.severity === 'success',
    }"
  >
    <div class="flex flex-col">
      <FDTypography v-if="title" class="font-bold">
        {{ title }}
      </FDTypography>
      <FDTypography v-if="text">
        {{ text }}
      </FDTypography>
    </div>
    <vue-feather
      class="inline-flex h-fit p-2 justify-center items-center bg-danger-normal/20 rounded-md text-danger-normal cursor-pointer transition ease-in-out hover:contrast-200"
      type="x"
      size="30"
    />
  </aside>
</template>
