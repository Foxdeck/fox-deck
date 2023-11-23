import { api } from "@/core/services";
import { useQuestionsStore } from "@/modules/questions/questions.store";
import { useNotificationStore } from "@/core/stores/notification.store";

export function useQuestions() {
  const { addNotification } = useNotificationStore();
  const { updateQuestions } = useQuestionsStore();

  /**
   * Fetch questions and update the state.
   */
  async function fetchQuestions() {
    try {
      const response = await api.question.questionControllerGetQuestions();
      updateQuestions(response.data);
    } catch (e) {
      addNotification({
        title: "Fehler beim Laden der Fragen",
        text: "Bitte aktualisieren Sie die Seite oder versuchen Sie es später noch einmal.",
        severity: "danger",
      });
    }
  }

  return {
    fetchQuestions: fetchQuestions,
  };
}
