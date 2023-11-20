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
  <aside
    class="fixed bottom-4 right-4 bg-white border-l-4 border-danger-normal flex p-4 gap-2 m-4 shadow-2xl w-[500px]"
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
