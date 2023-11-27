<script setup lang="ts">
import {Form} from "vee-validate";
import ContentLayout from "@/core/components/Layouts/ContentLayout.vue";
import FDTypography from "@/core/components/FDTypography/FDTypography.vue";
import FDTextInput from "@/core/components/FDTextInput/FDTextInput.vue";
import QuestionFilter from "@/modules/questions/components/QuestionFilter.vue";
import QuestionList from "@/modules/questions/components/QuestionList.vue";
import {useQuestions} from "@/modules/questions/composables/useQuestions";
import FDButton from "@/core/components/FDButton/FDButton.vue";
import {useNotificationStore} from "@/core/stores/notification.store";
import {useI18n} from "vue-i18n";
import {useQuestionsStore} from "@/modules/questions/stores/questions.store";

const questionsStore = useQuestionsStore();
const {searchQuestions} = useQuestions();
const {addNotification} = useNotificationStore();
const {t} = useI18n();

async function onSearchInput(search: string) {
  try {
    await searchQuestions(search);
  } catch (e) {
    addNotification({
      title: t(e.name),
      text: t(e.message),
      severity: "danger",
    });
  }
}
</script>

<template>
  <ContentLayout>
    <div class="flex h-full flex-col gap-8">
      <FDTypography type="h1">
        {{ t("questions.title") }}
      </FDTypography>
      <FDTypography
        type="p"
        class="leading-10"
      >
        {{ t("questions.text") }}
      </FDTypography>
    </div>

    <Form
      @input="onSearchInput($event.target.value)"
    >
      <FDTextInput
        name="search"
        icon="search"
        :label="t('questions.question_search_placeholder')"
      />
    </Form>
    <FDTypography
      type="pxs"
      class="text-right italic"
    >
      {{ t("questions.question_amount", { amount: questionsStore.questions.length}) }}
    </FDTypography>
    <div class="flex flex-row gap-6">
      <div class="flex flex-col gap-2">
        <RouterLink to="/question/create">
          <FDButton
            icon="plus"
            :label="t('questions.question_create')"
          />
        </RouterLink>
        <QuestionFilter />
      </div>
      <QuestionList />
    </div>
  </ContentLayout>
</template>
