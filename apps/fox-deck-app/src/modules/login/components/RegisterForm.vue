<script setup lang="ts">
import {defineEmits} from "vue";
import {useField, useForm} from "vee-validate";
import {registrationSchema} from "@/core/components/validation";
import {useI18n} from "vue-i18n";
import FDTypography from "@/core/components/FDTypography/FDTypography.vue";
import FDTextInput from "@/core/components/FDTextInput/FDTextInput.vue";
import AppButton from "@/core/components/AppButton/AppButton.vue";

defineProps({
  hasError: { type: Boolean },
});

const emit = defineEmits<{
  (e: "onSubmit", value: { email: string; username: string; password: string }): void;
}>();

const { t } = useI18n();

// VeeValidate setup
const { handleSubmit, formState } = useForm({
  validationSchema: registrationSchema
});

const { value: email, errorMessage: emailError } = useField("email");
const { value: username, errorMessage: usernameError } = useField("username");
const { value: password, errorMessage: passwordError } = useField("password");
const { value: passwordRepeat, errorMessage: passwordRepeatError } = useField("passwordRepeat");

const onSubmit = handleSubmit((values: any) => {
  emit("onSubmit", values);
});
</script>

<template>
  <form
    class="col-span-1 flex flex-col gap-4 px-10 py-14 min-w-[400px] 3xl:gap-6 3xl:px-16 3xl:py-20"
    @submit.prevent="onSubmit"
  >
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
    <FDTextInput
      v-model="email.value"
      name="email"
      type="email"
      :error="emailError"
      :label="t('register.email')"
    />
    <FDTextInput
      v-model="username.value"
      name="username"
      :error="usernameError"
      :label="t('register.username')"
    />
    <FDTextInput
      v-model="password.value"
      name="password"
      type="password"
      :error="passwordError"
      :label="t('register.password')"
    />
    <FDTextInput
      v-model="passwordRepeat.value"
      name="passwordRepeat"
      type="password"
      :error="passwordRepeatError"
      :label="t('register.password_repeat')"
    />
    <FDTypography
      v-if="hasError"
      type="pxs"
      class="w-80 text-danger-normal"
    >
      {{ t("register.validation.register_error") }}
    </FDTypography>
    <AppButton
      class="flex-1"
      :label="t('register.register')"
    />
  </form>
</template>
