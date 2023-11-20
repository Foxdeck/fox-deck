<script setup lang="ts">
import { useQuestionnaireStore } from "@/core/stores/questionnaire.store";
import RepeatQuestionnaireCard from "@/core/components/RepeatQuestionnaireCard.vue";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import SwipeRandomTransition from "@/core/components/Transitions/SwipeRandomTransition.vue";
import FDQuizCard from "@/core/components/FDQuizCard/FDQuizCard.vue";
import FDButton from "@/core/components/FDButton/FDButton.vue";

const questionStore = useQuestionnaireStore();
const route = useRoute();
onMounted(async () => {
  const id = route.params.id as string;
  await questionStore.updateQuestions(id);
});
</script>

<template>
  <div
    class="flex justify-center items-center overflow-x-hidden bg-primary-100 w-screen h-screen"
  >
    <RepeatQuestionnaireCard
      v-if="
        questionStore.initialQuestions.length > 0 &&
        questionStore.questions.length === 0
      "
      :not-good-at="questionStore.calculateMetrics().notGoodAt"
      :average="questionStore.calculateMetrics().average"
      :good-at="questionStore.calculateMetrics().goodAt"
      :times-answered="questionStore.calculateMetrics().timesAnswered"
      :are-ai-questions="questionStore.areAiQuestions"
      @onRepeatClick="questionStore.resetQuestions()"
    >
    </RepeatQuestionnaireCard>
    <SwipeRandomTransition>
      <FDQuizCard
        v-for="question of questionStore.questions"
        class="absolute"
        :key="question.id"
        :question="question.question"
        :solution="question.solution"
        @onNextQuestion="questionStore.nextQuestion($event, question)"
      >
      </FDQuizCard>
    </SwipeRandomTransition>
    <RouterLink to="/">
      <FDButton
        class="absolute bottom-6 right-6 p-4"
        icon="arrow-left"
        label="Zurück zur Übersicht"
      >
      </FDButton>
    </RouterLink>
  </div>
</template>
