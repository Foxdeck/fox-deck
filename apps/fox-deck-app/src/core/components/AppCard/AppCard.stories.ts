import type {Meta, StoryObj} from "@storybook/vue3";
import AppCard from "./AppCard.vue";
import {Icon} from "@/core/components/AppIcon/icons";

const meta = {
  title: "Components/AppCards",
  component: AppCard,
} satisfies Meta<typeof AppCard>;

export default meta;
type Story = StoryObj<typeof AppCard>;

export const Default: Story = {
  args: {
    headline: "Glass Souls´ World Tour",
    subhead: "The best Tour of the World!",
    supportingText: "From your recent favorites.",
    imageUrl: "https://images.unsplash.com/photo-1533109721025-d1ae7ee7c1e1?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageAlt: "Glass Souls´ World Tour",
    actions: [
      {
        label: "Settings",
        icon: Icon.SETTINGS,
        variant: "outlined"
      },
      {
        label: "Home",
        icon: Icon.HOME
      }
    ]
  }
};