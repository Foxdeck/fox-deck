<script setup lang="ts">
import {Form} from "vee-validate";
import FDButton from "@/core/components/FDButton/FDButton.vue";
import FDTypography from "@/core/components/FDTypography/FDTypography.vue";
import FDTextInput from "@/core/components/FDTextInput/FDTextInput.vue";
import * as Yup from "yup";
import {useI18n} from "vue-i18n";

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
    class="flex flex-col col-span-1 gap-4 min-w-[400px] px-10 py-14 3xl:px-16 3xl:py-20 3xl:gap-6"
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
        class="text-primary-500 underline"
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
      class="text-danger-normal w-80"
    >
      {{ t("login.validation.login_error") }}
    </FDTypography>
    <FDButton
      class="flex-1"
      :label="t('login.login')"
      data-testid="loginButton"
    />
  </Form>
</template>
