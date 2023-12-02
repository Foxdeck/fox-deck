<script setup lang="ts">
import {useI18n} from "vue-i18n";
import Logo from "@/assets/icons/foxdeck-logo.svg";
import FDTypography from "@/core/components/FDTypography/FDTypography.vue";

const {t} = useI18n();
</script>
<template>
  <div class="flex h-screen w-screen items-center justify-center">
    <div class="fixed top-0 left-0 z-50 h-screen w-screen bg-primary-900/30" />
    <img
      alt=""
      class="fixed top-0 right-0 bottom-0 left-0 h-screen w-screen object-cover contrast-150 filter"
      src="https://images.pexels.com/photos/3780104/pexels-photo-3780104.png?auto=compress&cs=tinysrgb&w=1600"
    >
    <div class="flex h-full w-full flex-wrap items-center max-w-[1440px]">
      <div class="z-50 mx-auto flex flex-col items-center gap-4">
        <Logo class="w-16" />
        <FDTypography
          class="text-base font-bold text-white"
          type="p"
        >
          {{ t("common.foxdeck") }}
        </FDTypography>
        <FDTypography
          class="w-56 text-center text-xs italic leading-relaxed text-white"
          type="p"
        >
          {{ t("common.intro_text") }}
        </FDTypography>
      </div>
      <div class="z-50 overflow-hidden rounded-sm bg-white shadow-xl">
        <div class="col-span-1 flex flex-col gap-4 px-10 py-14 min-w-[400px] 3xl:gap-6 3xl:px-16 3xl:py-20">
          <slot name="form" />
        </div>
      </div>
    </div>
  </div>
</template>
