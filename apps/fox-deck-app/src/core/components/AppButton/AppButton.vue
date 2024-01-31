<script setup lang="ts">
import type {AppButtonProps} from "@/core/components/AppButton/AppButton.types";
import AppIcon from "@/core/components/AppIcon/AppIcon.vue";

// we are using vuetify buttons as foundation:
// @see https://vuetifyjs.com/en/components/buttons

withDefaults(defineProps<AppButtonProps>(), {
  variant: "tonal",
  block: false,
});

</script>
<template>
  <v-btn
    data-testid="button"
    class="text-none"
    :block="block"
    :variant="variant"
    :rounded="rounded as string"
  >
    <span class="flex gap-2">
      <AppIcon
        v-if="icon"
        data-testid="button-icon"
        :icon="icon"
      />
      <span
        v-if="label"
        data-testid="button-label"
      >
        {{ label }}
      </span>
    </span>
  </v-btn>
  <!--    <component :is="getButtonTypeFromVariant(variant)">-->
  <!--      <span-->
  <!--        class="flex gap-2 p-2"-->
  <!--      >-->
  <!--        <AppIcon-->
  <!--          v-if="icon"-->
  <!--          data-testid="button-icon"-->
  <!--          :icon="icon"-->
  <!--        />-->
  <!--        <span-->
  <!--          v-if="label"-->
  <!--          data-testid="button-label"-->
  <!--        >{{ label }}</span>-->
  <!--      </span>-->
  <!--    </component>-->
</template>
