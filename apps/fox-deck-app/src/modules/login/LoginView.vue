<script setup lang="ts">
import {ref} from "vue";
import * as Yup from "yup";
import {useI18n} from "vue-i18n";
import {useAuthStore} from "@/core/stores/auth.store";
import {api} from "@/core/services";
import {useFoxdeckRouter} from "@/core/composables/useFoxdeckRouter";
import FDFormBuilder, {FormSchema} from "@/core/components/FDFormBuilder/FDFormBuilder.vue";
import AppTextField from "@/core/components/AppTextField/AppTextField.vue";
import LoginRegisterLayout from "@/modules/login/LoginRegisterLayout.vue";
import {HomeRouteNames} from "@/modules/home/routes";

const { push } = useFoxdeckRouter();
const authService = useAuthStore();
const { t } = useI18n();

const hasLoginError = ref(false);

async function onFormSubmit({ email, password }) {
  try {
    const response = await api.login.userControllerGetUser({ email, password });
    const user = await response.data;
    authService.setJwt(user.accessToken);
    await push({
      name: HomeRouteNames.HOME,
    });
  } catch (e) {
    if (e.error.statusCode === 401) {
      // TODO: if login is not successful
    }
    hasLoginError.value = true;
    return;
  }
}

const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email(t("login.validation.email_invalid")).required(t("login.validation.email_required")),
  password: Yup.string().required(t("login.validation.password_required")),
});

const formSchema: FormSchema = {
  fields: [
    {
      label: "login.email",
      name: "email",
      type: "email",
      component: AppTextField
    },
    {
      label: "login.password",
      name: "password",
      type: "password",
      component: AppTextField
    }
  ],
  validation: loginValidationSchema,
  action: {
    label: "login.login"
  }
};

</script>
<template>
  <LoginRegisterLayout>
    <template #form>
      <FDFormBuilder
        :form-schema="formSchema"
        @on-submit="onFormSubmit"
      />
    </template>
  </LoginRegisterLayout>
</template>
