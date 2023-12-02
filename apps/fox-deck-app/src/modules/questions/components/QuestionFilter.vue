<script setup lang="ts">
import FDDropDown from "@/core/components/FDDropDown/FDDropDown.vue";
import FDTypography from "@/core/components/FDTypography/FDTypography.vue";
import FDRadioGroup from "@/core/components/FDRadioGroup/FDRadioGroup.vue";
import {FDRadioGroupItems} from "@/core/components/FDRadioGroup/FDRadioGroup.types";
import {FDDropdownItem} from "@/core/components/FDDropDown/FDDropDown.types";
import {useQuestionsStore} from "@/modules/questions/stores/questions.store";
import {useI18n} from "vue-i18n";
import FDCard from "@/core/components/FDCard/FDCard.vue";

const questionsStore = useQuestionsStore();
const { t } = useI18n();

const visibilityItems: FDRadioGroupItems = [
  {
    id: "private",
    label: t("questions.question_filter.visibility_items.private_label"),
    text: t("questions.question_filter.visibility_items.private_text"),
    value: "private",
  },
  {
    id: "public",
    label: t("questions.question_filter.visibility_items.public_label"),
    text: t("questions.question_filter.visibility_items.public_text"),
    value: "public",
  },
];

const categoryItems: FDDropdownItem[] = [
  {
    id: "all",
    label: t("questions.question_filter.category_items.all"),
    value: "all",
  },
  {
    id: "wiso",
    label: t("questions.question_filter..category_items.wiso"),
    value: "wiso",
  },
];
</script>
<template>
  <FDCard
    class="flex h-fit flex-col gap-2 rounded-md bg-white p-4 shadow-sm"
  >
    <template #body>
      <div class="flex gap-2">
        <vue-feather
          size="14"
          type="filter"
        />
        <FDTypography
          type="psm"
          class="font-bold"
        >
          {{ t("questions.question_filter.title") }}
        </FDTypography>
      </div>
      <FDTypography type="pxs">
        {{ t("questions.question_filter.text") }}
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
        {{ t("questions.question_filter.category") }}
      </FDTypography>
      <FDDropDown
        :items="categoryItems"
        :selected-item="categoryItems[0]"
      />
    </template>
  </FDCard>
</template>
