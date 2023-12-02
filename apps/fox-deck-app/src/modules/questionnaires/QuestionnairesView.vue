<script setup lang="ts">
import ContentLayout from "@/core/components/Layouts/ContentLayout.vue";
import FDTypography from "@/core/components/FDTypography/FDTypography.vue";
import {useI18n} from "vue-i18n";

const {t} = useI18n();
</script>

<template>
  <ContentLayout>
    <FDTypography
      type="h1"
    >
      {{ t("questionnaires.title") }}
    </FDTypography>
    <FDTypography>
      {{ t("questionnaires.text") }}
    </FDTypography>
    <div class="bg-white shadow-md">
      <div class="flex p-4 b-2 border-b-2 justify-between">
        <FDTypography class="font-bold">
          Questionnaire 1
        </FDTypography>
        <vue-feather type="chevron-down" />
      </div>
      <div class="flex p-4 b-2 justify-between">
        <FDTypography>
          Question 1
        </FDTypography>
        <vue-feather
          type="x"
          size="14"
        />
      </div>
      <div class="flex p-4 b-2 justify-between">
        <FDTypography>
          Question 1
        </FDTypography>
        <vue-feather
          type="x"
          size="14"
        />
      </div>
      <div class="flex p-4 b-2 justify-between">
        <FDTypography>
          Question 1
        </FDTypography>
        <vue-feather
          type="x"
          size="14"
        />
      </div>
    </div>
  </ContentLayout>
</template>
