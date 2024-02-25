<script setup>
import AppTreeViewItem from "@/core/components/AppTreeViewItem/AppTreeViewItem.vue";

function onAppTreeViewItemSelect(identifier) {
  alert(JSON.stringify(identifier));
}

</script>
<template>
  <Story
    title="Components/TreeView/TreeViewItem"
    :layout="{ type: 'grid', iframe: false }"
  >
    <Variant title="Folder">
      <AppTreeViewItem
        identifier="f-ecology-1"
        type="folder"
        label="Ecology"
        @on-item-select="onAppTreeViewItemSelect"
      />
    </Variant>
    <Variant title="Folder open">
      <AppTreeViewItem
        identifier="f-ecology-1"
        type="folder"
        label="Ecology"
        :is-open="true"
        @on-item-select="onAppTreeViewItemSelect"
      />
    </Variant>
    <Variant title="Note">
      <AppTreeViewItem
        identifier="d-ecology-1"
        type="note"
        label="Ecology"
        @on-item-select="onAppTreeViewItemSelect"
      />
    </Variant>
  </Story>
</template>