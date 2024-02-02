<script setup lang="ts">
import type {
  AppTreeViewItemOnItemSelect,
  AppTreeViewItemProps,
  AppTreeViewItemType
} from "@/core/components/AppTreeView/AppTreeViewItem.types";
import AppIcon from "@/core/components/AppIcon/AppIcon.vue";
import {Icon} from "@/core/components/AppIcon/icons";

const props = withDefaults(defineProps<AppTreeViewItemProps>(), {
  isOpen: false,
  label: ""
});

const emit = defineEmits<{
  (e: "onItemSelect", value: AppTreeViewItemOnItemSelect);
}>();

function getOpenIcon(isOpen: boolean): Icon {
  return isOpen ? Icon.CARET_DOWN : Icon.CARET_RIGHT;
}

function getTypeIcon(type: AppTreeViewItemType, isOpen: boolean): Icon {
  if (type === "document") return Icon.DOCUMENT_FILLED;
  if (type === "folder") {
    if (isOpen) {
      return Icon.FOLDER_FILLED_OPEN;
    }
    return Icon.FOLDER_FILLED;
  }

  console.error("(getTypeIcon) => can not get type-icon: ", props);
}

function canBeOpened(): boolean {
  return props.type === "folder";
}

function onItemSelect() {
  const select: AppTreeViewItemOnItemSelect = {
    identifier: props.identifier
  };

  emit("onItemSelect", select);
}
</script>

<template>
  <span
    class="flex items-center gap-2 text-black p-2 rounded-md cursor-pointer hover:bg-gray-100"
    tabindex="0"
    @click="onItemSelect"
    @keydown.enter="onItemSelect"
  >
    <AppIcon
      v-if="canBeOpened()"
      :icon="getOpenIcon(isOpen)"
    />
    <AppIcon :icon="getTypeIcon(type, isOpen)" />
    {{ label }}
  </span>
</template>