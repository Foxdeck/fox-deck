<script setup lang="ts">
defineProps<{
  readonly noResultText: string;
}>();
</script>
<template>
  <span>
    {{ noResultText }}
  </span>
</template>