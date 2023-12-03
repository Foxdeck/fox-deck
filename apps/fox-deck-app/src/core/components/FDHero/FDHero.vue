<script setup lang="ts">
import FDTypography from "@/core/components/FDTypography/FDTypography.vue";

export type FDHeroProps = {
  readonly title?: string;
  readonly subtitle?: string;
}

defineProps<FDHeroProps>();

</script>
<template>
  <div class="flex flex-col justify-center gap-8">
    <FDTypography
      v-if="title"
      type="title"
      class="text-primary-800 relative mx-auto z-10"
    >
      {{ title }}
      <div class="bg-yellow-300 absolute -left-3 bottom-2 w-full -z-10 h-6 rounded-lg" />
    </FDTypography>
    <FDTypography
      v-if="subtitle"
      type="psm"
      class="leading-8 text-center max-w-[600px] mx-auto text-primary-800"
    >
      {{ subtitle }}
    </FDTypography>
  </div>
</template>
