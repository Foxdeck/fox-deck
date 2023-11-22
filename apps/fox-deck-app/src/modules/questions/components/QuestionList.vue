<script setup lang="ts">
import { onMounted, ref } from "vue";
import ListGroupTransition from "@/core/components/Transitions/ListGroupTransition.vue";
import FDPaginator from "@/core/components/FDPaginator/FDPaginator.vue";
import QuestionCard from "@/modules/questions/components/QuestionCard.vue";
import { useQuestionsStore } from "@/modules/questions/questions.store";
import { api } from "@/core/services";
import { useNotificationStore } from "@/core/stores/notification.store";
import QuestionSearchEmpty from "@/modules/questions/components/QuestionSearchEmpty.vue";

const notificationStore = useNotificationStore();
const questionsStore = useQuestionsStore();

onMounted(async () => {
  await fetchQuestions();
});

/**
 * Fetch questions and update the state.
 */
async function fetchQuestions() {
  try {
    const response = await api.question.questionControllerGetQuestions();
    questionsStore.updateQuestions(response.data);
  } catch (e) {
    notificationStore.addNotification({
      title: "Fehler beim Laden der Fragen",
      text: "Bitte aktualisieren Sie die Seite oder versuchen Sie es später noch einmal.",
      severity: "danger",
    });
  }
}

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
    <QuestionSearchEmpty v-else />
    <FDPaginator
      :max-page="20"
      :display-page-amount="8"
      :current-page="currentPage"
      @onPaginate="currentPage = $event"
    />
  </div>
</template>
