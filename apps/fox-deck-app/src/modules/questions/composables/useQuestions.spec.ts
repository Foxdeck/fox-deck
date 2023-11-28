import {beforeEach, describe, expect, it, vi} from "vitest";
import {createPinia, setActivePinia} from "pinia";
import createFetchMock from "vitest-fetch-mock";
import {useQuestions} from "@/modules/questions/composables/useQuestions";
import {useQuestionsStore} from "@/modules/questions/stores/questions.store";
import {useNotificationStore} from "@/core/stores/notification.store";
import {questionMock,} from "@/testing/fixtures/get.questions.fixture";
import {CreateQuestionException} from "@/modules/questions/exceptions/CreateQuestionException";
import {FetchQuestionException} from "@/modules/questions/exceptions/FetchQuestionException";
import {SearchQuestionException} from "@/modules/questions/exceptions/SearchQuestionException";

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

const jwt = `
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
.eyJpZCI6ImRiMWI2OTllLTA2NDYtNGM1ZC05MjMyLTQwM2RiY2YyN2FjZiIsImVtYWlsIjoiZG9taW5pcXVlYnI0NkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6IkxlYXJuaW5nRm94IiwiaWF0IjoxNzAxMTc2OTY2LCJleHAiOjE3MzI3MzQ1NjZ9
.ihE5aneeyLyWAG8uzKOFDBqc_SQGBQyjw7BeLOCZLCs`;

describe("useQuestions", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    fetchMocker.resetMocks();
  });

  describe("createQuestion", () => {
    it("should throw a CreateQuestionException, if response has an error", async () => {
      fetchMocker.mockReject({
        name: "FetchError",
        message: "Error while creating question.",
      });
      const { createQuestion } = useQuestions();
      const question = {
        question: "What is 3+3?",
        solution: "6",
        isPublic: false,
        authorId: "57d31599-ebf6-49fb-9a81-aea49af1400d",
      };

      await expect(() => createQuestion(question, jwt)).rejects.toThrowError(
        CreateQuestionException
      );
    });
  });

  describe("updateQuestion", () => {
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
        authorId: "57d31599-ebf6-49fb-9a81-aea49af1400d",
      };

      await updateQuestion(questionId, question);

      expect(notificationStore.notifications.length).toEqual(1);
    });
  });

  describe("fetchQuestions", () => {
    it("should throw a FetchQuestionException, if response has an error", async () => {
      fetchMocker.mockReject({
        name: "FetchError",
        message: "Error while fetching questions.",
      });

      const { fetchQuestions } = useQuestions();

      await expect(() => fetchQuestions()).rejects.toThrowError(
        FetchQuestionException
      );
    });
  });

  describe("searchQuestions", () => {
    it("should search for questions and update the state", async () => {
      fetchMocker.mockResponseOnce(JSON.stringify([questionMock]));
      const questionStore = useQuestionsStore();
      const { searchQuestions } = useQuestions();

      await searchQuestions("son");

      expect(questionStore.questions).toEqual([questionMock]);
    });

    it("should throw a SearchQuestionException, if response has an error", async () => {
      fetchMocker.mockReject({
        name: "FetchError",
        message: "Error while searching for questions.",
      });
      const { searchQuestions } = useQuestions();

      await expect(() => searchQuestions("son")).rejects.toThrowError(
        SearchQuestionException
      );
    });
  });
});
