<script setup lang="ts">
import ContentLayout from "@/core/components/Layouts/ContentLayout.vue";
import PersonReading from "@/assets/images/book.svg";
import FDTypography from "@/core/components/FDTypography/FDTypography.vue";
import {useI18n} from "vue-i18n";
import AppButton from "@/core/components/AppButton/AppButton.vue";
import {Icon} from "@/core/components/AppIcon/icons";

const { t } = useI18n();
</script>
<template>
  <ContentLayout>
    <div
      class="grid grid-cols-12 items-center justify-center gap-y-12 self-center md:gap-12"
    >
      <div class="col-span-12 md:col-span-8">
        <div class="flex flex-col gap-4">
          <FDTypography type="title">
            {{ t("home.title") }}
          </FDTypography>
          <FDTypography
            type="p"
          >
            {{ t("home.text") }}
          </FDTypography>
          <RouterLink
            class="w-fit"
            to="/questions"
          >
            <AppButton
              class="mt-5"
              :icon="Icon.QUESTION"
              :label="t('home.create_questions_now')"
            />
          </RouterLink>
        </div>
      </div>
      <div class="col-span-12 md:col-span-4">
        <PersonReading class="min-w-[300px]" />
      </div>
    </div>
  </ContentLayout>
</template>
