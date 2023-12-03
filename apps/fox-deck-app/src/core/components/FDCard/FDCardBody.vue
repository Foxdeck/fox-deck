<script setup lang="ts">
import FDTypography from "@/core/components/FDTypography/FDTypography.vue";

defineProps({
  text: {
    type: String,
    required: false,
    default: ""
  }
});
</script>
<template>
  <div
    v-if="text"
  >
    <FDTypography>
      {{ text }}
    </FDTypography>
  </div>
</template>
