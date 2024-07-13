<script setup lang="ts">
import type {AppSearchResultProps} from "@/modules/search/AppSearch/AppSearch.types";
import AppSearchResultItem from "@/modules/search/AppSearch/AppSearchResultItem.vue";

defineProps<AppSearchResultProps>();
</script>

<template>
  <ul>
    <app-search-result-item
      v-for="result in results"
      :key="result.id"
      :label="result.name"
    />
  </ul>
</template>