import type {Meta, StoryObj} from '@storybook/vue3';
import AppTreeView from "@/core/components/AppTreeView/AppTreeView.vue";
import type {AppTreeViewItemProps} from "@/core/components/AppTreeViewItem/AppTreeViewItem.types";

const meta = {
    title: "Components/TreeView",
    component: AppTreeView,
    tags: ["autodocs"],
    argTypes: {
        isLoading: {
            options: [true, false],
            control: {type: "radio"}
        },
    },
} satisfies Meta<typeof AppTreeView>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Primary: Story = {
    args: {
        items: [
            {
                isSelected: true,
                identifier: '1',
                label: 'Parent 1',
                type: "folder",
                children: [
                    {
                        identifier: '1_1',
                        label: 'Child 1.1',
                        type: "note"
                    },
                    {
                        identifier: '1_2',
                        label: 'Child 1.2',
                        type: "note"
                    }
                ]
            },
            {
                identifier: '2',
                label: 'Parent 2',
                type: "folder",
                children: [
                    {
                        identifier: '2_1',
                        label: 'Child 2.1',
                        type: "folder"
                    },
                    {
                        identifier: '2_2',
                        label: 'Child 2.2',
                        type: "note"
                    }
                ]
            }
        ]satisfies AppTreeViewItemProps[]
    }
};