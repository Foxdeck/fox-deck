<script setup lang="ts">
import NotificationLayout from "@/core/components/Layouts/NotificationLayout.vue";
import RouterLayout from "@/core/components/Layouts/RouterLayout.vue";
import {useThemeStore} from "@/core/stores/theme.store";
import AppResourceNavigation from "@/modules/resource-navigation/AppResourceNavigation.vue";

const themeStore = useThemeStore();

</script>

<template>
  <div
    :class="{
      'light': themeStore.isThemeLight(),
      'dark': !themeStore.isThemeLight()
    }"
  >
    <main class="flex w-screen h-screen surface">
      <Suspense>
        <AppResourceNavigation />
      </Suspense>
      <div class="w-full overflow-y-scroll">
        <RouterLayout />
        <NotificationLayout />
      </div>
    </main>
  </div>
</template>
