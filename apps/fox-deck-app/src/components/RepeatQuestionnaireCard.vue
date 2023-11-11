<script setup lang="ts">
import QuestionCardBase from "@/components/QuestionCardBase.vue";
import FDButton from "@/components/FDButton/FDButton.vue";

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
    <span class="text-4xl mb-12">Fertig!</span>
    <div class="flex justify-evenly w-full font-sans mb-12">
      <div
        v-if="!areAiQuestions"
        class="flex flex-col text-center justify-center items-center text-red-500 mx-2"
      >
        <span class="text-4xl mb-2">{{ notGoodAt }}</span>
        <span>Brauch ich noch Übung</span>
      </div>
      <div
        v-if="!areAiQuestions"
        class="flex flex-col text-center justify-center items-center text-orange-500 mx-2"
      >
        <span class="text-4xl mb-2">{{ average }}</span>
        <span>Geht so</span>
      </div>
      <div
        v-if="!areAiQuestions"
        class="flex flex-col text-center justify-center items-center text-green-600 mx-2"
      >
        <span class="text-4xl mb-2">{{ goodAt }}</span>
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
