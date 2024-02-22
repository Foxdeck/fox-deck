<script setup lang="ts">
import {useI18n} from "vue-i18n";
import Logo from "@/assets/icons/foxdeck-logo.svg";
import FDTypography from "@/core/components/FDTypography/FDTypography.vue";

const {t} = useI18n();
</script>
<template>
  <div class="flex items-center justify-center">
    <img
      alt=""
      class="h-screen w-[40%] object-cover"
      src="https://images.pexels.com/photos/2574616/pexels-photo-2574616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    >
    <div class="flex flex-col h-full w-full justify-center flex-wrap items-center max-w-[1440px]">
      <div class="z-50 mx-auto flex flex-col items-center gap-4">
        <Logo class="fixed right-12 top-12 w-12" />
        <!--        <FDTypography-->
        <!--          class="text-base font-bold"-->
        <!--          type="p"-->
        <!--        >-->
        <!--          {{ t("common.foxdeck") }}-->
        <!--        </FDTypography>-->
        <!--        <FDTypography-->
        <!--          class="w-56 text-center text-xs italic leading-relaxed"-->
        <!--          type="p"-->
        <!--        >-->
        <!--          {{ t("common.intro_text") }}-->
        <!--        </FDTypography>-->
        <FDTypography
          class="font-bold"
          type="h1"
        >
          Welcome back!
        </FDTypography>
        <FDTypography
          type="psm"
        >
          Enter your email and password to access your account
        </FDTypography>
      </div>
      <div class="col-span-1 flex flex-col gap-4 px-10 py-14 min-w-[500px] 3xl:gap-6 3xl:px-16 3xl:py-20">
        <slot name="form" />
      </div>
      <FDTypography
        type="psm"
        class="text-sm"
      >
        {{ t("login.new_user") }}
        <RouterLink
          to="register"
          class="font-bold text-primary-500"
        >
          {{ t("login.create_account") }}
        </RouterLink>
      </FDTypography>
    </div>
  </div>
</template>
