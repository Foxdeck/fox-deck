<script setup lang="ts">
import type { PropType } from "vue";

type ColSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

const props = defineProps({
  colSpan: { type: Object as PropType<ColSpan>, required: true },
});

function getColSpan() {
  return `col-span-${props.colSpan}`;
}
</script>

<template>
  <div
    class="flex flex-col"
    :class="getColSpan()"
  >
    <slot />
  </div>
</template>
