<script setup lang="ts">
import Logo from "@/assets/icons/foxdeck-logo.svg";
import FDTypography from "@/components/FDTypography/FDTypography.vue";
import LoginForm from "@/components/Login/LoginForm.vue";
import { useAuthStore } from "@/stores/auth.store";
import { useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();
const authService = useAuthStore();

const hasLoginError = ref();

async function onLoginSubmit({ email, password }) {
  const isLoginSuccessful = await authService.login(email, password);
  if (!isLoginSuccessful) {
    hasLoginError.value = true;
  }

  await router.push({
    name: "home",
  });
}
</script>
<template>
  <div class="flex justify-center items-center h-screen w-screen">
    <div class="fixed left-0 top-0 w-screen h-screen bg-primary-900/30 z-50" />
    <img
      alt=""
      class="filter contrast-150 fixed top-0 left-0 right-0 bottom-0 w-screen h-screen object-cover"
      src="https://images.pexels.com/photos/3780104/pexels-photo-3780104.png?auto=compress&cs=tinysrgb&w=1600"
    />
    <div class="flex flex-wrap items-center h-full w-full max-w-[1440px]">
      <div class="flex flex-col items-center gap-4 z-50 mx-auto">
        <Logo class="w-16" />
        <FDTypography class="text-white text-base font-bold" type="p">
          FoxDeck
        </FDTypography>
        <FDTypography
          class="text-white text-xs italic w-56 text-center leading-relaxed"
          type="p"
        >
          »Gestalte, teile und erlebe interaktives lernen«
        </FDTypography>
      </div>
      <div class="bg-white z-50 rounded-sm shadow-xl overflow-hidden">
        <LoginForm
          :has-error="hasLoginError"
          @onSubmit="
            (e) =>
              onLoginSubmit({
                email: e.email,
                password: e.password,
              })
          "
        />
      </div>
    </div>
  </div>
</template>
