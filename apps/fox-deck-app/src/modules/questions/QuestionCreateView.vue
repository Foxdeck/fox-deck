<script setup lang="ts">
import {ref} from "vue";
import * as Yup from "yup";
import {Form} from "vee-validate";
import {useI18n} from "vue-i18n";
import ContentLayout from "@/core/components/Layouts/ContentLayout.vue";
import FDTypography from "@/core/components/FDTypography/FDTypography.vue";
import FDTextInput from "@/core/components/FDTextInput/FDTextInput.vue";
import FDTextArea from "@/core/components/FDTextArea/FDTextArea.vue";
import {useAuthStore} from "@/core/stores/auth.store";
import {useNotificationStore} from "@/core/stores/notification.store";
import {useQuestions} from "@/modules/questions/composables/useQuestions";
import type {CreateQuestionRequestDto} from "@/core/services/api";
import {useFoxdeckRouter} from "@/core/composables/useFoxdeckRouter";
import {QuestionRouteNames} from "@/modules/questions/routes";
import FDCard from "@/core/components/FDCard/FDCard.vue";
import AppButton from "@/core/components/AppButton/AppButton.vue";
import {Icon} from "@/core/components/AppIcon/icons";
import AppSwitch from "@/core/components/AppSwitch/AppSwitch.vue";

type FormModel = {
  question: string;
  solution: string;
};

const {push} = useFoxdeckRouter();
const {addNotification} = useNotificationStore();
const {createQuestion} = useQuestions();
const {readJWT} = useAuthStore();
const {t} = useI18n();

const schema = Yup.object().shape({
  question: Yup.string().required(
    t("questions.creation.validation.question_required")
  ),
  solution: Yup.string().required(
    t("questions.creation.validation.answer_required")
  ),
});

const isPublic = ref(true);

async function onFormSubmit(formModel: FormModel) {
  try {
    const question: CreateQuestionRequestDto = {
      ...formModel,
      isPublic: isPublic.value
    };
    await createQuestion(question);
    await push({
      name: QuestionRouteNames.QUESTIONS
    });
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
    <FDCard
      class="mx-auto flex flex-col gap-6 rounded-md bg-white p-8 max-w-[600px]"
    >
      <template #body>
        <Form
          :validation-schema="schema"
          @submit="onFormSubmit"
        >
          <div class="flex flex-col gap-3">
            <FDTypography type="h1">
              {{ t("questions.creation.title") }}
            </FDTypography>
            <FDTypography
              type="p"
              class="leading-8"
            >
              {{ t("questions.creation.text") }}
            </FDTypography>
          </div>
          <div class="flex flex-col gap-2">
            <FDTypography
              type="psm"
              class="font-bold"
            >
              {{ t("questions.creation.what_is_your_question") }}
            </FDTypography>
            <FDTextInput
              name="question"
              :label="t('questions.creation.question')"
            />
          </div>
          <div class="flex flex-col gap-2">
            <FDTypography
              type="psm"
              class="font-bold"
            >
              {{ t("questions.creation.what_is_the_answer") }}
            </FDTypography>
            <FDTextArea
              name="solution"
              :placeholder="t('questions.creation.answer')"
            />
          </div>
          <div class="flex flex-col gap-2">
            <FDTypography
              type="psm"
              class="font-bold"
            >
              {{ t("questions.creation.is_question_public") }}
            </FDTypography>
            <FDTypography
              type="psm"
              class="leading-6"
            >
              {{ t("questions.creation.is_question_public_explanation") }}
            </FDTypography>
            <AppSwitch
              v-model="isPublic"
              :aria-label="t('questions.creation.is_question_public_explanation')"
            />
          </div>
          <AppButton
            class="mt-4"
            :icon="Icon.SAVE_FILLED"
            :label="t('questions.creation.create_question')"
          />
        </Form>
      </template>
    </FDCard>
  </ContentLayout>
</template>