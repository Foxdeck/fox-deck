<script setup lang="ts">
import type {
  AppTreeViewItemOnItemSelect,
  AppTreeViewItemProps,
  AppTreeViewItemType
} from "@/core/components/AppTreeViewItem/AppTreeViewItem.types";
import AppIcon from "@/core/components/AppIcon/AppIcon.vue";
import {Icon} from "@/core/components/AppIcon/icons";

const props = withDefaults(defineProps<AppTreeViewItemProps>(), {
  isOpen: false,
  label: "",
  isSelected: false
});

const emit = defineEmits<{
  (e: "onItemSelect", value: AppTreeViewItemOnItemSelect): void;
}>();

function getOpenIcon(isOpen: boolean): Icon {
  return isOpen ? Icon.CARET_DOWN : Icon.CARET_RIGHT;
}

function getTypeIcon(type: AppTreeViewItemType, isOpen: boolean, isSelected: boolean): Icon | undefined {
  if (type === "note") {
    if (isSelected) {
      return Icon.DOCUMENT_FILLED;
    }
    return Icon.DOCUMENT;
  }

  if (type === "folder") {
    if (isOpen) return Icon.FOLDER_FILLED_OPEN;

    return Icon.FOLDER;
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
    class="flex items-center gap-2 text-black p-2 rounded-md cursor-pointer select-none truncate hover:bg-gray-100"
    :class="{
      'bg-gray-100': isSelected
    }"
    tabindex="0"
    @click="onItemSelect"
    @keydown.enter="onItemSelect"
  >
    <template v-if="isLoading">
      <AppIcon
        class="animate-spin"
        :icon="Icon.SPINNER"
      />
      <span class="w-full h-3 rounded-full bg-gray-300 animate-pulse" />
    </template>
    <template v-else>
      <AppIcon
        v-if="canBeOpened()"
        :icon="getOpenIcon(isOpen)"
      />
      <AppIcon
        v-if="getTypeIcon(type, isOpen, isSelected)"
        :icon="getTypeIcon(type, isOpen, isSelected)"
      />
      {{ label }}
    </template>
  </span>
</template>