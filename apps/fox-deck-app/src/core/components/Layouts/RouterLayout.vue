<script setup lang="ts">
import FadeOutInTransition from "@/core/components/Transitions/FadeOutInTransition.vue";
</script>
<template>
  <Suspense>
    <RouterView v-slot="{ Component }">
      <div class="flex flex-col">
        <FadeOutInTransition>
          <Component :is="Component" />
        </FadeOutInTransition>
      </div>
    </RouterView>
  </Suspense>
</template>
