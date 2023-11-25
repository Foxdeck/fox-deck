<script setup lang="ts">
import FDButton from "@/core/components/FDButton/FDButton.vue";
import ContentLayout from "@/core/components/Layouts/ContentLayout.vue";
import Image from "@/assets/images/book.svg";
import FDTypography from "@/core/components/FDTypography/FDTypography.vue";
import {useI18n} from "vue-i18n";

const { t } = useI18n();
</script>
<template>
  <ContentLayout>
    <div
      class="grid grid-cols-12 gap-12 justify-center items-center self-center"
    >
      <div class="col-span-8">
        <div class="flex flex-col gap-4">
          <FDTypography type="title">
            {{ t("home.title") }}
          </FDTypography>
          <FDTypography
            type="p"
            class="leading-10"
          >
            {{ t("home.text") }}
          </FDTypography>
          <RouterLink
            class="w-fit"
            to="/questions"
          >
            <FDButton
              class="mt-5"
              icon="chevron-right"
              :label="t('home.create_questions_now')"
            />
          </RouterLink>
        </div>
      </div>
      <div class="relative col-span-4">
        <Image />
      </div>
    </div>
  </ContentLayout>
</template>
