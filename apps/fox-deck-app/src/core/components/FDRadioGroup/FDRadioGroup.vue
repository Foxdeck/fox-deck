<script setup lang="ts">
import FDTypography from "@/core/components/FDTypography/FDTypography.vue";
import type {
  FDRadioGroupItemId,
  FDRadioGroupItems,
} from "@/core/components/FDRadioGroup/FDRadioGroup.types";
import type { PropType } from "vue";

defineProps({
  name: { type: String, default: "" },
  items: { type: Object as PropType<FDRadioGroupItems>, default: [] },
  selectedItemId: {
    type: Object as PropType<FDRadioGroupItemId>,
    default: "",
  },
});
</script>
<template>
  <fieldset class="flex flex-col gap-2">
    <div v-for="item of items">
      <input
        type="radio"
        class="peer hidden [&:checked_+_label_svg]:block"
        :name="name"
        :value="item.value"
        :id="item.id"
        :checked="selectedItemId === item.id"
      />

      <label
        :for="item.id"
        class="flex flex-col gap-1 cursor-pointer rounded-lg border border-gray-300 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-primary-500 peer-checked:ring-1 peer-checked:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
      >
        <span class="flex items-center justify-between">
          <FDTypography type="psm" class="text-gray-700">
            {{ item.label }}
          </FDTypography>
          <vue-feather
            v-if="selectedItemId === item.id"
            class="hidden h-5 w-5 text-primary-500"
            type="check"
          />
        </span>

        <FDTypography type="pxs" class="text-gray-500">
          {{ item.text }}
        </FDTypography>
      </label>
    </div>
  </fieldset>
</template>
