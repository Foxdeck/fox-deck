<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/core/stores/auth.store";
import FDPopup from "@/core/components/FDPopup/FDPopup.vue";
import FDTypography from "@/core/components/FDTypography/FDTypography.vue";
import FDSwitch from "@/core/components/FDSwitch/FDSwitch.vue";

const authStore = useAuthStore();
const isSettingsOpen = ref(false);
</script>

<template>
  <div
    v-if="authStore.isAuthenticated()"
    class="flex border-b border-gray-300 justify-between items-center py-4 px-6"
  >
    <span class="font-bold font-gabarito text-4xl"
      >Hallo, {{ authStore.getCurrentUser()?.username }}! 👋</span
    >

    <FDPopup :is-open="isSettingsOpen" title="Einstellungen">
      <template #container>
        <vue-feather
          class="bg-white p-3 rounded-md shadow-xl cursor-pointer hover:opacity-70"
          type="settings"
          @click="isSettingsOpen = !isSettingsOpen"
        />
      </template>
      <template #popupContent>
        <div class="flex items-center gap-2">
          <FDTypography class="w-24" type="psm">Helles Design</FDTypography>
          <FDSwitch size="small" :checked="true" />
        </div>
        <RouterLink to="/">
          <FDTypography type="pxs" class="underline text-primary-300">
            Weitere Einstellungen
          </FDTypography>
        </RouterLink>
      </template>
    </FDPopup>
  </div>
</template>
