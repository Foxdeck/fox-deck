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

  const addQuestion = async () => {
    questions.value = [...questions.value];
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

  /**
   * Public API
   */
  return {
    filtering: filtering,
    questions: questions,
    fetchQuestions: fetchQuestions,
    addQuestion: addQuestion,
  };
});
