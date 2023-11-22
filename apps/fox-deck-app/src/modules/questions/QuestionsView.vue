<script setup lang="ts">
import ContentLayout from "@/core/components/Layouts/ContentLayout.vue";
import FDTypography from "@/core/components/FDTypography/FDTypography.vue";
import FDTextInput from "@/core/components/FDTextInput/FDTextInput.vue";
import QuestionFilter from "@/modules/questions/components/QuestionFilter.vue";
import QuestionSearchEmpty from "@/modules/questions/components/QuestionSearchEmpty.vue";
import { useQuestionsStore } from "@/modules/questions/questions.store";
import QuestionList from "@/modules/questions/components/QuestionList.vue";

const questionsStore = useQuestionsStore();
await questionsStore.fetchQuestions();
</script>

<template>
  <ContentLayout>
    <div class="flex flex-col h-full gap-8">
      <FDTypography type="h1">Fragen</FDTypography>
      <FDTypography type="p" class="leading-10">
        Hier kannst du eigene Fragen erstellen, welche du später zu
        verschiedenen Lerneinheiten hinzufügen kannst. Du kannst auch spannende
        Fragen aus der Community entdecken und, wenn sie dir zusagen, ganz
        einfach zu deinen Inhalten hinzufügen.
      </FDTypography>
    </div>

    <FDTextInput
      label="Suchen"
      value=""
      icon="search"
      @onInput="questionsStore.searchQuestion($event)"
    />
    <FDTypography type="pxs" class="italic text-right">
      3 Fragen gefunden
    </FDTypography>
    <div class="flex flex-row gap-6">
      <QuestionFilter />
      <QuestionList v-if="questionsStore.hasQuestions()" />
      <QuestionSearchEmpty v-else />
    </div>
  </ContentLayout>
</template>
