<script setup lang="ts">
import {ref} from "vue";
import FDButton from "@/core/components/FDButton/FDButton.vue";
import FDPopup from "@/core/components/FDPopup/FDPopup.vue";
import {useQuestions} from "@/modules/questions/composables/useQuestions";
import {useI18n} from "vue-i18n";

defineProps({
  questionId: { type: String, required: true }
});

const { deleteQuestion } = useQuestions();
const { t } = useI18n();

const isMenuOpen = ref(false);
</script>
<template>
  <FDPopup :is-open="isMenuOpen">
    <template #container>
      <FDButton
        class="dark:!text-white"
        variant="text"
        icon="more-vertical"
        @click="isMenuOpen = !isMenuOpen"
      />
    </template>
    <template #popupContent>
      <div class="flex flex-col">
        <FDButton
          variant="text"
          icon="edit"
          :label="t('common.edit')"
        />
        <FDButton
          variant="text"
          severity="danger"
          icon="trash"
          :label="t('common.delete')"
          @click="deleteQuestion(questionId)"
        />
      </div>
    </template>
  </FDPopup>
</template>
