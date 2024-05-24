<script setup lang="ts">
import {ref, toRef, watch} from "vue";
import {useField} from "vee-validate";
import AppIcon from "@/core/components/AppIcon/AppIcon.vue";
import type {
  AppTextFieldType,
  AppTextFieldProps,
  AppTextFieldVariant
} from "@/core/components/AppTextField/AppTextField.types";

// we are using googles material-design text-fields as foundation, imported here and used as web-components in the template
// @see https://m3.material.io/components/text-fields/specs
// @see https://github.com/material-components/material-web/blob/main/docs/components/text-field.md
import "@material/web/textfield/filled-text-field";
import "@material/web/textfield/outlined-text-field";

const props = withDefaults(defineProps<AppTextFieldProps>(), {
  modelValue: "",
  variant: "outlined",
  label: "",
  placeholder: "",
  type: "text",
  error: false,
  iconPosition: "leading",
  errorText: undefined,
  icon: undefined,
  supportingText: "",
  name: "",
  isRounded: false
});

const emit = defineEmits(["update:modelValue"]);

// because we can validate the field via VeeValidate, we need a second error variable
const hasVeeValidateError = ref(false);

const name = toRef(props, "name");
const {
  value: modelValue,
  errorMessage,
  handleBlur,
  handleChange,
  errors
} = useField(name, undefined, {
  initialValue: props.modelValue,
});

function onInput(e: Event) {
  handleChange(e);
  emit("update:modelValue", (e.target as HTMLInputElement).value as string);
}

/**
 * Function which maps TextField variant to the web-component tag.
 */
function getTextFieldTypeFromVariant(variant: AppTextFieldVariant): AppTextFieldType {
  const textFieldTypesMapping: Record<AppTextFieldVariant, AppTextFieldType> = {
    "outlined": "md-outlined-text-field",
    "filled": "md-filled-text-field"
  };

  return textFieldTypesMapping[variant];
}

/**
 * Whenever VeeValidate updates its array with the 'errors' the field has,
 * we update our _error field.
 */
watch(errors, () => {
  hasVeeValidateError.value = errors.value.length > 0;
});
</script>

<template>
  <component
    :is="getTextFieldTypeFromVariant(variant)"
    :class="{
      'rounded': isRounded,
      'indicator-none': true
    }"
    :label="label"
    :value="modelValue"
    :placeholder="placeholder"
    :type="type"
    :error="hasVeeValidateError || error"
    :error-text="errorText ?? errorMessage"
    :supporting-text="supportingText"
    @input="onInput"
    @blur="handleBlur"
  >
    <AppIcon
      v-if="icon"
      :slot="iconPosition === 'leading' ? 'leading-icon' : 'trailing-icon'"
      :icon="icon"
    />
  </component>
</template>

<style lang="scss">
:root {
  .rounded {
    --text-field-container-shape: 2rem;

    --md-filled-text-field-container-shape: var(--text-field-container-shape);
    --md-outlined-text-field-container-shape: var(--text-field-container-shape);
  }


}

// see @https://github.com/material-components/material-web/blob/main/tokens/_md-comp-filled-text-field.scss
md-filled-text-field {
  // remove the 'focus'/'active'-indicator
  &.indicator-none {
    --md-filled-text-field-active-indicator-height: 0px;
    --md-filled-text-field-disabled-active-indicator-height: 20px;
    --md-filled-text-field-focus-active-indicator-height: 0px;
    --md-filled-text-field-hover-active-indicator-height: 0px;
  }

}
</style>