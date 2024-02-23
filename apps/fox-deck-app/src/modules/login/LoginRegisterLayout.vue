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
      class="h-screen w-[50%] object-cover"
      src="https://images.pexels.com/photos/2574616/pexels-photo-2574616.jpeg"
    >
    <div class="flex flex-col h-screen py-12 w-full justify-between flex-wrap items-center max-w-[1440px]">
      <Logo class=" w-12" />
      <div class="flex flex-col gap-8 px-10 py-14 min-w-[500px]">
        <div class="flex flex-col items-center gap-4">
          <FDTypography
            class="font-bold"
            type="h1"
          >
            Welcome back!
          </FDTypography>
          <FDTypography type="psm">
            Enter your email and password to access your account
          </FDTypography>
        </div>
        <div class="w-[400px] mt-8">
          <slot name="form" />
        </div>
      </div>
      <FDTypography
        type="psm"
        class="text-sm"
      >
        {{ t("login.new_user") }}
        <RouterLink
          to="register"
          class="font-bold underline text-primary-500"
        >
          {{ t("login.create_account") }}
        </RouterLink>
      </FDTypography>
    </div>
  </div>
</template>
