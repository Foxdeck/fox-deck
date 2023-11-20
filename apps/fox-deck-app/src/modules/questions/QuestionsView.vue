<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { Questions } from "@/types/question.types";
import { useQuestionService } from "@/core/composables/useQuestionService";
import ContentLayout from "@/core/components/Layouts/ContentLayout.vue";
import FDGrid from "@/core/components/FDGrid/FDGrid.vue";
import FDButton from "@/core/components/FDButton/FDButton.vue";
import FDEditableText from "@/core/components/FDEditableText.vue";

const questionService = useQuestionService();

onMounted(async () => {
  items.value = await questionService.fetchAllQuestions();
});

const items = ref<Questions>([]);
</script>

<template>
  <ContentLayout>
    <div class="flex flex-col p-10 h-full gap-4">
      <h1 class="text-7xl font-serif font-bold text-primary-950">Fragen</h1>
      <span class="text-2xl mt-2 leading-10">
        Hier kannst du deine Fragen erstellen, welche du später zu verschiedenen
        Lerneinheiten hinzufügen kannst.
      </span>
    </div>
    <div class="flex flex-col gap-2 mx-10">
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
          <div class="absolute top-0 right-0 flex flex-col gap-2">
            Public <input type="radio" />
            <FDButton
              type="secondary"
              icon="trash"
              class="rounded-none border-none"
              severity="danger"
            />
          </div>
          <span class="text-xs text-right block italic">@JohnDoe</span>
        </div>
      </FDGrid>
    </div>
  </ContentLayout>
</template>
