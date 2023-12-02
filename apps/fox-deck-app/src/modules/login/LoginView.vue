<script setup lang="ts">
import {ref} from "vue";
import {useAuthStore} from "@/core/stores/auth.store";
import LoginRegisterLayout from "@/modules/login/LoginRegisterLayout.vue";
import {api} from "@/core/services";
import {useFoxdeckRouter} from "@/core/composables/useFoxdeckRouter";
import {HomeRouteNames} from "@/modules/home/routes";
import FDFormBuilder, {FormSchema} from "@/core/components/FDFormBuilder/FDFormBuilder.vue";
import FDTextInput from "@/core/components/FDTextInput/FDTextInput.vue";
import * as Yup from "yup";
import {useI18n} from "vue-i18n";
import FDTypography from "@/core/components/FDTypography/FDTypography.vue";

const { push } = useFoxdeckRouter();
const authService = useAuthStore();
const { t } = useI18n();

const hasLoginError = ref();


async function onFormSubmit({ email, password }) {
  try {
    const response = await api.login.userControllerGetUser({ email, password });
    const user = await response.data;
    authService.setJwt(user.accessToken);
    await push({
      name: HomeRouteNames.HOME,
    });
  } catch (e) {
    hasLoginError.value = true;
    return;
  }
}

const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email().required(t("login.validation.email_required")),
  password: Yup.string().required(t("login.validation.password_required")),
});

const formSchema: FormSchema = {
  fields: [
    {
      label: "login.email",
      name: "email",
      type: "email",
      component: FDTextInput
    },
    {
      label: "login.password",
      name: "password",
      type: "password",
      component: FDTextInput
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
      <FDTypography
        type="h1"
        class="pb-6"
      >
        {{ t("login.title") }}
      </FDTypography>
      <FDTypography
        type="pxs"
        class="text-sm"
      >
        {{ t("login.new_user") }}
        <RouterLink
          to="register"
          class="underline text-primary-500"
        >
          {{ t("login.create_account") }}
        </RouterLink>
      </FDTypography>
      <FDFormBuilder
        :form-schema="formSchema"
        @on-submit="onFormSubmit"
      />
    </template>
  </LoginRegisterLayout>
</template>
