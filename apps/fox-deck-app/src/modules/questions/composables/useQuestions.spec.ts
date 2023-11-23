import { beforeEach, describe, expect, it, vi } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import createFetchMock from "vitest-fetch-mock";
import { useQuestions } from "@/modules/questions/composables/useQuestions";
import { useQuestionsStore } from "@/modules/questions/questions.store";
import { useNotificationStore } from "@/core/stores/notification.store";
import { questionsMock } from "@/testing/fixtures/get.questions.fixture";

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

describe("useQuestions", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    fetchMocker.resetMocks();
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
        message: "Error while fetching questions ",
      });

      const notificationStore = useNotificationStore();
      const { fetchQuestions } = useQuestions();

      await fetchQuestions();

      expect(notificationStore.notifications.length).toEqual(1);
    });
  });
});
