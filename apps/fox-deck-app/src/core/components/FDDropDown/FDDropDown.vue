<script setup lang="ts">
import { PropType } from "vue";
import type { DropdownItem } from "@/core/components/FDDropDown/FDDropDown.types";

defineProps({
  items: { type: Object as PropType<DropdownItem[]>, default: [] },
  selectedItem: { type: Object as PropType<DropdownItem>, default: null },
  isOpen: { type: Boolean, default: false },
});
</script>

<template>
  <div class="relative">
    <div
      class="inline-flex items-center overflow-hidden rounded-md border bg-white"
    >
      <span
        v-if="selectedItem?.label"
        class="border-e px-4 py-2 text-sm/none cursor-default"
      >
        {{ selectedItem?.label }}
      </span>

      <button
        class="h-full p-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700"
      >
        <span class="sr-only">Menu</span>
        <vue-feather type="chevron-down" size="14" />
      </button>
    </div>

    <div
      v-if="isOpen"
      class="absolute z-50 mt-2 w-fit min-w-[140px] divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg"
      role="menu"
    >
      <div class="p-2">
        <span
          v-for="item of items"
          class="gap-2 flex items-center px-4 py-2 rounded-md text-sm cursor-pointer hover:bg-gray-50"
          :class="{
            '!bg-primary-200/30': item === selectedItem,
          }"
          role="menuitem"
        >
          <vue-feather
            type="check"
            size="14"
            :stroke-width="item === selectedItem ? 3 : 0"
          />
          {{ item.label }}
        </span>
      </div>
    </div>
  </div>
</template>
