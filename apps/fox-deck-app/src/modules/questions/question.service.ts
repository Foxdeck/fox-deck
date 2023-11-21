import axios from "axios";
import type { FDRadioGroupItems } from "@/core/components/FDRadioGroup/FDRadioGroup.types";
import type { Question, Questions } from "@/types/question.types";
import { useNotificationStore } from "@/core/stores/notification.store";

class QuestionService {
  private notificationStore = useNotificationStore();

  public visibilityItems: FDRadioGroupItems = [
    {
      id: "private",
      label: "Eigene Fragen",
      text: "Zeigt nur eigene Fragen an.",
      value: "private",
    },
    {
      id: "public",
      label: "Öffentliche Fragen",
      text: "Zeigt alle Fragen an.",
      value: "public",
    },
  ];

  /**
   * Fetch every question from the backend.
   */
  async fetchQuestions(): Promise<Questions> {
    try {
      const response = await axios(`http://localhost:3000/question`);
      return response.data satisfies Questions;
    } catch (e) {
      this.notificationStore.addNotification({
        title: "Fehler beim laden der Fragen",
        text: "Beim laden der Fragen ist ein Fehler aufgetreten. Bitte aktualisiere die Seite oder versuche es später noch einmal.",
        severity: "danger",
      });
      return [] satisfies Questions;
    }
  }

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
