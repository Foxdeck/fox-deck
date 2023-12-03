<script setup lang="ts">
import FDGrid from "@/core/components/FDGrid/FDGrid.vue";
import FDTypography from "@/core/components/FDTypography/FDTypography.vue";
import {type PropType} from "vue";
import type {QuestionsResponseDto} from "@/core/services/api";
import QuestionListItemActionMenu from "@/modules/questions/components/QuestionListItemActionMenu.vue";
import {useAuthStore} from "@/core/stores/auth.store";

const props = defineProps({
  question: { type: Object as PropType<QuestionsResponseDto>, required: true},
});

const { readJWT } = useAuthStore();

function isAuthor(): boolean {
  return props.question?.authorId == readJWT().id;
}

</script>
<template>
  <FDGrid
    v-if="question"
    class="relative w-full border-b bg-white p-8 shadow-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
  >
    <div class="col-span-9 flex flex-col gap-4">
      <FDTypography
        type="pxs"
        class="font-bold uppercase opacity-80"
      >
        {{ question.category }}
      </FDTypography>
      <FDTypography class="font-bold">
        »{{ question.question }}«
      </FDTypography>
      <FDTypography>
        {{ question.solution }}
      </FDTypography>
    </div>
    <div
      class="col-span-3 flex h-full flex-col items-end justify-between gap-12"
      :class="{
        '!justify-end': !isAuthor()
      }"
    >
      <QuestionListItemActionMenu
        v-if="isAuthor()"
        :question-id="question.id"
      />
      <FDTypography
        type="pxs"
        class="italic"
      >
        @{{ question.author.username }}
      </FDTypography>
    </div>
  </FDGrid>
</template>
