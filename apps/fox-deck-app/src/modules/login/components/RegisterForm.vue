<script setup lang="ts">
import FDButton from "@/core/components/FDButton/FDButton.vue";
import FDTypography from "@/core/components/FDTypography/FDTypography.vue";
import FDTextInput from "@/core/components/FDTextInput/FDTextInput.vue";
import { ref } from "vue";

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

const email = ref();
const username = ref();
const password = ref();
const passwordRepeat = ref();
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
      Registrieren
    </FDTypography>
    <FDTypography
      type="pxs"
      class="text-sm"
    >
      Schon einen Account?
      <RouterLink
        to="login"
        class="text-primary-500 underline"
      >
        Jetzt Anmelden
      </RouterLink>
    </FDTypography>
    <FDTextInput
      label="E-Mail"
      type="email"
      :value="email"
      @on-input="email = $event"
    />
    <FDTextInput
      label="Benutzername"
      :value="username"
      @on-input="username = $event"
    />
    <FDTextInput
      label="Passwort"
      type="password"
      :value="password"
      @on-input="password = $event"
    />
    <FDTextInput
      label="Passwort Wiederholen"
      type="password"
      :value="passwordRepeat"
      @on-input="passwordRepeat = $event"
    />
    <FDTypography
      v-if="hasError"
      type="pxs"
      class="text-danger-normal w-80"
    >
      Registrierung fehlgeschlagen!
    </FDTypography>
    <FDButton
      class="flex-1"
      label="Registrieren"
    />
  </form>
</template>
