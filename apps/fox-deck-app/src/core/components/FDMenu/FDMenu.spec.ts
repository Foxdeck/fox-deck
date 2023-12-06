import {describe, expect, it} from 'vitest'
import {render} from "@/testing/utils/vue-test-utils";
import FDActionMenu from "@/core/components/FDMenu/FDActionMenu.vue";

describe('FDActionMenu', () => {
  it('should render the items', async () => {
    const actionItems = [
      {
        id: "edit",
        label: "edit",
        icon: "edit",
        action: () => {},
        severity: "primary"
      },
      {
        id: "delete",
        label: "delete",
        icon: "trash",
        action: () => {},
        severity: "danger"
      }
    ];
    const wrapper = render(FDActionMenu, {
        actionItems
      }
    );

    // open the action-menu
    const actionMenuButton = wrapper.find("[data-testid=action-menu-button]");
    await actionMenuButton.trigger("click");

    // look for the menu-items
    const actionMenuItems = wrapper.findAll("[data-testid=action-menu-item]");

    // we want to check if the menu has two items, with each item containing the correct text
    expect(actionMenuItems.length).toEqual(2);
    actionMenuItems.forEach((item, index) => {
      expect(item.text()).toEqual(actionItems[index].label);
    })
  })
})