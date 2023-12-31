import {api} from "@/core/services";
import {useQuestionsStore} from "@/modules/questions/stores/questions.store";
import {useNotificationStore} from "@/core/stores/notification.store";
import {CreateQuestionException} from "@/modules/questions/exceptions/CreateQuestionException";
import {type CreateQuestionRequestDto} from "@/core/services/api";
import {FetchQuestionException} from "@/modules/questions/exceptions/FetchQuestionException";
import {SearchQuestionException} from "@/modules/questions/exceptions/SearchQuestionException";
import {useAuthStore} from "@/core/stores/auth.store";
import {DeleteQuestionException} from "@/modules/questions/exceptions/DeleteQuestionException";

/**
 * Composable which abstracts the CRUD operations for questions to the backend.
 */
export function useQuestions() {
  const { jwt } = useAuthStore();
  const { addNotification } = useNotificationStore();
  const { updateQuestions } = useQuestionsStore();

  /**
   * Create a new question.
   * @param question {CreateQuestionRequestDto} the question to create.
   */
  async function createQuestion(question: CreateQuestionRequestDto): Promise<void> {
    try {
      await api.question.questionControllerCreateQuestion(question, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
    } catch (e) {
      throw new CreateQuestionException();
    }
  }

  /**
   * Update an already existing question by its id.
   * @param questionId {string} the question to update.
   * @param question {CreateQuestionRequestDto} the updated question.
   */
  async function updateQuestion(
    questionId: string,
    question: CreateQuestionRequestDto
  ): Promise<void> {
    try {
      await api.question.questionControllerUpdateQuestion(questionId, question);
    } catch (e) {
      addNotification({
        title: "Fehler beim Aktualisieren der Frage",
        text: "Bitte aktualisieren Sie die Seite oder versuchen Sie es später noch einmal.",
        severity: "danger",
      });
    }
  }

  /**
   * Fetch questions and update the state.
   */
  async function fetchQuestions(): Promise<void> {
    try {
      const response = await api.question.questionControllerGetQuestions();
      updateQuestions(response.data);
    } catch (e) {
      throw new FetchQuestionException();
    }
  }

  /**
   * delete question.
   */
  async function deleteQuestion(questionId: string): Promise<void> {
    try {
      await api.question.questionControllerDeleteQuestion(questionId, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      await fetchQuestions();
    } catch (e) {
      throw new DeleteQuestionException();
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
      const response = await api.question.questionControllerGetQuestions({
        search
      });
      updateQuestions(response.data);
    } catch (e) {
      throw new SearchQuestionException();
    }
  }

  return {
    deleteQuestion: deleteQuestion,
    createQuestion: createQuestion,
    updateQuestion: updateQuestion,
    fetchQuestions: fetchQuestions,
    searchQuestions: searchQuestions,
  };
}
