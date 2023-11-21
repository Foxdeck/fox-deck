import { defineStore } from "pinia";
import { ref } from "vue";

/**
 * Stores the state for the question view.
 */
export const useQuestionsStore = defineStore("questionsStore", () => {
  const filtering = ref({
    selectedVisibilityId: "public",
  });

  const fetchQuestions = () => {
    // TODO: implement
  };

  /**
   * Public API
   */
  return {
    filtering: filtering,
  };
});
