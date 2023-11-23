<script setup lang="ts">
import {QuestionCompetence} from "@/enum";
import FDButton from "@/core/components/FDButton/FDButton.vue";

defineProps({
  question: { type: String, required: true },
  solution: { type: String, required: true },
  isSolutionVisible: { type: Boolean, required: false, default: false },
});

const emit = defineEmits<{
  onNextQuestion: QuestionCompetence;
}>();

function onNextQuestionClick(competence: QuestionCompetence) {
  emit("onNextQuestion", competence);
}
</script>
<template>
  <section
    class="flex flex-col justify-between items-center font-serif aspect-square shadow-xl rounded-sm bg-white p-4 select-none w-[400px]"
  >
    <FDButton
      class="self-end"
      icon="eye"
    />
    <p class="text-3xl text-center sm:text-3xl xl:text-4xl">
      {{ question }}
    </p>
    <p
      v-if="isSolutionVisible"
      class="text-center mt-4 leading-relaxed"
    >
      {{ solution }}
    </p>
    <div class="flex bottom-4 gap-2">
      <FDButton
        icon="frown"
        severity="danger"
        @click="onNextQuestionClick(QuestionCompetence.NOT_GOOD_AT)"
      />
      <FDButton
        icon="meh"
        severity="warn"
        @click="onNextQuestionClick(QuestionCompetence.AVERAGE)"
      />
      <FDButton
        icon="smile"
        severity="success"
        @click="onNextQuestionClick(QuestionCompetence.GOOD_AT)"
      />
    </div>
  </section>
</template>
