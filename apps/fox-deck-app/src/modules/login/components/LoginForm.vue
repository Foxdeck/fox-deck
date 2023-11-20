<script setup lang="ts">
import FDButton from "../../../components/FDButton/FDButton.vue";
import FDTypography from "../../../components/FDTypography/FDTypography.vue";
import FDTextInput from "../../../components/FDTextInput/FDTextInput.vue";
import { ref } from "vue";

defineProps({
  hasError: { type: Boolean },
});

defineEmits<{
  (
    e: "onSubmit",
    value: {
      email: string;
      password: string;
    }
  );
}>();

const email = ref();
const password = ref();
</script>
<template>
  <form
    class="flex flex-col col-span-1 gap-4 min-w-[400px] px-10 py-14 3xl:px-16 3xl:py-20 3xl:gap-6"
    @submit.prevent="$emit('onSubmit', { email, password })"
  >
    <FDTypography type="h1" class="pb-6">Anmelden</FDTypography>
    <FDTypography type="pxs" class="text-sm">
      Neuer Nutzer?
      <RouterLink to="register" class="text-primary-500 underline">
        Account erstellen
      </RouterLink>
    </FDTypography>
    <FDTextInput
      label="E-Mail"
      type="email"
      :value="email"
      @onInput="email = $event"
    />
    <FDTextInput
      label="Password"
      type="password"
      :value="password"
      @onInput="password = $event"
    />
    <FDTypography v-if="hasError" type="pxs" class="text-danger-normal w-80">
      Login fehlgeschlagen! Bitte prüfen Sie Ihre E-Mail und Ihr Passwort.
    </FDTypography>
    <FDButton class="flex-1" label="Anmelden" />
  </form>
</template>
