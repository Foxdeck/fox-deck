<script setup lang="ts">
import NotificationLayout from "@/core/components/Layouts/NotificationLayout.vue";
import RouterLayout from "@/core/components/Layouts/RouterLayout.vue";
import {useThemeStore} from "@/core/stores/theme.store";
import AppResourceNavigation from "@/modules/resource-navigation/AppResourceNavigation.vue";

const themeStore = useThemeStore();

</script>

<template>
  <div
    class="on-background-text body-medium"
    :class="{
      'light': themeStore.isThemeLight(),
      'dark': !themeStore.isThemeLight()
    }"
  >
    <main class="surface flex h-screen w-screen">
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
