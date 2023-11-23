import { beforeEach, describe, expect, it, vi } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import createFetchMock from "vitest-fetch-mock";
import { useQuestions } from "@/modules/questions/composables/useQuestions";
import { useQuestionsStore } from "@/modules/questions/stores/questions.store";
import { useNotificationStore } from "@/core/stores/notification.store";
import {
  questionMock,
  questionsMock,
} from "@/testing/fixtures/get.questions.fixture";
import { api } from "@/core/services";

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

describe("useQuestions", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    fetchMocker.resetMocks();
  });

  describe("createQuestion", () => {
    it("should create a new question", async () => {
      const spy = vi.spyOn(api.question, "questionControllerCreateQuestion");
      const { createQuestion } = useQuestions();
      const question = {
        question: "What is 3+3?",
        solution: "6",
        isPublic: false,
      };

      await createQuestion(question);

      expect(spy).toHaveBeenCalledWith(question);
    });

    it("should show a notification, if response has an error", async () => {
      fetchMocker.mockReject({
        name: "FetchError",
        message: "Error while creating question.",
      });
      const notificationStore = useNotificationStore();
      const { createQuestion } = useQuestions();
      const question = {
        question: "What is 3+3?",
        solution: "6",
        isPublic: false,
      };

      await createQuestion(question);

      expect(notificationStore.notifications.length).toEqual(1);
    });
  });

  describe("updateQuestion", () => {
    it("should update a question", async () => {
      const spy = vi.spyOn(api.question, "questionControllerUpdateQuestion");
      const { updateQuestion } = useQuestions();
      const questionId = "c674f44d-959f-4d34-9494-f917d2caea2d";
      const question = {
        question: "What is 3+3?",
        solution: "6",
        isPublic: false,
      };

      await updateQuestion(questionId, question);

      expect(spy).toHaveBeenCalledWith(questionId, question);
    });

    it("should show a notification, if response has an error", async () => {
      fetchMocker.mockReject({
        name: "FetchError",
        message: "Error while updating question.",
      });
      const notificationStore = useNotificationStore();
      const { updateQuestion } = useQuestions();
      const questionId = "c674f44d-959f-4d34-9494-f917d2caea2d";
      const question = {
        question: "What is 3+3?",
        solution: "6",
        isPublic: false,
      };

      await updateQuestion(questionId, question);

      expect(notificationStore.notifications.length).toEqual(1);
    });
  });

  describe("fetchQuestions", () => {
    it("should update the question state", async () => {
      fetchMocker.mockResponseOnce(JSON.stringify(questionsMock));
      const questionStore = useQuestionsStore();
      const { fetchQuestions } = useQuestions();

      await fetchQuestions();

      expect(questionStore.questions).toEqual(questionsMock);
    });

    it("should add a notification, if response has an error", async () => {
      fetchMocker.mockReject({
        name: "FetchError",
        message: "Error while fetching questions.",
      });

      const notificationStore = useNotificationStore();
      const { fetchQuestions } = useQuestions();

      await fetchQuestions();

      expect(notificationStore.notifications.length).toEqual(1);
    });
  });

  describe("searchQuestions", () => {
    it("should fetch every question, if search with empty string", async () => {
      const spy = vi.spyOn(api.question, "questionControllerGetQuestions");
      const { searchQuestions } = useQuestions();

      await searchQuestions("    ");

      expect(spy).toHaveBeenCalled();
    });

    it("should search for questions and update the state", async () => {
      fetchMocker.mockResponseOnce(JSON.stringify([questionMock]));
      const questionStore = useQuestionsStore();
      const { searchQuestions } = useQuestions();

      await searchQuestions("son");

      expect(questionStore.questions).toEqual([questionMock]);
    });

    it("should show a notification, if response has an error", async () => {
      fetchMocker.mockReject({
        name: "FetchError",
        message: "Error while searching for questions.",
      });
      const notificationStore = useNotificationStore();
      const { searchQuestions } = useQuestions();

      await searchQuestions("son");

      expect(notificationStore.notifications.length).toEqual(1);
    });
  });
});
