<script setup lang="ts">
import NotificationLayout from "@/core/components/Layouts/NotificationLayout.vue";
import RouterLayout from "@/core/components/Layouts/RouterLayout.vue";
import {useThemeStore} from "@/core/stores/theme.store";
import {useNotes} from "@/modules/notes/composables/useNotes";
import {onMounted} from "vue";
import {useI18n} from "vue-i18n";
import {useFoxdeckRouter} from "@/core/composables/useFoxdeckRouter";
import AppSideNavigation from "@/core/components/AppSideNavigation/AppSideNavigation.vue";

const { save, fetchNotes } = useNotes();
const themeStore = useThemeStore();
const { t } = useI18n();
const { push } = useFoxdeckRouter();

onMounted(async () => await fetchNotes());


</script>

<template>
  <div
    :class="{
      dark: themeStore.selectedTheme === 'dark',
      light: themeStore.selectedTheme === 'light',
    }"
  >
    <main class="flex w-screen h-screen bg-[#f5f6fb] dark:bg-gray-900">
      <AppSideNavigation />
      <div class="w-full overflow-y-scroll">
        <RouterLayout />
        <NotificationLayout />
      </div>
    </main>
  </div>
</template>
