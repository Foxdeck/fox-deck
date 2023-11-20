<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import RegisterForm from "@/modules/login/components/RegisterForm.vue";
import { useAuthStore } from "@/core/stores/auth.store";
import LoginRegisterLayout from "@/modules/login/LoginRegisterLayout.vue";

const router = useRouter();
const authService = useAuthStore();

const hasRegisterError = ref();

async function onRegisterSubmit({ email, password, username }) {
  const isRegisterSuccessful = await authService.register(
    email,
    password,
    username
  );
  if (!isRegisterSuccessful) {
    hasRegisterError.value = true;
  }

  await router.push({
    name: "login",
  });
}
</script>
<template>
  <LoginRegisterLayout>
    <template #form>
      <RegisterForm
        :has-error="hasRegisterError"
        @onSubmit="
          (e) =>
            onRegisterSubmit({
              email: e.email,
              password: e.password,
              username: e.username,
            })
        "
      />
    </template>
  </LoginRegisterLayout>
</template>
