<script setup lang="ts">
import FDButton from "@/core/components/FDButton/FDButton.vue";
import FDTypography from "@/core/components/FDTypography/FDTypography.vue";
import FDTextInput from "@/core/components/FDTextInput/FDTextInput.vue";
import {useI18n} from "vue-i18n";

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

</script>
<template>
  <form
    class="flex flex-col col-span-1 gap-4 min-w-[400px] px-10 py-14 3xl:px-16 3xl:py-20 3xl:gap-6"
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
        class="text-primary-500 underline"
      >
        {{ t("register.login_now") }}
      </RouterLink>
    </FDTypography>
    <FDTextInput
      name="email"
      type="email"
      :label="t('register.email')"
    />
    <FDTextInput
      name="username"
      :label="t('register.username')"
    />
    <FDTextInput
      name="password"
      type="password"
      :label="t('register.password')"
    />
    <FDTextInput
      name="passwordRepeat"
      type="password"
      :label="t('register.password_repeat')"
    />
    <FDTypography
      v-if="hasError"
      type="pxs"
      class="text-danger-normal w-80"
    >
      {{ t("register.validation.register_error") }}
    </FDTypography>
    <FDButton
      class="flex-1"
      :label="t('register.register')"
    />
  </form>
</template>
