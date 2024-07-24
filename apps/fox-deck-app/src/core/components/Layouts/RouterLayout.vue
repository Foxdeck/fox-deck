<script setup lang="ts">
</script>
<template>
  <RouterView v-slot="{ Component }">
    <div class="flex flex-col">
      <Component :is="Component" />
    </div>
  </RouterView>
</template>
