import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import type { QuestionsResponseDto } from "@/core/services/api";

/**
 * Stores the state for the question view.
 */
export const useQuestionsStore = defineStore("questionsStore", () => {
  const questions = ref<QuestionsResponseDto[]>([]);
  const filtering = reactive({
    selectedVisibilityId: "private",
  });

  /**
   * Update the questions of the question store.
   * @param newQuestions {QuestionsResponseDto[]} the new questions.
   */
  const updateQuestions = (newQuestions: QuestionsResponseDto[]): void => {
    questions.value = newQuestions;
  };

  /**
   * Returns if the question store contains questions.
   * This is useful while searching for questions to get some sort of empty state.
   */
  const hasQuestions = (): boolean => {
    return questions.value.length > 0;
  };

  /**
   * Public API
   */
  return {
    filtering: filtering,
    questions: questions,
    updateQuestions: updateQuestions,
    hasQuestions: hasQuestions,
  };
});
