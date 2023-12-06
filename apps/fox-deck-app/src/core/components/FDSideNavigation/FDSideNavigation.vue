<script setup lang="ts">
import Logo from "@/assets/icons/foxdeck-logo.svg";
import {routes} from "@/router";
import anime from "animejs/lib/anime.es.js";
import {ref, watch} from "vue";
import {useAuthStore} from "@/core/stores/auth.store";
import {LoginRouteNames} from "@/modules/login/routes";
import {useFoxdeckRouter} from "@/core/composables/useFoxdeckRouter";
import FDIcon from "@/core/components/FDIcon/FDIcon.vue";
import {Icon} from "@/core/components/FDIcon/icons";

const { push } = useFoxdeckRouter();
const authStore = useAuthStore();

const isCollapsed = ref(true);
const nav = ref<HTMLElement>();

const navMinWidth = 80;
const navMaxWidth = 300;

watch(isCollapsed, () => {
  const collapsedNav = [navMinWidth, navMaxWidth];
  const extendedNav = [navMaxWidth, navMinWidth];
  const width = isCollapsed.value ? extendedNav : collapsedNav;

  anime({
    targets: nav.value,
    width,
    duration: 500,
    easing: "easeInOutSine",
  });
});

async function onLogoutClick() {
  await authStore.logout();
  await push({ name: LoginRouteNames.LOGIN });
}
</script>
<template>
  <aside
    v-if="authStore.isAuthenticated()"
    ref="nav"
    class="flex h-screen flex-col justify-between py-2 bg-gray-950"
  >
    <Logo class="w-14 self-center p-2" />
    <nav>
      <RouterLink
        v-for="route in routes.filter((r) => r.isVisibleInNavigation)"
        :key="route.path"
        class="m-3 flex flex-row items-center justify-start gap-2 rounded-md p-4 text-white opacity-70 transition"
        :class="{
          '!justify-center': isCollapsed,
        }"
        active-class="bg-white !text-black !opacity-100"
        :to="route.path"
      >
        <FDIcon
          v-if="route.icon"
          :icon="route.icon"
        />
        <span
          v-if="!isCollapsed"
          class="w-[160px]"
        >{{ route.label }}</span>
      </RouterLink>
    </nav>
    <nav class="flex flex-col items-center">
      <span
        class="cursor-pointer p-4 text-white hover:opacity-70"
        @click="isCollapsed = !isCollapsed"
      >
        <FDIcon
          :icon="Icon.CHEVRON_DOUBLE_RIGHT"
          class="transition duration-500 ease-in-out"
          :class="{
            'rotate-180': !isCollapsed,
          }"
        />
      </span>
      <span
        class="cursor-pointer p-4 text-white hover:opacity-70"
        @click="onLogoutClick()"
      >
        <FDIcon
          class="transition duration-500 ease-in-out"
          :icon="Icon.SIGN_OUT"
          :class="{
            'rotate-180': !isCollapsed,
          }"
        />
      </span>
    </nav>
  </aside>
</template>
