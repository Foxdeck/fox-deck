<script setup lang="ts">
import {ref} from "vue";
import RegisterForm from "@/modules/login/components/RegisterForm.vue";
import LoginRegisterLayout from "@/modules/login/LoginRegisterLayout.vue";
import {api} from "@/core/services";
import {useFoxdeckRouter} from "@/core/composables/useFoxdeckRouter";
import {LoginRouteNames} from "@/modules/login/routes";

const { push } = useFoxdeckRouter();

const hasRegisterError = ref();

async function onRegisterSubmit({ email, password, username }) {
  try {
    await api.register.userControllerCreateUser({ email, password, username });
    await push({
      name: LoginRouteNames.LOGIN
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
        @on-submit="
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
