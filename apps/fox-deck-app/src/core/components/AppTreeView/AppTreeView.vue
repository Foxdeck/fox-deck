<script setup lang="ts">
import AppTreeViewItem from "@/core/components/AppTreeViewItem/AppTreeViewItem.vue";
import type {AppTreeViewProps} from "@/core/components/AppTreeView/AppTreeView.types";
import {useResources} from "@/modules/resource-navigation/composables/useResources";

defineProps<AppTreeViewProps>();

defineEmits(["onItemSelect"]);

// TODO: this solution is not really good, because AppTreeView now depends on logic for resources. Will improve it later.
const { getLoadingResourcePlaceholder } = useResources();
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
      :is-open="item.children ? item.children.length > 0 : false"
      :is-selected="item.isSelected"
      :is-loading="item.identifier === getLoadingResourcePlaceholder(item.identifier).resourceId"
      :title="item.label"
      @on-item-select="$emit('onItemSelect', $event)"
    />
    <div class="ml-12">
      <AppTreeView
        v-if="item.children"
        :items="item.children"
        @on-item-select="$emit('onItemSelect', $event)"
      />
    </div>
  </div>
</template>
