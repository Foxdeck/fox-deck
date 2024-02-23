<script setup lang="ts">
import ContentLayout from "@/core/components/Layouts/ContentLayout.vue";
import FDTypography from "@/core/components/FDTypography/FDTypography.vue";
import {useI18n} from "vue-i18n";

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
        </div>
      </div>
    </div>
  </ContentLayout>
</template>
