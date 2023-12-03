<script setup lang="ts">
import {ref} from "vue";
import type {FDDropdownItem} from "@/core/components/FDDropDown/FDDropDown.types";

export type FDDropdownProps = {
  readonly items?: FDDropdownItem[];
  readonly selectedItem?: FDDropdownItem;
}

withDefaults(defineProps<FDDropdownProps>(), {
  items: () => [],
  selectedItem: undefined,
});

const isOpen = ref(false);

</script>

<template>
  <div class="relative">
    <div
      class="inline-flex items-center overflow-hidden rounded-md border bg-white dark:border-gray-600 dark:bg-gray-700"
    >
      <span
        v-if="selectedItem?.label"
        class="cursor-default px-4 py-2 border-e text-sm/none dark:border-gray-600"
      >
        {{ selectedItem?.label }}
      </span>

      <button
        class="h-full p-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700 dark:text-white"
        data-testid="dropdown-open-button"
        @click="isOpen = !isOpen"
      >
        <span class="sr-only">Menu</span>
        <vue-feather
          type="chevron-down"
          size="14"
        />
      </button>
    </div>
    <div
      v-if="isOpen"
      class="absolute z-50 mt-2 w-fit rounded-md border border-gray-100 bg-white shadow-lg min-w-[140px] divide-y divide-gray-100 dark:border-gray-600 dark:bg-gray-700"
      role="menu"
      data-testid="dropdown-item-list"
    >
      <div
        class="p-2"
      >
        <span
          v-for="item of items"
          :key="item.id"
          class="flex cursor-pointer items-center gap-2 rounded-md px-4 py-2 text-sm hover:bg-gray-50"
          :class="{
            '!bg-primary-200/30': item === selectedItem,
          }"
          role="menuitem"
          data-testid="dropdown-item"
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
