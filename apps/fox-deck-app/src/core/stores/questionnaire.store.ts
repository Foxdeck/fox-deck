import { defineStore } from "pinia";
import { ref } from "vue";
import type {
  Question,
  QuestionMetrics,
  Questions,
} from "@/types/question.types";
import axios from "axios";
import { QuestionCompetence } from "@/enum";
import { useQuestionnaireService } from "@/core/composables/useQuestionnaireService";
import { useQuestionService } from "@/core/composables/useQuestionService";

/**
 * Store which contains the quiz of the current active questionnaire.
 */
export const useQuestionnaireStore = defineStore("questionnaireStore", () => {
  const questionnaireService = useQuestionnaireService();
  const questionService = useQuestionService();

  const initialQuestions = ref<Questions>([]);
  const questions = ref<Questions>([]);
  const areAiQuestions = ref(true);

  /**
   * Reset the current questionnaire to the initial questions.
   */
  const resetQuestions = (): void => {
    console.debug("[QuestionnaireStore] (resetQuestions) => reset questions");
    questions.value = [...initialQuestions.value];
  };

  /**
   * Go to the next question of the questionnaire.
   */
  const nextQuestion = async (
    competence: QuestionCompetence,
    question: Question,
  ): Promise<void> => {
    const updatedQuestion = question;
    updatedQuestion.metrics.timesAnswered++;

    switch (competence) {
      case QuestionCompetence.NOT_GOOD_AT:
        updatedQuestion.metrics.notGoodAt++;
        break;
      case QuestionCompetence.AVERAGE:
        updatedQuestion.metrics.average++;
        break;
      case QuestionCompetence.GOOD_AT:
        updatedQuestion.metrics.goodAt++;
        break;
    }

    console.debug(
      "[QuestionnaireStore] (nextQuestion) => update question in database",
    );
    await axios(`http://localhost:3000/questions/${question.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(updatedQuestion),
    });

    console.debug(
      "[QuestionnaireStore] (nextQuestion) => remove first question from questions",
    );
    questions.value.pop();
  };

  /**
   * Fetch a specific questionnaire from the backend.
   * @param id {string} the id of the questionnaire to fetch.
   */
  const updateQuestions = async (id: string): Promise<void> => {
    setQuestions([]);

    const questionnaire = await questionnaireService.fetchQuestionnaireById(id);
    const questionIds = questionnaire.questions;

    const questions = await questionService.fetchQuestionsByIds(questionIds);

    setQuestions(questions);
  };

  /**
   * Update the value of questions and initialQuestions.
   * @param q {Questions} the questions to update with.
   */
  const setQuestions = (q: Questions): void => {
    console.debug(
      `[QuestionnaireStore] (updateQuestions) => update questions in state`,
    );
    initialQuestions.value = [...q];
    questions.value = [...q];
  };

  /**
   * Calculate the metrics for the current questionnaire.
   * This is used by the last card, which shows the current metrics.
   */
  const calculateMetrics = (): QuestionMetrics => {
    console.debug(`[QuestionnaireStore] (getMetrics) => get metrics`);
    // TODO: this is kind of flaky, it works on this case, but initial questions is only initialized on first fetch
    //       better: fetch the questions again and calculate the metric!
    return initialQuestions.value
      .map((question) => question.metrics)
      .reduce((acc, currentValue) => {
        return {
          notGoodAt: acc.notGoodAt + currentValue.notGoodAt,
          average: acc.average + currentValue.average,
          goodAt: acc.goodAt + currentValue.goodAt,
          timesAnswered: acc.timesAnswered + currentValue.timesAnswered,
        };
      });
  };

  /**
   * Public API
   */
  return {
    initialQuestions: initialQuestions,
    questions: questions,
    nextQuestion: nextQuestion,
    resetQuestions: resetQuestions,
    updateQuestions: updateQuestions,
    calculateMetrics: calculateMetrics,
    areAiQuestions: areAiQuestions,
  };
});
