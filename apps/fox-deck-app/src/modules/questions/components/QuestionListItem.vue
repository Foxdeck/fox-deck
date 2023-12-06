<script setup lang="ts">
import FDTypography from "@/core/components/FDTypography/FDTypography.vue";
import {type PropType} from "vue";
import type {QuestionsResponseDto} from "@/core/services/api";
import {useAuthStore} from "@/core/stores/auth.store";
import FDActionMenu, {type FDActionMenuItem} from "@/core/components/FDMenu/FDMenu.vue";
import {useI18n} from "vue-i18n";
import {useQuestions} from "@/modules/questions/composables/useQuestions";

const props = defineProps({
  question: { type: Object as PropType<QuestionsResponseDto>, required: true},
});

const { deleteQuestion } = useQuestions();
const { readJWT } = useAuthStore();
const { t } = useI18n();

function isAuthor(): boolean {
  return props.question?.authorId == readJWT().id;
}

const actionItems: FDActionMenuItem[] = [
  {
    id: "edit",
    label: t("common.edit"),
    icon: "edit",
    action: () => {},
    severity: "primary"
  },
  {
    id: "delete",
    label: t("common.delete"),
    icon: "trash",
    action: () => deleteQuestion(props.question?.id!),
    severity: "danger"
  }
]

</script>
<template>
  <div
    v-if="question"
    class="grid grid-cols-12 items-center justify-center gap-8 self-center relative w-full border-b bg-white p-8 shadow-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
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
      <FDActionMenu
          v-if="isAuthor()"
          :action-items="actionItems"
      />
      <FDTypography
        type="pxs"
        class="italic"
      >
        @{{ question.author.username }}
      </FDTypography>
    </div>
  </div>
</template>
