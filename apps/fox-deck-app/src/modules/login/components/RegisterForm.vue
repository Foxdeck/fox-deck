<script setup lang="ts">
import FDButton from "@/core/components/FDButton/FDButton.vue";
import FDTypography from "@/core/components/FDTypography/FDTypography.vue";
import FDTextInput from "@/core/components/FDTextInput/FDTextInput.vue";

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
        name="email"
      label="E-Mail"
      type="email"
    />
    <FDTextInput
        name="username"
      label="Benutzername"
    />
    <FDTextInput
        name="password"
      label="Passwort"
      type="password"
    />
    <FDTextInput
        name="passwordRepeat"
      label="Passwort Wiederholen"
      type="password"
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
