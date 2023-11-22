<script setup lang="ts">
import type { PropType } from "vue";

export type FontType = "title" | "h1" | "h2" | "h3" | "p" | "pxs" | "psm";
const props = defineProps({
  type: { type: String as PropType<FontType>, required: false, default: "p" },
});

function getAriaRole(): string {
  if (props.type === "h1" || props.type === "h2" || props.type === "h3") {
    return "heading";
  }

  return;
}

function getAriaLevel(): number {
  const ariaLevels = {
    h1: 1,
    h2: 2,
    h3: 3,
    h4: 4,
    h5: 5,
    h6: 6,
  };

  return ariaLevels[props.type];
}
</script>

<template>
  <span
    class="font-poppins dark:text-white"
    :role="getAriaRole()"
    :aria-level="getAriaLevel()"
    :class="{
      'text-7xl 3xl:text-8xl': type === 'title',
      'text-5xl 3xl:text-6xl': type === 'h1',
      'text-4xl': type === 'h2',
      'text-3xl': type === 'h3',
      'text-lg 3xl:text-xl': type === 'p',
      'text-sm 3xl:text-md': type === 'psm',
      'text-xs 3xl:text-sm': type === 'pxs',
    }"
  >
    <slot />
  </span>
</template>
