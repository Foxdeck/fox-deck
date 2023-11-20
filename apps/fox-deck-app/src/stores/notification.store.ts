import { defineStore } from "pinia";
import { ref } from "vue";
// @ts-ignore
import VueJwtDecode from "vue-jwt-decode";
import type { Severity } from "@/components/severity.types";

type Notification = {
  title: string;
  text: string;
  severity: Severity;
};

/**
 * Store the notifications.
 */
export const useNotificationStore = defineStore("notificationStore", () => {
  const notifications = ref<Notification[]>([]);

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
