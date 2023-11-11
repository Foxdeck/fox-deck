<script setup lang="ts">
import { ref } from "vue";
import FDTextInput from "@/components/FDTextInput/FDTextInput.vue";

defineProps({
  value: { type: String, required: true, default: "" },
});

const isEditMode = ref(false);
</script>

<template>
  <div class="flex">
    <span
      v-if="!isEditMode"
      class="flex gap-2 text-3xl font-gabarito px-2 w-fit rounded-md bg-gray-100 hover:bg-gray-200"
      @click="isEditMode = true"
    >
      {{ value }}
    </span>
    <FDTextInput v-else label="Titel" :value="value" icon="save" />
  </div>
</template>
