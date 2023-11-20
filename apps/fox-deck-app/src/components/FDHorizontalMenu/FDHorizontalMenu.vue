<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth.store";

const authStore = useAuthStore();
const isSettingsHovered = ref(false);
</script>

<template>
  <div
    v-if="authStore.isAuthenticated()"
    class="flex border-b border-gray-300 justify-between items-center py-4 px-6"
  >
    <span class="font-bold font-gabarito text-4xl"
      >Hallo, {{ authStore.getCurrentUser()?.username }}! 👋</span
    >
    <RouterLink
      class="bg-white p-3 rounded-md shadow-xl cursor-pointer hover:opacity-70"
      to=""
      @mouseover="isSettingsHovered = true"
      @mouseleave="isSettingsHovered = false"
    >
      <vue-feather
        type="settings"
        :animation="isSettingsHovered ? 'spin' : ''"
        animation-speed="slow"
      ></vue-feather>
    </RouterLink>
  </div>
</template>
