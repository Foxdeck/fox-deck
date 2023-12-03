<script setup lang="ts">
import ContentLayout from "@/core/components/Layouts/ContentLayout.vue";
import FDTypography from "@/core/components/FDTypography/FDTypography.vue";
import QuestionList from "@/modules/questions/components/QuestionList.vue";
import {useI18n} from "vue-i18n";
import {useQuestionsStore} from "@/modules/questions/stores/questions.store";
import QuestionToolbar from "@/modules/questions/components/QuestionToolbar.vue";

const questionsStore = useQuestionsStore();
const {t} = useI18n();


</script>

<template>
  <ContentLayout>
    <div class="flex h-full flex-col gap-8">
      <FDTypography
        type="h1"
        class="font-bold text-primary-800 relative mx-auto z-10"
      >
        {{ t("questions.title") }}
        <div class="bg-yellow-300 absolute -left-3 -bottom-1 w-full -z-10 h-6 rounded-md" />
      </FDTypography>
      <FDTypography
        type="psm"
        class="leading-8 text-center max-w-[600px] mx-auto text-primary-800"
      >
        {{ t("questions.text") }}
      </FDTypography>
    </div>

    <QuestionToolbar />
    <FDTypography
      type="pxs"
      class="text-right italic"
    >
      {{ t("questions.question_amount", { amount: questionsStore.questions.length}) }}
    </FDTypography>
    <div class="flex flex-row gap-6">
      <QuestionList />
    </div>
  </ContentLayout>
</template>