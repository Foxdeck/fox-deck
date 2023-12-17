<script setup lang="ts">
import {Icon} from "./icons";

type AppIconProps = {
  icon: Icon;
}

defineProps<AppIconProps>();
</script>
<template>
  <span
    class="fi m-0 p-0"
    :class="icon"
  />
</template>