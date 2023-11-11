import type { Meta, StoryObj } from "@storybook/vue3";
import FDButton from "./FDButton.vue";

export default {
  title: "Buttons",
  component: FDButton,
  argTypes: {
    color: {
      control: "select",
      options: ["primary", "danger", "warn", "success"],
    },
  },
  args: { label: "Button", isRounded: true },
} satisfies Meta<typeof FDButton>;

export const Primary: StoryObj = {
  args: {
    icon: "home",
  },
};

export const PrimarySuccess: StoryObj = {
  args: {
    severity: "success",
    icon: "plus",
  },
};

export const PrimaryDanger: StoryObj = {
  args: {
    severity: "danger",
    icon: "trash",
  },
};

export const PrimaryWarn: StoryObj = {
  args: {
    severity: "warn",
    icon: "info",
  },
};

export const Secondary: StoryObj = {
  args: {
    type: "secondary",
    icon: "home",
  },
};

export const SecondarySuccess: StoryObj = {
  args: {
    type: "secondary",
    severity: "success",
    icon: "plus",
  },
};

export const SecondaryDanger: StoryObj = {
  args: {
    type: "secondary",
    severity: "danger",
    icon: "trash",
  },
};

export const SecondaryWarn: StoryObj = {
  args: {
    type: "secondary",
    severity: "warn",
    icon: "info",
  },
};
