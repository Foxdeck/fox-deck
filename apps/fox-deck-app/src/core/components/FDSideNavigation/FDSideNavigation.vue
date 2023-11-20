<script setup lang="ts">
import Logo from "@/assets/icons/foxdeck-logo.svg";
import { routes } from "@/router";
import anime from "animejs/lib/anime.es.js";
import { ref, watch } from "vue";
import { useAuthStore } from "@/core/stores/auth.store";

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
</script>
<template>
  <aside
    v-if="authStore.isAuthenticated()"
    ref="nav"
    class="flex flex-col justify-between bg-gray-950 h-screen py-2"
  >
    <Logo class="w-14 self-center p-2" />
    <nav>
      <RouterLink
        v-for="route in routes.filter((r) => r.isVisibleInNavigation)"
        class="flex flex-row justify-start items-center p-3 transition text-white gap-2 m-3 rounded-md opacity-70"
        :class="{
          '!justify-center': isCollapsed,
        }"
        active-class="bg-white !text-black !opacity-100"
        :key="route.path"
        :to="route.path"
      >
        <vue-feather v-if="route.icon" :type="route.icon"></vue-feather>
        <span v-if="!isCollapsed" class="w-[160px]">{{ route.label }}</span>
      </RouterLink>
    </nav>
    <nav class="flex flex-col items-center">
      <span
        class="p-4 text-white cursor-pointer hover:opacity-70"
        @click="isCollapsed = !isCollapsed"
      >
        <vue-feather
          type="chevrons-right"
          class="transition ease-in-out duration-500"
          :class="{
            'rotate-180': !isCollapsed,
          }"
        ></vue-feather>
      </span>
    </nav>
  </aside>
</template>
