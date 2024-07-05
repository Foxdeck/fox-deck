import type {Meta, StoryObj} from "@storybook/vue3";


import type {AppButtonSeverity, AppButtonVariant, AppButtonWidth} from "@/core/components/AppButton/AppButton.types";
import AppButton from "@/core/components/AppButton/AppButton.vue";
import {iconOptions} from "@/stories/helper/arg-types-options";

const variantOptions: AppButtonVariant[] = ["tonal", "outlined", "text"];
const severityOptions: AppButtonSeverity[] = ["primary", "danger"];
const widthOptions: AppButtonWidth[] = ["full", "block"];


const meta = {
  title: "Components/Button",
  component: AppButton,
  tags: ["autodocs"],
  argTypes: {
    icon: {
      options: iconOptions,
      control: {type: "select"},
    },
    variant: {
      options: variantOptions,
      control: {type: "radio"},
    },
    label: {control: "text"},
    severity: {
      options: severityOptions,
      control: {type: "radio"},
    },
    width: {
      options: widthOptions,
      control: {type: "select"}
    },
    isLoading: {
      options: [true, false],
      control: {type: "radio"}
    }
  },
} satisfies Meta<typeof AppButton>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Primary: Story = {
  args: {
    label: "Primary",
    variant: "tonal",
    width: "block",
    severity: "primary",
  },
};

export const Outlined: Story = {
  args: {
    label: "Outlined",
    variant: "outlined",
  },
};

export const Loading: Story = {
  args: {
    label: "Saving...",
    isLoading: true
  },
};