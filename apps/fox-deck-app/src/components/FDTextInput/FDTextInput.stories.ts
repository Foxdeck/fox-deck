import type { Meta, StoryObj } from "@storybook/vue3";
import FDTextInput from "./FDTextInput.vue";

const meta = {
  title: "Inputs",
  component: FDTextInput,
  args: { label: "E-Mail", isRounded: true, disabled: false },
} satisfies Meta<typeof FDTextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const PrimaryNotRounded: Story = {
  args: {
    label: "Password",
    isRounded: false,
    value: "Foo",
  },
};

export const PrimaryDisabled: Story = {
  args: {
    label: "Disabled",
    disabled: true,
  },
};

export const PrimarySuccess: Story = {
  args: {
    value: "test@google.de",
    isValid: true,
    isTouched: true,
  },
};

export const PrimaryDanger: Story = {
  args: {
    value: "test@google",
    isValid: false,
    isTouched: true,
    errorMessage: "Your mail is not valid. Please check your mail.",
  },
};
