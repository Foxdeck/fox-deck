<script setup lang="ts">
import {ref} from "vue";
import {useI18n} from "vue-i18n";
import * as Yup from "yup";
import {api} from "@/core/services";
import {useFoxdeckRouter} from "@/core/composables/useFoxdeckRouter";
import FDFormBuilder, {type FormSchema} from "@/core/components/FDFormBuilder/FDFormBuilder.vue";
import FDTypography from "@/core/components/FDTypography/FDTypography.vue";
import AppTextField from "@/core/components/AppTextField/AppTextField.vue";
import LoginRegisterLayout from "@/modules/login/LoginSignUpLayout.vue";
import {LoginRouteNames} from "@/modules/login/routes";

const {push} = useFoxdeckRouter();
const {t} = useI18n();

const hasRegisterError = ref();

const minUsernameCharacterLength = 6;
const minPasswordCharacterLength = 8;

const registrationValidationSchema = Yup.object({
  email: Yup.string()
    .email(t("register.validation.email_invalid"))
    .required(t("register.validation.email_required")),

  username: Yup.string()
    .min(minUsernameCharacterLength, t("register.validation.username_min_length_required", {
      chars: minUsernameCharacterLength
    }))
    .required(t("register.validation.username_required")),

  password: Yup.string()
    .min(minPasswordCharacterLength, t("register.validation.password_min_length_required", {
      chars: minPasswordCharacterLength
    }))
    .oneOf([Yup.ref("passwordRepeat")], t("register.validation.password_must_match"))
    .required(t("register.validation.password_required")),

  passwordRepeat: Yup.string()
    .oneOf([Yup.ref("password")], t("register.validation.password_must_match"))
    .required(t("register.validation.password_required"))
});


const formSchema: FormSchema = {
  fields: [
    {
      label: "register.email",
      name: "email",
      type: "email",
      component: AppTextField
    },
    {
      label: "register.username",
      name: "username",
      type: "text",
      component: AppTextField
    },
    {
      label: "register.password",
      name: "password",
      type: "password",
      component: AppTextField
    },
    {
      label: "register.password_repeat",
      name: "passwordRepeat",
      type: "password",
      component: AppTextField
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
async function onRegisterSubmit({email, password, username}: any) {
  try {
    await api.register.userControllerCreateUser({email, password, username});
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
      <div class="flex flex-col text-center">
        <FDTypography
          class="font-bold"
          type="h1"
        >
          Create Account
        </FDTypography>
        <FDTypography type="psm">
          In 5 minutes you can start learning
        </FDTypography>
      </div>
      <FDFormBuilder
        class="mt-12"
        :form-schema="formSchema"
        @on-submit="onRegisterSubmit"
      />
    </template>
  </LoginRegisterLayout>
</template>
