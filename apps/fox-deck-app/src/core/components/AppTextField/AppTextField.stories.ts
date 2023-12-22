import type {Meta, StoryObj} from "@storybook/vue3";
import AppTextField from "./AppTextField.vue";
import {Icon} from "@/core/components/AppIcon/icons";

const meta = {
  title: "Components/TextField",
  component: AppTextField,
} satisfies Meta<typeof AppTextField>;

export default meta;
type Story = StoryObj<typeof AppTextField>;

export const Filled: Story = {
  args: {
    variant: "filled",
    modelValue: "john.doe@google.com",
    icon: Icon.CHECK,
    supportingText: "The e-mail of your account.",
  }
};

export const Outlined: Story = {
  args: {
    variant: "outlined",
    placeholder: "Search",
    icon: Icon.SEARCH
  }
};

export const FilledError: Story = {
  args: {
    variant: "outlined",
    modelValue: "john.doegoogle.com",
    icon: Icon.X,
    error: true,
    errorText: "E-Mail is not valid."
  }
};


