import type { Meta, StoryObj } from "@storybook/vue3";
import FDSideNavigation from "./FDSideNavigation.vue";

export default {
  title: "Navigation/SideNavigation",
  component: FDSideNavigation,
} satisfies Meta<typeof FDSideNavigation>;

export const Primary: StoryObj = {
  args: {
    icon: "home",
  },
};
