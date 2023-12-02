<script setup lang="ts">
import FDCardHeader from "@/core/components/FDCard/FDCardHeader.vue";
import FDCardBody from "@/core/components/FDCard/FDCardBody.vue";

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
  },
  text: {
    type: String,
    required: false,
    default: ""
  }
});
</script>
<template>
  <div class="bg-white shadow-sm rounded-md dark:bg-gray-800 dark:text-white">
    <slot name="header" />
    <FDCardHeader
      :title="title"
      :subtitle="subtitle"
      :header-icon="headerIcon"
    />
    <slot name="body" />
    <FDCardBody :text="text" />
  </div>
</template>
