<script setup lang="ts">
import {Icon} from "@/core/components/FDIcon/icons";
import FDIcon from "@/core/components/FDIcon/FDIcon.vue";

import "@material/web/button/text-button.js";
import "@material/web/button/filled-tonal-button.js";
import "@material/web/button/outlined-button.js";

type AppButtonVariant = "tonal" | "outlined" | "text";
type AppButtonWidth = "block" | "full";

type AppButtonProps = {
  label?: string;
  icon?: Icon;
  variant?: AppButtonVariant;
  width?: AppButtonWidth;
}

withDefaults(defineProps<AppButtonProps>(), {
  variant: "tonal",
  width: "block"
});
</script>
<template>
  <div
    :class="{
      'flex flex-col': width === 'full'
    }"
  >
    <md-filled-tonal-button
      v-if="variant === 'tonal'"
    >
      <span
        class="flex gap-2 p-2 primary-text"
      >
        <FDIcon
          v-if="icon"
          :icon="icon"
        />
        {{ label }}
      </span>
    </md-filled-tonal-button>
    <md-outlined-button
      v-if="variant === 'outlined'"
    >
      <span
        class="flex gap-2 p-2 primary-text"
      >
        <FDIcon
          v-if="icon"
          :icon="icon"
        />
        {{ label }}
      </span>
    </md-outlined-button>
    <md-text-button
      v-if="variant === 'text'"
    >
      <span
        class="flex gap-2 p-2 primary-text"
      >
        <FDIcon
          v-if="icon"
          :icon="icon"
        />
        {{ label }}
      </span>
    </md-text-button>
  </div>
</template>
