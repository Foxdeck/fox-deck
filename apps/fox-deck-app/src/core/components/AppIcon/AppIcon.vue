<script setup lang="ts">
import {Icon} from "./icons";

type AppIconProps = {
  icon?: Icon;
  spinning?: boolean;
}

defineProps<AppIconProps>();
</script>
<template>
  <span
    v-if="icon"
    class="fi m-0 w-fit p-0"
    :class="{
      [icon]: true,
      'animate-spin': spinning
    }"
  />
</template>