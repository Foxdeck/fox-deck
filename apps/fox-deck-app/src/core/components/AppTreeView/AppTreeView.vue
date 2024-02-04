<script setup lang="ts">
import AppTreeViewItem from "@/core/components/AppTreeViewItem/AppTreeViewItem.vue";
import type {AppTreeViewProps} from "@/core/components/AppTreeView/AppTreeView.types";

defineProps<AppTreeViewProps>();
</script>
<template>
  <div
    v-for="item in items"
    :key="item.identifier"
  >
    <AppTreeViewItem
      :identifier="item.identifier"
      :type="item.type"
      :label="item.label"
      :is-open="item.isOpen"
      :is-selected="item.isSelected"
    />
    <div class="ml-12">
      <AppTreeView
        v-if="item.children"
        :items="item.children"
      />
    </div>
  </div>
</template>
