<script setup lang="ts">
import FDTypography from "@/core/components/FDTypography/FDTypography.vue";
import FDButton from "@/core/components/FDButton/FDButton.vue";
</script>
<template>
  <div class="flex flex-col gap-2 justify-center items-center h-full mx-auto">
    <FDTypography class="font-bold !text-8xl">?</FDTypography>
    <FDTypography class="font-bold">Keine Fragen gefunden</FDTypography>
    <FDTypography type="psm" class="max-w-lg text-center leading-7">
      Zu deinen Suchkriterien konnte keine Frage gefunden werden. Versuche doch,
      eine eigene Frage zu erstellen und teile Sie mit der Community!
    </FDTypography>
    <FDButton
      class="mt-2"
      type="secondary"
      icon="chevron-right"
      label="Frage erstellen"
    />
  </div>
</template>
