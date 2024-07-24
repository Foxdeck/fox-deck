<script setup lang="ts">
// external imports
import {reactive} from "vue";
import {useI18n} from "vue-i18n";
import * as Yup from "yup";

// core imports
import AppTextField from "@/core/components/AppTextField/AppTextField.vue";
import FDFormBuilder, {type FormSchema} from "@/core/components/FDFormBuilder/FDFormBuilder.vue";
import type {Severity} from "@/core/components/severity.types";
import {useFoxdeckRouter} from "@/core/composables/useFoxdeckRouter";
import {api} from "@/core/services";
import {useAuthStore} from "@/core/stores/auth.store";
import {useNotificationStore} from "@/core/stores/notification.store";
import {ServerResponse} from "@/core/types/server-response.enum";
// modules imports
import {HomeRouteNames} from "@/modules/home/routes";
import LoginRegisterLayout from "@/modules/login/LoginSignUpLayout.vue";

const { push } = useFoxdeckRouter();
const authService = useAuthStore();
const { addNotification } = useNotificationStore();
const { t } = useI18n();

const formError = reactive({
  hasError: false,
  errorMessage: ""
});

async function onFormSubmit({ email, password }: any) {
  try {
    const response = await api.login.loginCreate({ email, password });

    // if login is successful, store the JWT-Token
    const loginResponse = await response.data;

    if (!loginResponse.token) {
      addNotification({
        severity: "danger" as Severity,
        text: t("login.error.generic_error"),
        title: t("login.error.generic_error_title")
      });
      return;
    }
    authService.setJwt(loginResponse.token);

    formError.hasError = false;
    await push({
      name: HomeRouteNames.HOME,
    });
  } catch (e) {
    formError.hasError = true;
    if ((e as any)?.error?.statusCode === ServerResponse.AUTHENTICATION_ERROR) {
      formError.errorMessage = t("login.error.authentication_error");
      return;
    }

    formError.errorMessage = t("login.error.generic_error");
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
  action: {
    label: "login.login",
  },
  validation: loginValidationSchema,
};

</script>
<template>
  <LoginRegisterLayout>
    <template #form>
      <div class="flex flex-col text-center">
        <h1 class="display-medium">
          Welcome back!
        </h1>
        <span class="body-medium">
          Enter your email and password to access your account
        </span>
      </div>
      <FDFormBuilder
        class="mt-12"
        :form-schema="formSchema"
        :is-form-error="formError.hasError"
        :form-error-text="formError.errorMessage"
        @on-submit="onFormSubmit"
      />
    </template>
  </LoginRegisterLayout>
</template>
