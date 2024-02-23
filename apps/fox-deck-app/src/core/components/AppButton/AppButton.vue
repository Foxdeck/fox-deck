<script setup lang="ts">
import AppIcon from "@/core/components/AppIcon/AppIcon.vue";
import type {AppButtonProps, AppButtonType, AppButtonVariant} from "@/core/components/AppButton/AppButton.types";

// we are using googles material-design buttons as foundation, imported here and used as web-components in the template
// @see https://m3.material.io/components/buttons/specs
// @see https://github.com/material-components/material-web/blob/main/docs/components/button.md
import "@material/web/button/text-button.js";
import "@material/web/button/filled-tonal-button.js";
import "@material/web/button/outlined-button.js";

withDefaults(defineProps<AppButtonProps>(), {
  variant: "tonal",
  width: "block",
  severity: "primary"
});

/**
 * Function which maps button variant to the web-component tag.
 */
function getButtonTypeFromVariant(variant: AppButtonVariant): AppButtonType {
  const buttonTypesMapping: Record<AppButtonVariant, AppButtonType> = {
    "tonal": "md-filled-tonal-button",
    "outlined": "md-outlined-button",
    "text": "md-text-button"
  };

  return buttonTypesMapping[variant];
}
</script>
<template>
  <div
    :class="{
      'flex flex-col': width === 'full'
    }"
  >
    <component
      :is="getButtonTypeFromVariant(variant)"
      :class="{
        danger: severity === 'danger'
      }"
    >
      <span
        class="flex gap-2 p-2"
      >
        <AppIcon
          v-if="icon"
          data-testid="button-icon"
          :icon="icon"
        />
        <span
          v-if="label"
          data-testid="button-label"
        >{{ label }}</span>
      </span>
    </component>
  </div>
</template>

<style scoped lang="scss">
md-filled-tonal-button {
  &.danger {
    --md-sys-color-secondary-container: var(--md-sys-color-error);
    --md-sys-color-on-secondary-container: var(--md-sys-color-on-error);
  }
}

md-outlined-button {
  &.danger {
    --md-sys-color-primary: var(--md-sys-color-error);
    --md-sys-color-outline: var(--md-sys-color-error);
  }
}

md-text-button {
  &.danger {
    --md-sys-color-primary: var(--md-sys-color-error);
  }
}

</style>
