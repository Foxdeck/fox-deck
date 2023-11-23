<script setup lang="ts">
import { onMounted, ref } from "vue";
import ListGroupTransition from "@/core/components/Transitions/ListGroupTransition.vue";
import FDPaginator from "@/core/components/FDPaginator/FDPaginator.vue";
import QuestionCard from "@/modules/questions/components/QuestionCard.vue";
import { useQuestionsStore } from "@/modules/questions/questions.store";
import QuestionSearchListEmpty from "@/modules/questions/components/QuestionSearchListEmpty.vue";
import { useQuestions } from "@/modules/questions/composables/useQuestions";

const questionsStore = useQuestionsStore();
const { fetchQuestions } = useQuestions();

onMounted(async () => {
  await fetchQuestions();
});

const currentPage = ref(1);
</script>
<template>
  <div class="flex flex-col gap-4 w-full">
    <div v-if="questionsStore.hasQuestions()" class="flex flex-col w-full">
      <ListGroupTransition>
        <QuestionCard
          v-for="item in questionsStore.questions"
          :question="item.question"
          :solution="item.solution"
          :is-public="item.isPublic"
          author="LearningFox"
        />
      </ListGroupTransition>
    </div>
    <QuestionSearchListEmpty v-else />
    <FDPaginator
      :max-page="20"
      :display-page-amount="8"
      :current-page="currentPage"
      @onPaginate="currentPage = $event"
    />
  </div>
</template>
