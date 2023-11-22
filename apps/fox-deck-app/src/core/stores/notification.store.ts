import { defineStore } from "pinia";
import { ref } from "vue";
import type { Severity } from "@/core/components/severity.types";

export type Notification = {
  title: string;
  text: string;
  severity: Severity;
};

/**
 * Store the notifications. These notifications are shown to the user on a specific spot, to show
 * information, failures or success messages.
 */
export const useNotificationStore = defineStore("notificationStore", () => {
  const notifications = ref<Notification[]>([]);

  /**
   * Adds a notification which is shown to the user.
   * @param notification {Notification} the notification to add.
   */
  const addNotification = (notification: Notification) => {
    notifications.value.push(notification);
  };

  /**
   * Public API
   */
  return {
    notifications: notifications,
    addNotification: addNotification,
  };
});
