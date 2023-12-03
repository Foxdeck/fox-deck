<script setup lang="ts">
import FDTypography from "@/core/components/FDTypography/FDTypography.vue";
import FDRadioGroup from "@/core/components/FDRadioGroup/FDRadioGroup.vue";
import {FDRadioGroupItems} from "@/core/components/FDRadioGroup/FDRadioGroup.types";
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

</script>
<template>
  <FDCard class="w-[200px]">
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
    </template>
  </FDCard>
</template>
