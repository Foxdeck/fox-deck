<script setup lang="ts">
import {useAuthStore} from "@/core/stores/auth.store";
import FDTypography from "@/core/components/FDTypography/FDTypography.vue";
import FDSwitch from "@/core/components/FDSwitch/FDSwitch.vue";
import {useThemeStore} from "@/core/stores/theme.store";
import {useI18n} from "vue-i18n";
import FDMenu from "@/core/components/FDMenu/FDMenu.vue";

const authStore = useAuthStore();
const themeStore = useThemeStore();
const { t } = useI18n();
</script>

<template>
  <div
    v-if="authStore.isAuthenticated()"
    class="flex items-center justify-between border-b border-gray-300 px-6 py-4 dark:bg-gray-950 dark:border-gray-800"
  >
    <span class="text-4xl font-bold font-gabarito dark:text-white">{{ t("common.hello") }}, {{ authStore.readJWT()?.username }}! 👋</span>
    <FDMenu menu-icon="settings">
      <template #menu>
        <div class="flex items-center gap-2">
          <FDTypography
            class="w-24"
            type="psm"
          >
            {{ t("common.light_theme") }}
          </FDTypography>
          <FDSwitch
            size="small"
            :checked="themeStore.isThemeLight()"
            @on-toggle="themeStore.switchTheme()"
          />
        </div>
        <RouterLink to="/">
          <FDTypography
            type="pxs"
            class="underline text-primary-300 dark:text-white"
          >
            {{ t("common.more_settings") }}
          </FDTypography>
        </RouterLink>
      </template>
    </FDMenu>
  </div>
</template>
