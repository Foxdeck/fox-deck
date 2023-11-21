<script setup lang="ts">
import ContentLayout from "@/core/components/Layouts/ContentLayout.vue";
import FDTypography from "@/core/components/FDTypography/FDTypography.vue";
import FDRadioGroup from "@/core/components/FDRadioGroup/FDRadioGroup.vue";
import { useQuestionsStore } from "@/modules/questions/questions.store";
import FDButton from "@/core/components/FDButton/FDButton.vue";
import QuestionCard from "@/modules/questions/components/QuestionCard.vue";
import { FDRadioGroupItems } from "@/core/components/FDRadioGroup/FDRadioGroup.types";
import FDDropDown from "@/core/components/FDDropDown/FDDropDown.vue";
import { FDDropdownItem } from "@/core/components/FDDropDown/FDDropDown.types";
import FDTextInput from "@/core/components/FDTextInput/FDTextInput.vue";

const questionsStore = useQuestionsStore();

await questionsStore.fetchQuestions();

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
  <ContentLayout>
    <div class="flex flex-col h-full gap-4">
      <FDTypography type="h1">Fragen</FDTypography>
      <FDTypography type="p" class="leading-10">
        Hier kannst du eigene Fragen erstellen, welche du später zu
        verschiedenen Lerneinheiten hinzufügen kannst. Du kannst auch spannende
        Fragen aus der Community entdecken und, wenn sie dir zusagen, ganz
        einfach zu deinen Inhalten hinzufügen.
      </FDTypography>
    </div>

    <FDTextInput label="Suchen" value="" icon="search" />
    <div class="flex flex-row gap-6">
      <div class="flex flex-col gap-2 bg-white h-fit p-4 rounded-md shadow-sm">
        <div class="flex gap-2">
          <vue-feather size="14" type="filter" />
          <FDTypography type="psm" class="font-bold">Filter</FDTypography>
        </div>
        <FDTypography type="pxs">
          Finde genau die Fragen, die du suchst.
        </FDTypography>
        <FDRadioGroup
          name="visibilityOption"
          :items="visibilityItems"
          :selected-item-id="questionsStore.filtering.selectedVisibilityId"
        />
        <FDTypography type="pxs" class="font-bold">Kategorie</FDTypography>
        <FDDropDown :items="categoryItems" :selected-item="categoryItems[0]" />
      </div>
      <div class="flex flex-col w-full">
        <QuestionCard
          v-for="item in questionsStore.questions"
          :question="item.question"
          :solution="item.solution"
          :is-public="item.isPublic"
          author="LearningFox"
        />
      </div>
    </div>
  </ContentLayout>
</template>
