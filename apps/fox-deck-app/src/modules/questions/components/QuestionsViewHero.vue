<script setup lang="ts">
import FDTypography from "@/core/components/FDTypography/FDTypography.vue";
import {useI18n} from "vue-i18n";

const {t} = useI18n();
</script>
<template>
  <div class="flex flex-col justify-center gap-8">
    <FDTypography
      type="h1"
      class="font-bold text-primary-800 relative mx-auto z-10"
    >
      {{ t("questions.title") }}
      <div class="bg-yellow-300 absolute -left-3 -bottom-1 w-full -z-10 h-6 rounded-md" />
    </FDTypography>
    <FDTypography
      type="psm"
      class="leading-8 text-center max-w-[600px] mx-auto text-primary-800"
    >
      {{ t("questions.text") }}
    </FDTypography>
  </div>
</template>
