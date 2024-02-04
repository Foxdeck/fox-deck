<script setup lang="ts">
import AppTreeView from "@/core/components/AppTreeView/AppTreeView.vue";
import type {AppTreeViewItemProps} from "@/core/components/AppTreeViewItem/AppTreeViewItem.types";

const items: AppTreeViewItemProps[] = [
  {
    identifier: "f-biology-1",
    label: "Biology",
    type: "folder",
    isOpen: true,
    children: [
      {
        identifier: "d-cell-biology",
        type: "document",
        label: "Cell Biology",
      },
      {
        identifier: "f-genetics-1",
        type: "folder",
        label: "Genetics",
        isOpen: true,
        children: [
          {
            identifier: "d-dna-structure",
            type: "document",
            label: "DNA Structure",
          },
          {
            identifier: "d-genetic-variation",
            type: "document",
            label: "Genetic Variation",
          }
        ]
      },
      {
        identifier: "d-ecology",
        isSelected: true,
        type: "document",
        label: "Ecology",
      }
    ]
  },
  {
    identifier: "f-math-1",
    label: "Mathematics",
    type: "folder",
    isOpen: true,
    children: [
      {
        identifier: "f-algebra-1",
        type: "folder",
        label: "Algebra",
        isOpen: false,
      },
      {
        identifier: "d-geometry",
        type: "document",
        label: "Geometry",
      }
    ]
  },
  {
    identifier: "f-history-1",
    label: "History",
    type: "folder",
    isOpen: true,
    children: [
      {
        identifier: "d-world-war-1",
        type: "document",
        label: "World War I",
      },
      {
        identifier: "d-world-war-2",
        type: "document",
        label: "World War II",
      }
    ]
  },
  {
    identifier: "d-todo-1",
    label: "To-Do List",
    type: "document"
  }
];

</script>
<template>
  <Story
    title="Components/TreeView/TreeView"
  >
    <AppTreeView :items="items" />
  </Story>
</template>
