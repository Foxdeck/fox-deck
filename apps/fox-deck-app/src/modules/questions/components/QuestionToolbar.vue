<script setup lang="ts">
import QuestionFilter from "@/modules/questions/components/QuestionFilter.vue";
import {useI18n} from "vue-i18n";
import {useQuestions} from "@/modules/questions/composables/useQuestions";
import {useNotificationStore} from "@/core/stores/notification.store";
import type {FDDropdownItem} from "@/core/components/FDDropDown/FDDropDown.types";
import FDMenu from "@/core/components/FDMenu/FDMenu.vue";
import AppButton from "@/core/components/AppButton/AppButton.vue";
import {Icon} from "@/core/components/AppIcon/icons";
import AppTextField from "@/core/components/AppTextField/AppTextField.vue";
import {ref} from "vue";

const {searchQuestions} = useQuestions();
const {addNotification} = useNotificationStore();
const {t} = useI18n();

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

const search = ref("");
</script>
<template>
  <div class="flex gap-2 items-center justify-between bg-white p-1 shadow-md rounded-full">
    <RouterLink
      to="/question/create"
    >
      <AppButton
        :icon="Icon.PLUS"
        :label="t('questions.question_create')"
      />
    </RouterLink>
    <AppTextField
      v-model="search"
      placeholder="Search"
      :icon="Icon.SEARCH"
      @update:model-value="onSearch"
    />

    <FDMenu :menu-icon="Icon.FILTER">
      <template #menu>
        <QuestionFilter />
      </template>
    </FDMenu>
  </div>
</template>
