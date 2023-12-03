<script setup lang="ts">
import FDTypography from "@/core/components/FDTypography/FDTypography.vue";
import {Vue3Lottie} from "vue3-lottie";
import FoxMediatingJSON from "@/assets/animations/fox-mediating.json";
</script>
<template>
  <div class="mx-auto flex h-full flex-col items-center justify-center gap-2">
    <FDTypography class="font-bold !text-6xl">
      ?
    </FDTypography>
    <Vue3Lottie
      :animation-data="FoxMediatingJSON"
      :height="300"
      :width="300"
    />
    <FDTypography class="font-bold !text-2xl">
      Ganz schön leer hier
    </FDTypography>
    <FDTypography
      type="psm"
      class="max-w-lg text-center leading-7"
    >
      Zu deinen Suchkriterien konnte keine Frage gefunden werden. Versuche doch,
      eine eigene Frage zu erstellen und teile Sie mit der Community!
    </FDTypography>
  </div>
</template>
