<script setup lang="ts">
import FDSideNavigation from "@/components/FDSideNavigation/FDSideNavigation.vue";
import FDHorizontalMenu from "@/components/FDHorizontalMenu/FDHorizontalMenu.vue";
import NotificationLayout from "@/components/Layouts/NotificationLayout.vue";
import RouterLayout from "@/components/Layouts/RouterLayout.vue";
</script>

<template>
  <main class="flex w-screen h-screen bg-[#f2f2f2]">
    <FDSideNavigation />

    <div class="overflow-y-scroll w-full">
      <FDHorizontalMenu />
      <RouterLayout />
      <NotificationLayout />
    </div>
  </main>
</template>
