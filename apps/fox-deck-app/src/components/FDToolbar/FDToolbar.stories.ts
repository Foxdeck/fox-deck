import type { Meta, StoryObj } from "@storybook/vue3";
import FDToolbar from "./FDToolbar.vue";

const meta = {
  title: "Toolbar",
  component: FDToolbar,
} satisfies Meta<typeof FDToolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
