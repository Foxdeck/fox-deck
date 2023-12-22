import type {Meta, StoryObj} from "@storybook/vue3";
import AppButton from "./AppButton.vue";
import {Icon} from "@/core/components/AppIcon/icons";

const meta = {
  title: "Components/Buttons",
  component: AppButton,
} satisfies Meta<typeof AppButton>;

export default meta;
type Story = StoryObj<typeof AppButton>;

export const Tonal: Story = {
  args: {
    label: "Home",
    icon: Icon.HOME
  }
};

export const Outlined: Story = {
  args: {
    variant: "outlined",
    label: "Settings",
    icon: Icon.SETTINGS
  }
};

export const Text: Story = {
  args: {
    variant: "text",
    label: "Back",
    icon: Icon.CHEVRON_LEFT
  }
};