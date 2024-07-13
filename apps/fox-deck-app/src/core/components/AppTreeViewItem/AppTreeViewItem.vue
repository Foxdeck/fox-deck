<script setup lang="ts">
import AppIcon from "@/core/components/AppIcon/AppIcon.vue";
import {getOpenStateIcon, getResourceIcon} from "@/core/components/AppIcon/icon.utils";
import {Icon} from "@/core/components/AppIcon/icons";
import type {
  AppTreeViewItemOnItemSelect,
  AppTreeViewItemOnOpenContextMenu,
  AppTreeViewItemProps,
} from "@/core/components/AppTreeViewItem/AppTreeViewItem.types";

// we use Material Design 3 Focus Ring for focusing the treeView item
import "@material/web/focus/md-focus-ring";

const props = withDefaults(defineProps<AppTreeViewItemProps>(), {
  isOpen: false,
  label: "",
  isSelected: false
});

const emit = defineEmits<{
  (e: "onItemSelect", value: AppTreeViewItemOnItemSelect): void;
  (e: "onOpenContextMenu", value: AppTreeViewItemOnOpenContextMenu): void;
}>();

function isFolder(): boolean {
  return props.type === "folder";
}

function onItemSelect() {
  emit("onItemSelect", {identifier: props.identifier});
}

function onOpenContextMenu() {
  emit("onOpenContextMenu", {identifier: props.identifier});
}
</script>

<template>
  <span
    class="relative flex cursor-pointer items-center justify-between rounded-full p-3 outline-none"
    :class="{
      'secondary-container on-secondary-container-text': isSelected
    }"
    tabindex="0"
    @click="onItemSelect"
    @keydown.enter="onItemSelect"
    @contextmenu.prevent="onOpenContextMenu"
  >
    <md-focus-ring />
    <span class="flex gap-2">

      <template v-if="isLoading">
        <AppIcon
          class="animate-spin"
          :icon="Icon.SPINNER"
        />
        <span class="h-3 w-full animate-pulse rounded-full bg-gray-300" />
      </template>
      <template v-else>
        <AppIcon
          v-if="isFolder()"
          :icon="getOpenStateIcon(isOpen)"
        />
        <AppIcon
          v-if="getResourceIcon(type, isOpen, isSelected)"
          :icon="getResourceIcon(type, isOpen, isSelected)"
        />
        {{ label }}
      </template>
    </span>
  </span>
</template>