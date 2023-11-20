<script setup>
import FDSideNavigation from "@/components/FDSideNavigation/FDSideNavigation.vue";
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth.store";
import FDNotification from "@/components/FDNotification/FDNotification.vue";

const authStore = useAuthStore();

const isSettingsHovered = ref(false);
const nav = ref();
</script>

<template>
  <main class="flex w-screen h-screen bg-[#f2f2f2]">
    <FDSideNavigation v-if="authStore.isAuthenticated()" ref="nav" />

    <div class="overflow-y-scroll w-full">
      <RouterView v-slot="{ Component }">
        <div class="flex flex-col">
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
          <Transition name="fade" mode="out-in">
            <Component :is="Component" />
          </Transition>
        </div>
      </RouterView>
      <FDNotification v-for="item of []" />
    </div>
  </main>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
