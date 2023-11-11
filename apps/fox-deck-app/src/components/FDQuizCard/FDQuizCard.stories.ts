import type { Meta, StoryObj } from "@storybook/vue3";
import FDQuizCard from "./FDQuizCard.vue";

const meta = {
  title: "Cards/QuizCard",
  component: FDQuizCard,
  args: {
    question: "What is yellow and hot?",
    solution:
      "The sun is the hottest planet in our Universe. It is really bright and hot.",
  },
} satisfies Meta<typeof FDQuizCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const PrimaryWithSolution: Story = {
  args: {
    isSolutionVisible: true,
  },
};
