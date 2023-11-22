<script setup lang="ts">
import FDButton from "@/core/components/FDButton/FDButton.vue";
import FDGrid from "@/core/components/FDGrid/FDGrid.vue";
import FDTypography from "@/core/components/FDTypography/FDTypography.vue";

defineProps({
  question: { type: String, default: "" },
  solution: { type: String, default: "" },
  isPublic: { type: Boolean, default: false },
  author: { type: String, default: "" },
  isEditMode: { type: Boolean, default: false },
});
</script>
<template>
  <FDGrid
    class="relative shadow-sm p-8 bg-white border-b w-full dark:bg-gray-800 dark:text-white dark:border-gray-600"
  >
    <div class="flex flex-col col-span-9 gap-4">
      <FDTypography class="font-bold" v-if="!isEditMode">
        »{{ question }}«
      </FDTypography>

      <FDTypography v-if="!isEditMode">
        {{ solution }}
      </FDTypography>
      <div class="flex gap-2">
        <span class="border text-sm font-gabarito py-2 px-4 rounded-full w-fit">
          Chemie
        </span>
        <span class="border text-sm font-gabarito py-2 px-4 rounded-full w-fit">
          Wissenschaft
        </span>
        <span
          class="bg-black text-sm font-gabarito py-2 px-4 text-white rounded-full w-fit"
        >
          + 3 weitere
        </span>
      </div>
    </div>
    <div class="col-span-3 justify-between items-end h-full flex flex-col">
      <FDButton
        class="border-none !text-gray-900"
        type="secondary"
        icon="more-vertical"
      />
      <FDTypography type="pxs"> @{{ author }} </FDTypography>
    </div>
  </FDGrid>
</template>
