import axios from "axios";
import * as qs from "qs";
import type { Questions } from "@/types/question.types";

/**
 * Service for interacting with the REST API for questions.
 */
export function useQuestionService() {
  /**
   * // TODO: kommentar anpassen
   * Fetch a specific questionnaire from the backend.
   * @param ids {string} id of the questionnaire to fetch.
   */
  const fetchQuestionsByIds = async (ids: string[]): Promise<Questions> => {
    console.debug(
      `[QuestionService] (fetchQuestionsByIds) => fetch questions with ids '${ids}' from backend.`
    );
    const response = await axios(`http://localhost:3000/questions`, {
      params: {
        id: ids,
      },
      paramsSerializer: getParamsSerializer(),
    });

    if (response.status !== 200) {
      console.debug(
        `[QuestionService] (fetchQuestionsByIds) => error while fetching questions: ${response.statusText}`
      );
      throw new Error("Question not found");
    }

    return response.data as Questions;
  };

  const fetchAllQuestions = async () => {
    const response = await axios(`http://localhost:3000/question`);

    if (response.status !== 200) {
      console.debug(
        `[QuestionService] (fetchAllQuestions) => error while fetching questions: ${response.statusText}`
      );
      throw new Error(response.statusText);
    }

    return response.data as Questions;
  };

  /**
   * Serializes array to url parameters.
   * @private
   */
  const getParamsSerializer = () => {
    return (params: any) => {
      return qs.stringify(params, { arrayFormat: "brackets" });
    };
  };

  return {
    fetchQuestionsByIds: fetchQuestionsByIds,
    fetchAllQuestions: fetchAllQuestions,
  };
}
