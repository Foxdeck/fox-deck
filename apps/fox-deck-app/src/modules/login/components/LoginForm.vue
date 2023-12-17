<script setup lang="ts">
import {Form} from "vee-validate";
import FDTypography from "@/core/components/FDTypography/FDTypography.vue";
import FDTextInput from "@/core/components/FDTextInput/FDTextInput.vue";
import * as Yup from "yup";
import {useI18n} from "vue-i18n";
import AppButton from "@/core/components/AppButton/AppButton.vue";
import {Icon} from "@/core/components/FDIcon/icons";

type FormModel = {
  email: string;
  password: string;
}

defineProps({
  hasError: { type: Boolean },
});

const emit = defineEmits<{
  (
    e: "onSubmit",
    value: {
      email: string;
      password: string;
    },
  );
}>();

const { t } = useI18n();

const schema = Yup.object().shape({
  email: Yup.string().required(t("login.validation.email_required")),
  password: Yup.string().required(t("login.validation.password_required")),
});

function onFormSubmit(formModel: FormModel) {
  emit("onSubmit", formModel);
}

</script>
<template>
  <Form
    class="col-span-1 flex flex-col gap-4 px-10 py-14 min-w-[400px] 3xl:gap-6 3xl:px-16 3xl:py-20"
    :validation-schema="schema"
    @submit="onFormSubmit"
  >
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
    <FDTextInput
      name="email"
      type="email"
      :label="t('login.email')"
      data-testid="emailInput"
    />
    <FDTextInput
      name="password"
      type="password"
      :label="t('login.password')"
      data-testid="passwordInput"
    />
    <FDTypography
      v-if="hasError"
      data-testid="loginErrorText"
      type="pxs"
      class="w-80 text-danger-normal"
    >
      {{ t("login.validation.login_error") }}
    </FDTypography>
    <AppButton
      class="flex-1"
      :icon="Icon.SIGN_IN"
      :label="t('login.login')"
      data-testid="loginButton"
    />
  </Form>
</template>
