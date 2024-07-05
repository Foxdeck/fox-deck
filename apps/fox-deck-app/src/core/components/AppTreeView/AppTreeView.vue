<script setup lang="ts">
import type {AppTreeViewProps} from "@/core/components/AppTreeView/AppTreeView.types";
import type {
  AppTreeViewItemOnItemSelect,
  AppTreeViewItemOnMenuActionSelect
} from "@/core/components/AppTreeViewItem/AppTreeViewItem.types";
import AppTreeViewItem from "@/core/components/AppTreeViewItem/AppTreeViewItem.vue";

defineProps<AppTreeViewProps>();

defineEmits<{
  (e: "onItemSelect", value: AppTreeViewItemOnItemSelect): void;
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
      :label="item.label"
      :is-open="item.children ? item.children.length > 0 : false"
      :is-selected="item.isSelected"
      :is-loading="false"
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
