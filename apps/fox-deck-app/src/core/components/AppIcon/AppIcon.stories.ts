import type {Meta, StoryObj} from "@storybook/vue3";

import AppIcon from "@/core/components/AppIcon/AppIcon.vue";
import {Icon} from "@/core/components/AppIcon/icons";
import {iconOptions} from "@/stories/helper/arg-types-options";


const meta = {
  title: "Components/Icon",
  component: AppIcon,
  argTypes: {
    icon: {
      options: iconOptions,
      control: { type: "select" },
    },
    spinning: {
      options: [true, false],
      control: { type: "radio" },
    },
  }
} satisfies Meta<typeof AppIcon>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    icon: Icon.HOME,
  },
};

export const Loading: Story = {
  args: {
    icon: Icon.SPINNER,
    spinning: true,
  },
};