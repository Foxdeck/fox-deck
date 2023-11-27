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
    class="relative w-full border-b bg-white p-8 shadow-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
  >
    <div class="col-span-9 flex flex-col gap-4">
      <FDTypography class="font-bold">
        »{{ question.question }}«
      </FDTypography>
      <FDTypography>
        {{ question.solution }}
      </FDTypography>
    </div>
    <div class="col-span-3 flex h-full flex-col items-end justify-between gap-12">
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
