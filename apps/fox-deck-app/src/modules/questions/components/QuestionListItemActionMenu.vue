<script setup lang="ts">
import {ref} from "vue";
import FDButton from "@/core/components/FDButton/FDButton.vue";
import FDPopup from "@/core/components/FDPopup/FDPopup.vue";

const isMenuOpen = ref(false);
</script>
<template>
  <FDPopup :is-open="isMenuOpen">
    <template #container>
      <FDButton
        class="dark:!text-white"
        type="text"
        icon="more-vertical"
        @click="isMenuOpen = !isMenuOpen"
      />
    </template>
    <template #popupContent>
      <div class="flex flex-col">
        <FDButton
          type="text"
          icon="edit"
          label="Bearbeiten"
        />
        <FDButton
          type="text"
          severity="danger"
          icon="trash"
          label="Löschen"
        />
      </div>
    </template>
  </FDPopup>
</template>
