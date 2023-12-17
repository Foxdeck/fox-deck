<script setup lang="ts">
import {ref} from "vue";
import {useI18n} from "vue-i18n";
import FDTypography from "@/core/components/FDTypography/FDTypography.vue";
import FDTextInput from "@/core/components/FDTextInput/FDTextInput.vue";
import AppButton from "@/core/components/AppButton/AppButton.vue";

defineProps({
  hasError: { type: Boolean },
});

defineEmits<{
  (
    e: "onSubmit",
    value: {
      email: string;
      username: string;
      password: string;
    },
  );
}>();

const { t } = useI18n();

const email = ref("");
const username = ref("");
const password = ref("");
const passwordRepeat = ref("");
</script>
<template>
  <form
    class="col-span-1 flex flex-col gap-4 px-10 py-14 min-w-[400px] 3xl:gap-6 3xl:px-16 3xl:py-20"
    @submit.prevent="$emit('onSubmit', { email, password, username })"
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
      name="email"
      type="email"
      :value="email"
      :label="t('register.email')"
      @on-input="email = $event"
    />
    <FDTextInput
      name="username"
      :label="t('register.username')"
      :value="username"
      @on-input="username = $event"
    />
    <FDTextInput
      name="password"
      type="password"
      :label="t('register.password')"
      :value="password"
      @on-input="password = $event"
    />
    <FDTextInput
      name="passwordRepeat"
      type="password"
      :label="t('register.password_repeat')"
      :value="passwordRepeat"
      @on-input="passwordRepeat = $event"
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
