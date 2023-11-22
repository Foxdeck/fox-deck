import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it } from "vitest";
import {
  type Notification,
  useNotificationStore,
} from "@/core/stores/notification.store";

describe("Notification Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("addNotification", () => {
    it("should add a notification to the list of notifications.", () => {
      const notificationStore = useNotificationStore();
      const notification: Notification = {
        title: "My Notification",
        text: "The text of my notification.",
        severity: "danger",
      };

      notificationStore.addNotification(notification);

      expect(notificationStore.notifications).toEqual([notification]);
    });
  });
});
