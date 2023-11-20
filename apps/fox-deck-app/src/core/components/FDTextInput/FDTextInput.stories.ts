import type { Meta, StoryObj } from "@storybook/vue3";
import FDTextInput from "./FDTextInput.vue";

export default {
  title: "Inputs",
  component: FDTextInput,
  args: { label: "E-Mail", disabled: false },
} satisfies Meta<typeof FDTextInput>;

export const Default: StoryObj = {};

export const Disabled: StoryObj = {
  args: {
    label: "Disabled",
    disabled: true,
  },
};

export const Success: StoryObj = {
  args: {
    value: "test@google.de",
    isValid: true,
    shouldValidate: true,
    successMessage: "E-Mail is correct",
  },
};

export const Danger: StoryObj = {
  args: {
    value: "test@google",
    isValid: false,
    shouldValidate: true,
    icon: "mail",
    errorMessage: "Your mail is not valid. Please check your mail.",
  },
};
