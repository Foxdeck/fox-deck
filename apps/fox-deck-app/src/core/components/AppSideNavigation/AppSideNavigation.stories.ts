import type {Meta, StoryObj} from "@storybook/vue3";

import AppSideNavigation from "@/core/components/AppSideNavigation/AppSideNavigation.vue";

const meta = {
  title: "Components/SideNavigation",
  component: AppSideNavigation,
  tags: ["autodocs"],
  argTypes: {
    isExpanded: {
      options: [true, false],
      control: { type: "radio" },
    },
    isLightTheme: {
      options: [true, false],
      control: { type: "radio" },
    },
  },
} satisfies Meta<typeof AppSideNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    isExpanded: true,
    isLightTheme: true
  }
};