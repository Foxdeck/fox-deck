<script setup lang="ts">

import type {AppSearchResultItemProps} from "@/modules/search/AppSearch/AppSearch.types";

defineProps<AppSearchResultItemProps>();

</script>

<template>
  <li
    class="flex justify-between p-2"
    tabindex="0"
  >
    <span>
      {{ label }}
    </span>
    <!-- we will implement favorites later -->
    <!-- <app-icon :icon="isFavorite ? Icon.STAR_FILLED : Icon.STAR" />-->
  </li>
</template>

<style scoped lang="scss">

</style>