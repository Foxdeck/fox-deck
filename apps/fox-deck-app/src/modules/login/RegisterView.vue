<script setup lang="ts">
import {ref} from "vue";
import LoginRegisterLayout from "@/modules/login/LoginRegisterLayout.vue";
import {api} from "@/core/services";
import {useFoxdeckRouter} from "@/core/composables/useFoxdeckRouter";
import {LoginRouteNames} from "@/modules/login/routes";
import FDTextInput from "@/core/components/FDTextInput/FDTextInput.vue";
import FDFormBuilder, {type FormSchema} from "@/core/components/FDFormBuilder/FDFormBuilder.vue";
import {useI18n} from "vue-i18n";
import FDTypography from "@/core/components/FDTypography/FDTypography.vue";
import * as Yup from "yup";

const { push } = useFoxdeckRouter();
const { t } = useI18n();

const hasRegisterError = ref();

const registrationValidationSchema = Yup.object({
  email: Yup.string()
    .email(t("register.validation.email_invalid"))
    .required(t("register.validation.email_required")),

  username: Yup.string()
    .required(t("register.validation.username_required")),

  password: Yup.string()
    .min(8, "register.validation.password_min_length_required")
    .required(t("register.validation.password_required")),

  passwordRepeat: Yup.string()
    .oneOf([Yup.ref("password")], "register.validation.password_must_match")
    .required(t("register.validation.password_required"))
});


const formSchema: FormSchema = {
  fields: [
    {
      label: "register.email",
      name: "email",
      type: "email",
      component: FDTextInput
    },
    {
      label: "register.username",
      name: "username",
      type: "text",
      component: FDTextInput
    },
    {
      label: "register.password",
      name: "password",
      type: "password",
      component: FDTextInput
    },
    {
      label: "register.password_repeat",
      name: "password",
      type: "password",
      component: FDTextInput
    },
  ],
  validation: registrationValidationSchema,
  action: {
    label: "register.register"
  }
};

/**
 * If the user clicks submits the form,  e.g. via clicking the 'submit'-button, a new user will be created.
 *
 * @param email {string} email of the user to create
 * @param password {string} password of the user to create
 * @param username {string} username of the user to create
 */
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
      <FDTypography
        type="h1"
        class="pb-6"
      >
        {{ t("register.title") }}
      </FDTypography>
      <FDTypography
        type="pxs"
        class="text-sm"
      >
        {{ t("register.already_an_account") }}
        <RouterLink
          to="login"
          class="underline text-primary-500"
        >
          {{ t("register.login_now") }}
        </RouterLink>
      </FDTypography>
      <FDFormBuilder
        :form-schema="formSchema"
        @on-submit="onRegisterSubmit"
      />
    </template>
  </LoginRegisterLayout>
</template>
