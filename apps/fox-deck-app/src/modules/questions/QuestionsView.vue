<script setup lang="ts">
import ContentLayout from "@/core/components/Layouts/ContentLayout.vue";
import QuestionList from "@/modules/questions/components/QuestionList.vue";
import QuestionToolbar from "@/modules/questions/components/QuestionToolbar.vue";
import QuestionsViewHero from "@/modules/questions/components/QuestionsViewHero.vue";
</script>

<template>
  <ContentLayout>
    <QuestionsViewHero />
    <QuestionToolbar />
    <QuestionList />
  </ContentLayout>
</template>