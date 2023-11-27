<script setup lang="ts">
import QuestionCardBase from "@/core/components/QuestionCardBase.vue";
import FDButton from "@/core/components/FDButton/FDButton.vue";

defineProps<{
  timesAnswered: number;
  notGoodAt: number;
  average: number;
  goodAt: number;
  areAiQuestions: boolean;
}>();

defineEmits<{
  onRepeatClick;
}>();
</script>
<template>
  <QuestionCardBase>
    <span class="mb-12 text-4xl">Fertig!</span>
    <div class="mb-12 flex w-full justify-evenly font-sans">
      <div
        v-if="!areAiQuestions"
        class="mx-2 flex flex-col items-center justify-center text-center text-red-500"
      >
        <span class="mb-2 text-4xl">{{ notGoodAt }}</span>
        <span>Brauch ich noch Übung</span>
      </div>
      <div
        v-if="!areAiQuestions"
        class="mx-2 flex flex-col items-center justify-center text-center text-orange-500"
      >
        <span class="mb-2 text-4xl">{{ average }}</span>
        <span>Geht so</span>
      </div>
      <div
        v-if="!areAiQuestions"
        class="mx-2 flex flex-col items-center justify-center text-center text-green-600"
      >
        <span class="mb-2 text-4xl">{{ goodAt }}</span>
        <span>Kann ich gut</span>
      </div>
    </div>
    <FDButton
      icon="refresh-cw"
      label="Übung Wiederholen"
      severity="success"
      @click="$emit('onRepeatClick')"
    />
  </QuestionCardBase>
</template>
