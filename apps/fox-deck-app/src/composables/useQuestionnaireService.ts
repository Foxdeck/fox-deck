import axios from "axios";
import type {Questionnaire, Questionnaires} from "@/types/questionnaire.types";

/**
 * Service for interacting with the REST API for questionnaires.
 */
export function useQuestionnaireService() {

    /**
     * Fetch every questionnaire from the backend.
     */
    const fetchQuestionnaires = async (): Promise<Questionnaires> => {
        console.debug("[QuestionnaireService] (fetchQuestionnaires) => fetch questionnaire from backend.");
        const questionnaireResponse = await axios(`http://localhost:3000/questionnaires`);
        if (questionnaireResponse.status !== 200) {
            console.debug(`[QuestionnaireService] (fetchQuestionnaireById) => error while fetch questionnaire: ${questionnaireResponse.statusText}`);
            throw new Error("Questionnaire not found");
        }

        return questionnaireResponse.data as Questionnaires;
    }

    /**
     * Fetch a specific questionnaire from the backend.
     * @param id {string} id of the questionnaire to fetch.
     */
    const fetchQuestionnaireById = async (id: string): Promise<Questionnaire> => {
        console.debug(`[QuestionnaireService] (fetchQuestionnaireById) => fetch questionnaire with id '${id}' from backend.`);
        const questionnaireResponse = await axios(`http://localhost:3000/questionnaires/${id}`);
        if (questionnaireResponse.status !== 200) {
            console.debug(`[QuestionnaireService] (fetchQuestionnaireById) => error while fetch questionnaire: ${questionnaireResponse.statusText}`);
            throw new Error("Questionnaire not found");
        }

        return questionnaireResponse.data as Questionnaire;
    }
    return {
        fetchQuestionnaires: fetchQuestionnaires,
        fetchQuestionnaireById: fetchQuestionnaireById
    }
}