<script setup lang="ts">
import FDSideNavigation from "@/core/components/FDSideNavigation/FDSideNavigation.vue";
import FDHorizontalMenu from "@/core/components/FDHorizontalMenu/FDHorizontalMenu.vue";
import NotificationLayout from "@/core/components/Layouts/NotificationLayout.vue";
import RouterLayout from "@/core/components/Layouts/RouterLayout.vue";
import {useThemeStore} from "@/core/stores/theme.store";

const themeStore = useThemeStore();
</script>

<template>
  <div
    :class="{
      dark: themeStore.selectedTheme === 'dark',
      light: themeStore.selectedTheme === 'light',
    }"
  >
    <main class="flex w-screen h-screen bg-[#f2f2f2] dark:bg-gray-900">
      <FDSideNavigation />

      <div class="w-full overflow-y-scroll">
        <FDHorizontalMenu />
        <RouterLayout />
        <NotificationLayout />
      </div>
    </main>
  </div>
</template>
