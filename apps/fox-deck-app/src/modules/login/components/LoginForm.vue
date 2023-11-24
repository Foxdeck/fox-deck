<script setup lang="ts">
import {Form} from "vee-validate";
import FDButton from "@/core/components/FDButton/FDButton.vue";
import FDTypography from "@/core/components/FDTypography/FDTypography.vue";
import FDTextInput from "@/core/components/FDTextInput/FDTextInput.vue";
import * as Yup from "yup";

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

const schema = Yup.object().shape({
  email: Yup.string().required("Bitte gib deine E-Mail ein"),
  password: Yup.string().required("Bitte gib dein Passwort ein"),
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
      Anmelden
    </FDTypography>
    <FDTypography
      type="pxs"
      class="text-sm"
    >
      Neuer Nutzer?
      <RouterLink
        to="register"
        class="text-primary-500 underline"
      >
        Account erstellen
      </RouterLink>
    </FDTypography>
    <FDTextInput
      label="E-Mail"
      name="email"
      type="email"
      data-testid="emailInput"
    />
    <FDTextInput
      label="Password"
      name="password"
      type="password"
      data-testid="passwordInput"
    />
    <FDTypography
      v-if="hasError"
      data-testid="loginErrorText"
      type="pxs"
      class="text-danger-normal w-80"
    >
      Login fehlgeschlagen! Bitte prüfen Sie Ihre E-Mail und Ihr Passwort.
    </FDTypography>
    <FDButton
      class="flex-1"
      label="Anmelden"
      data-testid="loginButton"
    />
  </Form>
</template>
