<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {type RouteLocationNormalizedLoaded, useRouter} from "vue-router";

import Logo from "@/assets/icons/foxdeck-logo.svg";
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
      class="hidden h-screen w-1/2 object-cover md:block"
      src="https://images.pexels.com/photos/2574616/pexels-photo-2574616.jpeg"
    >
    <div class="flex h-screen w-full max-w-[1440px] flex-col flex-wrap items-center justify-between py-12">
      <Logo class=" w-12" />

      <div class="flex min-w-[500px] flex-col gap-8 px-10 py-14">
        <div class="mt-8 w-[400px]">
          <slot name="form" />
        </div>
      </div>

      <span
        class="body-small"
      >
        <span v-if="currentRoute.name === 'login'">
          {{ t("login.new_user") }}&nbsp;
        </span>
        <span v-if="currentRoute.name === 'register'">
          {{ t("register.already_an_account") }}&nbsp;
        </span>
        <RouterLink
          :to="getRouteForSignInSignUp(currentRoute)"
          class="font-bold text-primary-500 underline"
        >
          <span v-if="currentRoute.name === 'login'">
            {{ t("login.create_account") }}
          </span>
          <span v-if="currentRoute.name === 'register'">
            {{ t("register.login_now") }}
          </span>
        </RouterLink>
      </span>
    </div>
  </div>
</template>
