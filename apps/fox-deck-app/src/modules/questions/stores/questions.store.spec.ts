import { beforeEach, describe, expect, it } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useQuestionsStore } from "@/modules/questions/stores/questions.store";
import { questionsMock } from "@/testing/fixtures/get.questions.fixture";

describe("Questions Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("updateQuestions", () => {
    it("should update the store", () => {
      const questionsStore = useQuestionsStore();

      questionsStore.updateQuestions(questionsMock as any);

      expect(questionsStore.questions).toEqual(questionsMock);
    });
  });

  describe("hasQuestions", () => {
    it("should return true, if store has questions", () => {
      const questionsStore = useQuestionsStore();
      questionsStore.questions = questionsMock as any;

      expect(questionsStore.hasQuestions()).toBeTruthy();
    });

    it("should return false, if store has no questions", () => {
      const questionsStore = useQuestionsStore();
      questionsStore.questions = [];

      expect(questionsStore.hasQuestions()).toBeFalsy();
    });
  });
});
