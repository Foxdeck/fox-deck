<script setup lang="ts">
import {onMounted, ref} from "vue";
import ListGroupTransition from "@/core/components/Transitions/ListGroupTransition.vue";
import FDPaginator from "@/core/components/FDPaginator/FDPaginator.vue";
import QuestionCard from "@/modules/questions/components/QuestionCard.vue";
import {useQuestionsStore} from "@/modules/questions/stores/questions.store";
import QuestionSearchListEmpty from "@/modules/questions/components/QuestionSearchListEmpty.vue";
import {useQuestions} from "@/modules/questions/composables/useQuestions";
import {useNotificationStore} from "@/core/stores/notification.store";
import {useI18n} from "vue-i18n";

const { addNotification } = useNotificationStore();
const questionsStore = useQuestionsStore();
const { fetchQuestions } = useQuestions();
const { t } = useI18n();

onMounted(async () => {
  try {
    await fetchQuestions();
  } catch (e) {
    addNotification({
      title: t(e.name),
      text: t(e.message),
      severity: "danger",
    });
  }
});

const currentPage = ref(1);
</script>
<template>
  <div class="flex flex-col gap-4 w-full">
    <div
      v-if="questionsStore.hasQuestions()"
      class="flex flex-col w-full"
    >
      <ListGroupTransition>
        <QuestionCard
          v-for="item in questionsStore.questions"
          :key="item.id"
          :question="item.question"
          :solution="item.solution"
          :is-public="item.isPublic"
          author="LearningFox"
        />
      </ListGroupTransition>
    </div>
    <QuestionSearchListEmpty v-else />
    <FDPaginator
      :pages="8"
      :current-page="currentPage"
      @on-paginate="currentPage = $event"
    />
  </div>
</template>
