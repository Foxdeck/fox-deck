<script setup lang="ts">
import FDTypography from "@/core/components/FDTypography/FDTypography.vue";
import type {FDRadioGroupItemId, FDRadioGroupItems} from "@/core/components/FDRadioGroup/FDRadioGroup.types";
import type {PropType} from "vue";

defineProps({
  name: { type: String, default: "" },
  items: { type: Array as PropType<FDRadioGroupItems>, default: () => [] },
  selectedItemId: {
    type: String as PropType<FDRadioGroupItemId>,
    default: "",
  },
});
</script>
<template>
  <fieldset class="flex flex-col gap-2">
    <div
      v-for="item of items"
      :key="item.id"
      data-testid="radio-group-item"
    >
      <input
        :id="item.id"
        :key="item.id"
        :name="name"
        :value="item.value"
        :checked="selectedItemId === item.id"
        type="radio"
        class="peer hidden [&:checked_+_label_svg]:block"
        data-testid="radio-group-item-input"
      >

      <label
        :for="item.id"
        class="flex cursor-pointer flex-col gap-1 rounded-lg border border-gray-300 bg-white p-4 text-sm font-medium shadow-sm peer-checked:ring-1 peer-checked:ring-blue-500 peer-checked:border-primary-500 hover:border-gray-200 dark:border-gray-600 dark:bg-gray-700"
      >
        <span class="flex items-center justify-between">
          <FDTypography
            type="psm"
            class="text-gray-700"
            data-testid="radio-group-item-label"
          >
            {{ item.label }}
          </FDTypography>
          <vue-feather
            v-if="selectedItemId === item.id"
            class="hidden h-5 w-5 text-primary-500"
            data-testid="radio-group-item-icon"
            type="check"
          />
        </span>

        <FDTypography
          type="pxs"
          class="text-gray-500"
          data-testid="radio-group-item-text"
        >
          {{ item.text }}
        </FDTypography>
      </label>
    </div>
  </fieldset>
</template>
