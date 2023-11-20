<script setup lang="ts">
import FDNotification from "@/components/FDNotification/FDNotification.vue";
import { useNotificationStore } from "@/stores/notification.store";

const notificationStore = useNotificationStore();
</script>
<template>
  <div class="flex flex-col fixed bottom-4 right-4 gap-2">
    <FDNotification
      v-for="item of notificationStore.notifications"
      :title="item.title"
      :text="item.text"
      :severity="item.severity"
    />
  </div>
</template>
