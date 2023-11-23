<script setup lang="ts">
import FadeOutInTransition from "@/core/components/Transitions/FadeOutInTransition.vue";
import FDTypography from "@/core/components/FDTypography/FDTypography.vue";

defineProps({
  isOpen: { type: Boolean, default: false },
  icon: { type: String, default: "" },
  title: { type: String, default: "" },
});
</script>
<template>
  <div class="relative flex select-none">
    <slot name="container" />
    <FadeOutInTransition>
      <div
        v-if="isOpen"
        class="absolute flex flex-col top-full mt-1 right-0 bg-white h-fit shadow-md rounded-md border dark:bg-primary-900 dark:border-black dark:text-white"
      >
        <div class="flex gap-2 border-b p-2">
          <vue-feather
            v-if="icon"
            :type="icon"
            size="14"
          />
          <FDTypography
            v-if="title"
            type="psm"
            class="font-bold"
          >
            {{ title }}
          </FDTypography>
        </div>
        <div class="flex flex-col p-2 gap-1">
          <slot name="popupContent" />
        </div>
      </div>
    </FadeOutInTransition>
  </div>
</template>
