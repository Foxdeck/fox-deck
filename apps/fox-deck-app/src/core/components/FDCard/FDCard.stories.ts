import type {Meta, StoryObj} from "@storybook/vue3";
import FDCard from "./FDCard.vue";

const meta = {
  title: "Components/Cards",
  component: FDCard,
  parameters: {
    slots: {
      header: {
        description: "Header",
        template: "<span>Card Title</span>"
      },
      body: {
        description: "Body",
        template: "<article class='text-sm'>This is the body of the card.</article>"
      }
    }
  }
} satisfies Meta<typeof FDCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {

};