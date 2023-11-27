<script setup lang="ts">
import FDNotification from "@/core/components/FDNotification/FDNotification.vue";
import { useNotificationStore } from "@/core/stores/notification.store";

const notificationStore = useNotificationStore();
</script>
<template>
  <div class="fixed right-4 bottom-4 flex flex-col gap-2">
    <FDNotification
      v-for="item of notificationStore.notifications"
      :key="item.title"
      :title="item.title"
      :text="item.text"
      :severity="item.severity"
    />
  </div>
</template>
