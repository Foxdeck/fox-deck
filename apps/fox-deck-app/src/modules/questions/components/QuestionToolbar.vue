<script setup lang="ts">
import {ref} from "vue";
import QuestionFilter from "@/modules/questions/components/QuestionFilter.vue";
import FDPopup from "@/core/components/FDPopup/FDPopup.vue";
import FDButton from "@/core/components/FDButton/FDButton.vue";
import FDTextInput from "@/core/components/FDTextInput/FDTextInput.vue";
import {useI18n} from "vue-i18n";
import {useQuestions} from "@/modules/questions/composables/useQuestions";
import {useNotificationStore} from "@/core/stores/notification.store";
import type {FDDropdownItem} from "@/core/components/FDDropDown/FDDropDown.types";

const {searchQuestions} = useQuestions();
const {addNotification} = useNotificationStore();
const {t} = useI18n();

const isFilterOpen = ref(false);

const categories: FDDropdownItem[] = [
  {
    id: "all",
    label: t("questions.question_filter.category_items.all"),
    value: "all",
  }
];

async function onSearch(search: string) {
  try {
    await searchQuestions(search);
  } catch (e) {
    const error = e as Error;
    addNotification({
      title: t(error.name),
      text: t(error.message),
      severity: "danger",
    });
  }
}
</script>
<template>
  <div class="flex items-center justify-between">
    <RouterLink
      to="/question/create"
    >
      <FDButton
        icon="plus"
        :label="t('questions.question_create')"
      />
    </RouterLink>
    <FDTextInput
      class="max-w-[500px] w-full shadow-2xl"
      name="search"
      icon="search"
      :has-select="true"
      :items="categories"
      :selected-item="categories[0]"
      :is-open="true"
      :label="t('questions.question_search_placeholder')"
      @on-input="onSearch"
    />
    <FDPopup
      :is-open="isFilterOpen"
    >
      <template #container>
        <FDButton
          class="!bg-white !text-primary-950"
          variant="text"
          icon="filter"
          @click="isFilterOpen = !isFilterOpen"
        />
      </template>
      <template #popupContent>
        <QuestionFilter />
      </template>
    </FDPopup>
  </div>
</template>
