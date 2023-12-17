<script setup lang="ts">
import ContentLayout from "@/core/components/Layouts/ContentLayout.vue";
import FDTypography from "@/core/components/FDTypography/FDTypography.vue";
import {useI18n} from "vue-i18n";
import FDHero from "@/core/components/FDHero/FDHero.vue";
import AppIcon from "@/core/components/AppIcon/AppIcon.vue";
import {Icon} from "@/core/components/AppIcon/icons";

const {t} = useI18n();
</script>

<template>
  <ContentLayout>
    <FDHero
      :title="t('questionnaires.title')"
      :subtitle="t('questionnaires.text')"
    />
    <div class="bg-white shadow-md">
      <div class="flex p-4 b-2 border-b-2 justify-between">
        <FDTypography class="font-bold">
          Questionnaire 1
        </FDTypography>
        <AppIcon :icon="Icon.CHEVRON_DOWN" />
      </div>
      <div class="flex p-4 b-2 justify-between">
        <FDTypography>
          Question 1
        </FDTypography>
        <AppIcon
          class="text-xs"
          :icon="Icon.X"
        />
      </div>
      <div class="flex p-4 b-2 justify-between">
        <FDTypography>
          Question 1
        </FDTypography>
        <AppIcon
          class="text-xs"
          :icon="Icon.X"
        />
      </div>
      <div class="flex p-4 b-2 justify-between">
        <FDTypography>
          Question 1
        </FDTypography>
        <AppIcon
          class="text-xs"
          :icon="Icon.X"
        />
      </div>
    </div>
  </ContentLayout>
</template>
