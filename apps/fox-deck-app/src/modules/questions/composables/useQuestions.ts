import { api } from "@/core/services";
import { useQuestionsStore } from "@/modules/questions/stores/questions.store";
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

  /**
   * Search for questions via back-end call.
   * @param search {string} the searchstring, for search to work it must not be empty.
   */
  async function searchQuestions(search: string): Promise<void> {
    try {
      if (search.trim().length === 0) {
        const response = await api.question.questionControllerGetQuestions();
        updateQuestions(response.data);
        return;
      }
      const response =
        await api.search.questionControllerGetQuestionsByText(search);
      updateQuestions(response.data);
    } catch (e) {
      addNotification({
        title: "Fehler beim Suchen der Fragen",
        text: "Bitte aktualisieren Sie die Seite oder versuchen Sie es später noch einmal.",
        severity: "danger",
      });
    }
  }

  return {
    fetchQuestions: fetchQuestions,
    searchQuestions: searchQuestions,
  };
}
