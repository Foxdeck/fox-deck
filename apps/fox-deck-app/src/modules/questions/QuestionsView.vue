<script setup lang="ts">
import ContentLayout from "@/core/components/Layouts/ContentLayout.vue";
import FDTypography from "@/core/components/FDTypography/FDTypography.vue";
import FDTextInput from "@/core/components/FDTextInput/FDTextInput.vue";
import QuestionFilter from "@/modules/questions/components/QuestionFilter.vue";
import QuestionSearchEmpty from "@/modules/questions/components/QuestionSearchEmpty.vue";
import { useQuestionsStore } from "@/modules/questions/questions.store";
import QuestionList from "@/modules/questions/components/QuestionList.vue";
import FDDropDown from "@/core/components/FDDropDown/FDDropDown.vue";
import FDButton from "@/core/components/FDButton/FDButton.vue";

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

  <!-- Modal toggle -->
  <dialog
    open
    aria-hidden="true"
    class="hidden flex justify-center items-center bg-black/80 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-screen"
  >
    <div class="relative p-4 w-full max-w-md max-h-full">
      <div class="relative bg-white rounded-md shadow">
        <div
          class="flex items-center justify-between p-4 md:p-5 border-b rounded-t"
        >
          <FDTypography>Frage erstellen</FDTypography>
        </div>
        <form class="p-4 md:p-5" @submit.prevent>
          <div class="grid gap-4 mb-4 grid-cols-2">
            <div class="col-span-2">
              <FDTextInput label="Frage" value="" />
            </div>
            <div class="col-span-2">
              <FDTextInput label="Lösung" value="" />
            </div>
            <div class="col-span-2">
              <FDDropDown :items="[]" />
            </div>
          </div>
          <div class="flex justify-between">
            <FDButton
              severity="danger"
              type="secondary"
              icon="x"
              label="Abbrechen"
            />
            <FDButton icon="save" label="Speichern" />
          </div>
        </form>
      </div>
    </div>
  </dialog>
</template>
