<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import RegisterForm from "@/modules/login/components/RegisterForm.vue";
import LoginRegisterLayout from "@/modules/login/LoginRegisterLayout.vue";
import { api } from "@/core/services";

const router = useRouter();

const hasRegisterError = ref();

async function onRegisterSubmit({ email, password, username }) {
  try {
    await api.register.userControllerCreateUser({ email, password, username });
    await router.push({
      name: "login",
    });
  } catch (e) {
    hasRegisterError.value = true;
    return;
  }
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
