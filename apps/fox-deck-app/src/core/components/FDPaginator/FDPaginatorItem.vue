<script setup lang="ts">
defineProps({
  isSelected: { type: Boolean, default: false },
});
</script>
<template>
  <li
    class="flex aspect-square h-12 cursor-pointer select-none items-center justify-center rounded-sm bg-white text-center leading-8 text-gray-900 shadow-sm hover:opacity-70"
    :class="{
      '!bg-primary-500 !text-white': isSelected,
    }"
  >
    <slot />
  </li>
</template>
