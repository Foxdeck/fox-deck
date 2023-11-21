import { defineStore } from "pinia";
import { ref } from "vue";
import type { Questions } from "@/types/question.types";
import { useApi } from "@/core/composables/useApi";
import { useNotificationStore } from "@/core/stores/notification.store";

/**
 * Stores the state for the question view.
 */
export const useQuestionsStore = defineStore("questionsStore", () => {
  const api = useApi();
  const notificationStore = useNotificationStore();

  const questions = ref<Questions>([]);
  const filtering = ref({
    selectedVisibilityId: "private",
  });

  /**
   * Search for questions via back-end call.
   * @param search {string} the searchstring, for search to work it must not be empty.
   */
  const searchQuestion = async (search: string): Promise<void> => {
    try {
      if (search.trim().length === 0) {
        await fetchQuestions();
        return;
      }
      const response = await api.get(`search/question/${search}`);
      questions.value = response.data;
    } catch (e) {
      notificationStore.addNotification({
        title: "Fehler beim Suchen der Fragen",
        text: "Bitte aktualisieren Sie die Seite oder versuchen Sie es später noch einmal.",
        severity: "danger",
      });
    }
  };

  /**
   * Fetch questions and update the state.
   */
  const fetchQuestions = async () => {
    try {
      const response = await api.get("question");
      questions.value = response.data;
    } catch (e) {
      notificationStore.addNotification({
        title: "Fehler beim Laden der Fragen",
        text: "Bitte aktualisieren Sie die Seite oder versuchen Sie es später noch einmal.",
        severity: "danger",
      });
    }
  };

  const hasQuestions = () => {
    return questions.value.length > 0;
  };

  /**
   * Public API
   */
  return {
    filtering: filtering,
    questions: questions,
    fetchQuestions: fetchQuestions,
    searchQuestion: searchQuestion,
    hasQuestions: hasQuestions,
  };
});
