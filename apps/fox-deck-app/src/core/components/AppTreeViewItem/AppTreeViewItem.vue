<script setup lang="ts">
import type {
  AppTreeViewItemOnItemSelect, AppTreeViewItemOnMenuActionSelect,
  AppTreeViewItemProps,
  AppTreeViewItemType
} from "@/core/components/AppTreeViewItem/AppTreeViewItem.types";
import AppIcon from "@/core/components/AppIcon/AppIcon.vue";
import {Icon} from "@/core/components/AppIcon/icons";
import AppMenu from "@/core/components/AppMenu/AppMenu.vue";

const props = withDefaults(defineProps<AppTreeViewItemProps>(), {
  isOpen: false,
  label: "",
  isSelected: false
});

const emit = defineEmits<{
  (e: "onItemSelect", value: AppTreeViewItemOnItemSelect): void;
  (e: "onMenuActionSelect", value: AppTreeViewItemOnMenuActionSelect): void;
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
    class="flex items-center justify-between text-black p-2 rounded-md cursor-pointer select-none hover:bg-gray-100"
    :class="{
      'bg-gray-100': isSelected
    }"
    tabindex="0"
    @click="onItemSelect"
    @keydown.enter="onItemSelect"
  >
    <span class="flex gap-2">

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
    <AppMenu
      tabindex="0"
      :identifier="identifier"
      :items="[
        {
          identifier: 'add_course',
          label: 'Course',
          icon: Icon.FOLDER
        },
        {
          identifier: 'add_note',
          label: 'Note',
          icon: Icon.DOCUMENT
        },
      ]"
      @on-action-select="$emit('onMenuActionSelect', $event)"
    >
      <AppIcon
        class="p-2 rounded-md hover:bg-gray-200"
        :icon="Icon.MENU_VERTICAL"
      />
    </AppMenu>
  </span>
</template>