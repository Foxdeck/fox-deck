import axios from "axios";
import type { Question, Questions } from "@/types/question.types";
import { useNotificationStore } from "@/core/stores/notification.store";

/**
 * @deprecated This service is replaced by questionsStore.
 * @see questions.store.ts
 */
class QuestionService {
  private notificationStore = useNotificationStore();

  /**
   * Fetch a specific question from the backend.
   * @param id {string} id of the question to fetch.
   */
  async festQuestionById(id: string): Promise<Question | undefined> {
    try {
      const response = await axios(`http://localhost:3000/question/${id}`);
      return response.data satisfies Questions;
    } catch (e) {
      this.notificationStore.addNotification({
        title: "Fehler beim laden der Frage",
        text: "Beim laden der Frage ist ein Fehler aufgetreten. Bitte aktualisiere die Seite oder versuche es später noch einmal.",
        severity: "danger",
      });
    }
  }
}

export default new QuestionService();
