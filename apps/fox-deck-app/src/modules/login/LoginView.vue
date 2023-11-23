<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import LoginForm from "@/modules/login/components/LoginForm.vue";
import { useAuthStore } from "@/core/stores/auth.store";
import LoginRegisterLayout from "@/modules/login/LoginRegisterLayout.vue";
import { api } from "@/core/services";

const router = useRouter();
const authService = useAuthStore();

const hasLoginError = ref();

async function onLoginSubmit({ email, password }) {
  try {
    const response = await api.login.userControllerGetUser({ email, password });
    const user = await response.data;
    authService.setJwt(user.accessToken);
    await router.push({
      name: "home",
    });
  } catch (e) {
    hasLoginError.value = true;
    return;
  }
}
</script>
<template>
  <LoginRegisterLayout>
    <template #form>
      <LoginForm
        :has-error="hasLoginError"
        @on-submit="
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
