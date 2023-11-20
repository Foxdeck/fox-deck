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
 * Store which contains the quiz of the current active questionnaire.
 */
export const useNotificationStore = defineStore("notificationStore", () => {
  const notifications = ref<Notification[]>([
    {
      title: "Foo2",
      text: "Foo",
      severity: "danger",
    },
    {
      title: "Foo2",
      text: "Foo",
      severity: "primary",
    },
    {
      title: "Foo2",
      text: "Foo",
      severity: "success",
    },
    {
      title: "Foo2",
      text: "Foo",
      severity: "warn",
    },
  ]);

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
