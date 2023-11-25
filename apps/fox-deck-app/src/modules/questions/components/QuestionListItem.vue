<script setup lang="ts">
import FDGrid from "@/core/components/FDGrid/FDGrid.vue";
import FDTypography from "@/core/components/FDTypography/FDTypography.vue";
import {PropType} from "vue";
import type {QuestionsResponseDto} from "@/core/services/api";
import QuestionListItemActionMenu from "@/modules/questions/components/QuestionListItemActionMenu.vue";

defineProps({
  question: { type: Object as PropType<QuestionsResponseDto>, default: undefined},
});

</script>
<template>
  <FDGrid
    v-if="question"
    class="relative shadow-sm p-8 bg-white border-b w-full dark:bg-gray-800 dark:text-white dark:border-gray-600"
  >
    <div class="flex flex-col col-span-9 gap-4">
      <FDTypography class="font-bold">
        »{{ question.question }}«
      </FDTypography>
      <FDTypography>
        {{ question.solution }}
      </FDTypography>
    </div>
    <div class="flex flex-col col-span-3 justify-between items-end h-full gap-12">
      <QuestionListItemActionMenu />
      <FDTypography
        type="pxs"
        class="text-right italic"
      >
        @{{ question.author.username }}
      </FDTypography>
    </div>
  </FDGrid>
</template>
