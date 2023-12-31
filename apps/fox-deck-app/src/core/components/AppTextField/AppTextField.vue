<script setup lang="ts">
import "@material/web/textfield/filled-text-field";
import "@material/web/textfield/outlined-text-field";
import {Icon} from "@/core/components/AppIcon/icons";
import AppIcon from "@/core/components/AppIcon/AppIcon.vue";

type AppTextFieldType = "text" | "email" | "number" | "password" | "search" | "tel" | "url" | "textarea";
type AppTextFieldVariant = "filled" | "outlined";
type AppTextFieldIconPosition = "leading" | "trailing";

export type AppTextFieldProps = {
  modelValue: string;
  variant?: AppTextFieldVariant;
  label?: string;
  placeholder?: string;
  type?: AppTextFieldType;
  error?: boolean;
  errorText?: string;
  icon?: Icon;
  iconPosition?: AppTextFieldIconPosition
  supportingText?: string;
}

withDefaults(defineProps<AppTextFieldProps>(), {
  variant: "outlined",
  label: "",
  placeholder: "",
  type: "text",
  error: false,
  iconPosition: "leading",
  errorText: "",
  icon: undefined,
  supportingText: ""
});

defineEmits(["update:modelValue"]);
</script>

<template>
  <md-filled-text-field
    v-if="variant == 'filled'"
    :label="label"
    :value="modelValue"
    :placeholder="placeholder"
    :type="type"
    :error="error"
    :error-text="errorText"
    :supporting-text="supportingText"
    @input="$emit('update:modelValue', $event.target.value)"
  >
    <AppIcon
      v-if="icon"
      :slot="iconPosition === 'leading' ? 'leading-icon' : 'trailing-icon'"
      :icon="icon"
    />
  </md-filled-text-field>
  <md-outlined-text-field
    v-if="variant == 'outlined'"
    :label="label"
    :value="modelValue"
    :placeholder="placeholder"
    :type="type"
    :error="error"
    :error-text="errorText"
    :supporting-text="supportingText"
    @input="$emit('update:modelValue', $event.target.value)"
  >
    <AppIcon
      v-if="icon"
      :slot="iconPosition === 'leading' ? 'leading-icon' : 'trailing-icon'"
      :icon="icon"
    />
  </md-outlined-text-field>
</template>