<script setup lang="ts">
import {Icon} from "@/core/components/AppIcon/icons";
import AppIcon from "@/core/components/AppIcon/AppIcon.vue";

// we are using googles material-design buttons as foundation, imported here and used as web-components in the template
// @see https://m3.material.io/components/buttons/specs
// @see https://github.com/material-components/material-web/blob/main/docs/components/button.md
import "@material/web/button/text-button.js";
import "@material/web/button/filled-tonal-button.js";
import "@material/web/button/outlined-button.js";

/**
 * The button types are the material-design buttons, which can be used.
 * The string matches the web-component's html tag.
 *
 * @example
 * <!-- material filled tonal button -->
 * <md-filled-tonal-button></md-filled-tonal-button>
 * <!-- material outlined button -->
 * <md-outlined-button></md-outlined-button>
 * <!-- material text button -->
 * <md-text-button></md-text-button>
 */
type AppButtonType = "md-filled-tonal-button" | "md-outlined-button" | "md-text-button";

/**
 * The variants can be used to define, which kind of buttons the application supports.
 */
type AppButtonVariant = "tonal" | "outlined" | "text";

/**
 * Defines the width of the button.
 *
 @property {"block"} block - The button takes up the minimum width required to display its content.
 @property {"full"} full - The button expands to take up the full width of its container.
 */
type AppButtonWidth = "block" | "full";


/**
 * Property definitions of the button.
 */
type AppButtonProps = {
  label?: string;
  icon?: Icon;
  variant?: AppButtonVariant;
  width?: AppButtonWidth;
}

const props = withDefaults(defineProps<AppButtonProps>(), {
  variant: "tonal",
  width: "block"
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
    <component :is="getButtonTypeFromVariant(variant)">
      <span
        class="flex gap-2 p-2 primary-text"
      >
        <AppIcon
          v-if="icon"
          :icon="icon"
        />
        {{ label }}
      </span>
    </component>
  </div>
</template>
