<script setup lang="ts">
import FDTypography from "@/core/components/FDTypography/FDTypography.vue";

defineProps({
  title: {
    type: String,
    required: false,
    default: ""
  },
  subtitle: {
    type: String,
    required: false,
    default: ""
  },
  headerIcon: {
    type: String,
    required: false,
    default: undefined
  }
});
</script>
<template>
  <div
    v-if="title || subtitle || headerIcon"
    class="flex gap-4 px-4 py-3 border-b"
  >
    <vue-feather
      v-if="headerIcon"
      size="24"
      :type="headerIcon"
    />
    <div
      class="flex flex-col justify-center"
    >
      <FDTypography
        v-if="title"
        class="font-bold"
      >
        {{ title }}
      </FDTypography>
      <FDTypography
        v-if="subtitle"
        type="psm"
      >
        {{ subtitle }}
      </FDTypography>
    </div>
  </div>
</template>