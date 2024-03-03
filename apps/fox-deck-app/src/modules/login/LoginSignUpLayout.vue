<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {type RouteLocationNormalizedLoaded, useRouter} from "vue-router";
import Logo from "@/assets/icons/foxdeck-logo.svg";
import FDTypography from "@/core/components/FDTypography/FDTypography.vue";
import {LoginRouteNames} from "@/modules/login/routes";

const {t} = useI18n();
const { currentRoute } = useRouter();

function getRouteForSignInSignUp(currentRoute: RouteLocationNormalizedLoaded): LoginRouteNames {
  if (currentRoute.name === "login") {
    return LoginRouteNames.REGISTER;
  } else {
    return LoginRouteNames.LOGIN;
  }
}

</script>
<template>
  <div class="flex items-center justify-center">
    <img
      alt=""
      class="h-screen w-[50%] object-cover hidden md:block"
      src="https://images.pexels.com/photos/2574616/pexels-photo-2574616.jpeg"
    >
    <div class="flex flex-col h-screen py-12 w-full justify-between flex-wrap items-center max-w-[1440px]">
      <Logo class=" w-12" />

      <div class="flex flex-col gap-8 px-10 py-14 min-w-[500px]">
        <div class="w-[400px] mt-8">
          <slot name="form" />
        </div>
      </div>

      <FDTypography type="psm">
        <span v-if="currentRoute.name === 'login'">
          {{ t("login.new_user") }}&nbsp;
        </span>
        <span v-if="currentRoute.name === 'register'">
          {{ t("register.already_an_account") }}&nbsp;
        </span>
        <RouterLink
          :to="getRouteForSignInSignUp(currentRoute)"
          class="font-bold underline text-primary-500"
        >
          <span v-if="currentRoute.name === 'login'">
            {{ t("login.create_account") }}
          </span>
          <span v-if="currentRoute.name === 'register'">
            {{ t("register.login_now") }}
          </span>
        </RouterLink>
      </FDTypography>
    </div>
  </div>
</template>
