<script setup lang="ts">
defineProps({
  isSelected: { type: Boolean, default: false },
});
</script>
<template>
  <li
    class="flex justify-center items-center h-12 aspect-square rounded-sm shadow-sm bg-white text-center leading-8 text-gray-900 cursor-pointer select-none hover:opacity-70"
    :class="{
      '!bg-primary-500 !text-white': isSelected,
    }"
  >
    <slot />
  </li>
</template>
