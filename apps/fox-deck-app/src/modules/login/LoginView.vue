<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import LoginForm from "@/modules/login/components/LoginForm.vue";
import { useAuthStore } from "@/core/stores/auth.store";
import LoginRegisterLayout from "@/modules/login/LoginRegisterLayout.vue";

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
  <LoginRegisterLayout>
    <template #form>
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
    </template>
  </LoginRegisterLayout>
</template>
