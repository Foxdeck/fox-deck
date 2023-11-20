<script setup lang="ts">
import FadeOutInTransition from "@/components/Transitions/FadeOutInTransition.vue";
</script>
<template>
  <RouterView v-slot="{ Component }">
    <div class="flex flex-col">
      <FadeOutInTransition>
        <Component :is="Component" />
      </FadeOutInTransition>
    </div>
  </RouterView>
</template>
