<script setup lang="ts">

import AppIcon from "@/core/components/AppIcon/AppIcon.vue";
import {Icon} from "@/core/components/AppIcon/icons";
</script>

<template>
  <div
    class="on-primary on-primary-container-text relative flex gap-4 rounded-2xl border px-6 py-8 shadow-sm outline-none"
    tabindex="0"
  >
    <md-focus-ring class="rounded-2xl" />
    <app-icon
      class="text-2xl"
      :icon="Icon.DOCUMENT_FILLED"
    />
    <div class="flex flex-col justify-center">
      <span class="label-large">Division</span>
      <span class="on-surface-variant-text label-medium font-gabarito">13.07.2024, 19:46</span>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>