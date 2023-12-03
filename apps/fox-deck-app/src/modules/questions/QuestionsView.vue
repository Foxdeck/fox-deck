<script setup lang="ts">
import {useI18n} from "vue-i18n";
import ContentLayout from "@/core/components/Layouts/ContentLayout.vue";
import FDHero from "@/core/components/FDHero/FDHero.vue";
import QuestionList from "@/modules/questions/components/QuestionList.vue";
import QuestionToolbar from "@/modules/questions/components/QuestionToolbar.vue";

const { t } = useI18n();
</script>

<template>
  <ContentLayout>
    <FDHero
      :title="t('questions.title')"
      :subtitle="t('questions.text')"
    />
    <QuestionToolbar />
    <QuestionList />
  </ContentLayout>
</template>