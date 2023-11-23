<script setup lang="ts">
import FDDropDown from "@/core/components/FDDropDown/FDDropDown.vue";
import FDTypography from "@/core/components/FDTypography/FDTypography.vue";
import FDRadioGroup from "@/core/components/FDRadioGroup/FDRadioGroup.vue";
import { FDRadioGroupItems } from "@/core/components/FDRadioGroup/FDRadioGroup.types";
import { FDDropdownItem } from "@/core/components/FDDropDown/FDDropDown.types";
import { useQuestionsStore } from "@/modules/questions/stores/questions.store";

const questionsStore = useQuestionsStore();
const visibilityItems: FDRadioGroupItems = [
  {
    id: "private",
    label: "Eigene Fragen",
    text: "Zeigt nur eigene Fragen an.",
    value: "private",
  },
  {
    id: "public",
    label: "Öffentliche Fragen",
    text: "Zeigt Fragen aus der Community an.",
    value: "public",
  },
];

const categoryItems: FDDropdownItem[] = [
  {
    id: "all",
    label: "Alle",
    value: "all",
  },
  {
    id: "wiso",
    label: "WiSo",
    value: "wiso",
  },
];
</script>
<template>
  <div
    class="flex flex-col gap-2 bg-white h-fit p-4 rounded-md shadow-sm dark:bg-gray-800 dark:text-white"
  >
    <div class="flex gap-2">
      <vue-feather
        size="14"
        type="filter"
      />
      <FDTypography
        type="psm"
        class="font-bold"
      >
        Filter
      </FDTypography>
    </div>
    <FDTypography type="pxs">
      Finde genau die Fragen, die du suchst.
    </FDTypography>
    <FDRadioGroup
      name="visibilityOption"
      :items="visibilityItems"
      :selected-item-id="questionsStore.filtering.selectedVisibilityId"
    />
    <FDTypography
      type="pxs"
      class="font-bold"
    >
      Kategorie
    </FDTypography>
    <FDDropDown
      :items="categoryItems"
      :selected-item="categoryItems[0]"
    />
  </div>
</template>
