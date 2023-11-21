<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { Questions } from "@/types/question.types";
import ContentLayout from "@/core/components/Layouts/ContentLayout.vue";
import FDGrid from "@/core/components/FDGrid/FDGrid.vue";
import FDEditableText from "@/core/components/FDEditableText.vue";
import FDTypography from "@/core/components/FDTypography/FDTypography.vue";
import FDRadioGroup from "@/core/components/FDRadioGroup/FDRadioGroup.vue";
import QuestionService from "@/modules/questions/question.service";
import { useQuestionsStore } from "@/modules/questions/questions.store";
import FDSwitch from "@/core/components/FDSwitch/FDSwitch.vue";

const questionsStore = useQuestionsStore();

onMounted(async () => {
  items.value = await QuestionService.fetchQuestions();
});

const items = ref<Questions>([]);
</script>

<template>
  <ContentLayout>
    <div class="flex flex-col p-10 h-full gap-4">
      <FDTypography type="h1">Fragen</FDTypography>
      <FDTypography type="p" class="leading-10">
        Hier kannst du deine Fragen erstellen, welche du später zu verschiedenen
        Lerneinheiten hinzufügen kannst. Du kannst auch spannende Fragen aus der
        Community entdecken und, wenn sie dir zusagen, ganz einfach zu deinen
        Inhalten hinzufügen.
      </FDTypography>
    </div>
    <div class="flex flex-col gap-2 mx-10">
      <FDRadioGroup
        name="visibilityOption"
        :items="QuestionService.visibilityItems"
        :selected-item-id="questionsStore.filtering.selectedVisibilityId"
      />
      <FDGrid
        v-for="item of items"
        class="relative shadow-md p-8 bg-white rounded-md w-full"
      >
        <div class="flex flex-col gap-4 col-span-9">
          <FDEditableText :value="item.question" />

          <span class="text-gray-800 max-w-[800px] leading-7">
            {{ item.solution }}
          </span>
          <div class="flex gap-2">
            <span
              class="border text-sm font-gabarito py-2 px-4 rounded-full w-fit"
            >
              WiSo
            </span>
            <span
              class="border text-sm font-gabarito py-2 px-4 rounded-full w-fit"
            >
              Wirtschaft - einfach
            </span>
            <span
              class="bg-black text-sm font-gabarito py-2 px-4 text-white rounded-full w-fit"
            >
              + 3 weitere
            </span>
          </div>
        </div>
        <div class="col-span-3">
          <div class="absolute top-0 right-0 flex flex-col gap-2 p-4">
            <FDSwitch :checked="item.isPublic" />
          </div>
          <span class="text-xs text-right block italic">
            {{ item.authorId }}
          </span>
        </div>
      </FDGrid>
    </div>
  </ContentLayout>
</template>
