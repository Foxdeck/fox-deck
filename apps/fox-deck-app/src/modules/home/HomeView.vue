<script setup lang="ts">
import ContentLayout from "@/core/components/Layouts/ContentLayout.vue";
import {useI18n} from "vue-i18n";
import AppTextField from "@/core/components/AppTextField/AppTextField.vue";
import {Icon} from "@/core/components/AppIcon/icons";
import AppIcon from "@/core/components/AppIcon/AppIcon.vue";

import "@material/web/focus/md-focus-ring";

const { t } = useI18n();
</script>
<template>
  <ContentLayout>
    <div class="col-span-12 md:col-span-8">
      <div class="flex flex-col gap-4">
        <span class="text-center text-2xl font-gabarito py-4">{{ t("home.title" ) }}</span>
        <app-text-field
          class="w-1/2 self-center"
          :label="t('home.search_in_notes')"
          variant="filled"
          :is-rounded="true"
          :icon="Icon.SEARCH"
        />
        <span class="font-bold mb-2">{{ t("home.suggestions") }}</span>
        <div
          class="flex flex-row gap-4"
        >
          <div
            class="relative flex on-primary on-primary-container-text rounded-2xl shadow-sm py-4 px-6 gap-4 outline-none"
            tabindex="0"
          >
            <md-focus-ring />
            <app-icon
              class="text-2xl"
              :icon="Icon.DOCUMENT_FILLED"
            />
            <div class="flex flex-col justify-center gap-1">
              <span class="text-base">Lorem Ipsum</span>

              <span class="text-xs on-surface-variant-text">last_edited_at_placeholder</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ContentLayout>
</template>
