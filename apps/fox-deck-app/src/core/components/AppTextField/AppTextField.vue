<script setup lang="ts">
import {toRef} from "vue";
import {useField} from "vee-validate";
import "@material/web/textfield/filled-text-field";
import "@material/web/textfield/outlined-text-field";
import {Icon} from "@/core/components/AppIcon/icons";
import AppIcon from "@/core/components/AppIcon/AppIcon.vue";

type AppTextFieldType = "text" | "email" | "number" | "password" | "search" | "tel" | "url" | "textarea";
type AppTextFieldVariant = "filled" | "outlined";
type AppTextFieldIconPosition = "leading" | "trailing";

export type AppTextFieldProps = {
  modelValue?: string;
  readonly variant?: AppTextFieldVariant;
  readonly label?: string;
  readonly placeholder?: string;
  readonly type?: AppTextFieldType;
  readonly error?: boolean;
  readonly errorText?: string;
  readonly icon?: Icon;
  readonly iconPosition?: AppTextFieldIconPosition
  readonly supportingText?: string;
  readonly name?: string;
}

const props = withDefaults(defineProps<AppTextFieldProps>(), {
  modelValue: "",
  variant: "outlined",
  label: "",
  placeholder: "",
  type: "text",
  error: true,
  iconPosition: "leading",
  errorText: "",
  icon: undefined,
  supportingText: "",
  name: ""
});

const emit = defineEmits(["update:modelValue"]);

const name = toRef(props, "name");
const {
  value: modelValue,
  errorMessage: errorText,
  handleBlur,
  handleChange,
} = useField(name, undefined, {
  initialValue: props.modelValue,
});

function onInput(e: Event) {
  handleChange(e);
  emit("update:modelValue", (e.target as HTMLInputElement).value as string);
}
</script>

<template>
  <md-filled-text-field
    v-if="variant == 'filled'"
    :label="label"
    :value="modelValue"
    :placeholder="placeholder"
    :type="type"
    :error="error"
    :error-text="error || errorText"
    :supporting-text="supportingText"
    @input="onInput"
    @blur="handleBlur"
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
    :error="error || errorText"
    :error-text="errorText"
    :supporting-text="supportingText"
    @input="onInput"
    @blur="handleBlur"
  >
    <AppIcon
      v-if="icon"
      :slot="iconPosition === 'leading' ? 'leading-icon' : 'trailing-icon'"
      :icon="icon"
    />
  </md-outlined-text-field>
</template>