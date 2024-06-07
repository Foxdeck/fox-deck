<script setup lang="ts">
import AppTreeViewItem from "@/core/components/AppTreeViewItem/AppTreeViewItem.vue";
import type {AppTreeViewProps} from "@/core/components/AppTreeView/AppTreeView.types";
import type {
  AppTreeViewItemOnItemSelect,
  AppTreeViewItemOnMenuActionSelect
} from "@/core/components/AppTreeViewItem/AppTreeViewItem.types";

defineProps<AppTreeViewProps>();

defineEmits<{
  (e: "onItemSelect", value: AppTreeViewItemOnItemSelect): void;
  (e: "onMenuActionSelect", value: AppTreeViewItemOnMenuActionSelect): void;
}>();

</script>
<template>
  <div
    v-for="item in items"
    :key="item.identifier"
  >
    <AppTreeViewItem
      :identifier="item.identifier"
      :type="item.type"
      :label="isExpanded ? item.label : undefined"
      :is-open="item.children ? item.children.length > 0 : false"
      :is-selected="item.isSelected"
      :is-loading="false"
      :title="item.label"
      @on-item-select="$emit('onItemSelect', $event)"
      @on-menu-action-select="$emit('onMenuActionSelect', $event)"
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
