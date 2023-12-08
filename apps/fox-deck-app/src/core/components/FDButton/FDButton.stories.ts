import type {Meta, StoryObj} from "@storybook/vue3";
import FDButton from "./FDButton.vue";

export default {
  title: "Components/Buttons",
  component: FDButton,
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "danger", "warn", "success"],
    },
  },
  args: { label: "Button" },
} satisfies Meta<typeof FDButton>;

// primary buttons
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

// secondary buttons
export const Secondary: StoryObj = {
  args: {
    variant: "secondary",
    icon: "home",
  },
};

export const SecondarySuccess: StoryObj = {
  args: {
    variant: "secondary",
    severity: "success",
    icon: "plus",
  },
};

export const SecondaryDanger: StoryObj = {
  args: {
    variant: "secondary",
    severity: "danger",
    icon: "trash",
  },
};

export const SecondaryWarn: StoryObj = {
  args: {
    variant: "secondary",
    severity: "warn",
    icon: "info",
  },
};

// text buttons
export const Text: StoryObj = {
  args: {
    variant: "text",
    icon: "home",
  },
};

export const TextSuccess: StoryObj = {
  args: {
    variant: "text",
    severity: "success",
    icon: "plus",
  },
};

export const TextDanger: StoryObj = {
  args: {
    variant: "text",
    severity: "danger",
    icon: "trash",
  },
};

export const TextWarn: StoryObj = {
  args: {
    variant: "text",
    severity: "warn",
    icon: "info",
  },
};
