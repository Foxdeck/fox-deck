<script setup lang="ts">
import {onMounted, ref} from "vue";
import ListGroupTransition from "@/core/components/Transitions/ListGroupTransition.vue";
import AppPaginator from "@/core/components/AppPaginator/AppPaginator.vue";
import QuestionListItem from "@/modules/questions/components/QuestionListItem.vue";
import {useQuestionsStore} from "@/modules/questions/stores/questions.store";
import QuestionListEmpty from "@/modules/questions/components/QuestionListEmpty.vue";
import {useQuestions} from "@/modules/questions/composables/useQuestions";
import {useNotificationStore} from "@/core/stores/notification.store";
import {useI18n} from "vue-i18n";
import FDTypography from "@/core/components/FDTypography/FDTypography.vue";

const { addNotification } = useNotificationStore();
const questionsStore = useQuestionsStore();
const { fetchQuestions } = useQuestions();
const { t } = useI18n();

onMounted(async () => {
  try {
    await fetchQuestions();
  } catch (e) {
    const error = e as Error;
    addNotification({
      title: t(error.name),
      text: t(error.message),
      severity: "danger",
    });
  }
});

const currentPage = ref(1);
</script>
<template>
  <div class="flex w-full flex-col gap-4">
    <FDTypography
      type="pxs"
      class="text-right italic"
    >
      {{ t("questions.question_amount", { amount: questionsStore.questions.length}) }}
    </FDTypography>
    <div
      v-if="questionsStore.hasQuestions()"
      class="flex w-full flex-col"
    >
      <ListGroupTransition>
        <QuestionListItem
          v-for="question in questionsStore.questions"
          :key="question.id"
          :question="question"
        />
      </ListGroupTransition>
    </div>
    <QuestionListEmpty v-else />
    <AppPaginator
      :pages="8"
      :current-page="currentPage"
      @on-paginate="currentPage = $event"
    />
  </div>
</template>
