import type { Meta, StoryObj } from "@storybook/vue3";
import FDDropDown from "@/core/components/FDDropDown/FDDropDown.vue";
import type { FDDropdownItem } from "@/core/components/FDDropDown/FDDropDown.types";

const items: FDDropdownItem[] = [
  {
    id: "de",
    label: "Deutsch",
    value: "de-DE",
  },
  {
    id: "en",
    label: "English",
    value: "en-EN",
  },
];

export default {
  title: "DropDown",
  component: FDDropDown,
  args: { items, selectedItemId: items[0], isOpen: false },
} satisfies Meta<typeof FDDropDown>;

export const Default: StoryObj = {};
export const Open: StoryObj = {
  args: {
    isOpen: true,
  },
};
