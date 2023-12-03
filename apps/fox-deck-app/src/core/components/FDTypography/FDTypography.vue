<script setup lang="ts">
import type {AriaLevel, AriaRole, FDFontType} from "./FDTypography.types";

export type FDTypographyProps = {
  readonly type?: FDFontType;
}

const props = withDefaults(defineProps<FDTypographyProps>(), {
  type: "p"
});


function getAriaRole(): AriaRole | undefined {
  return props.type?.startsWith("h") ? "heading" : undefined;
}

function getAriaLevel(): AriaLevel | undefined {
  const ariaLevels: Partial<Record<FDFontType, AriaLevel>> = {
    h1: 1,
    h2: 2,
    h3: 3,
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
      'text-4xl font-indie font-bold tracking-wider md:text-7xl 3xl:text-8xl': type === 'title',
      'text-5xl 3xl:text-6xl': type === 'h1',
      'text-4xl': type === 'h2',
      'text-3xl': type === 'h3',
      'text-lg !leading-9 3xl:text-xl': type === 'p',
      'text-sm 3xl:text-md': type === 'psm',
      'text-xs 3xl:text-sm': type === 'pxs',
    }"
  >
    <slot />
  </span>
</template>
