import {describe, expect, it} from 'vitest'
import {render} from "@/testing/utils/vue-test-utils";
import FDDropDown from './FDDropDown.vue'


describe('FDDropDown', () => {
  it('should not be open initial', () => {
    const wrapper = render(FDDropDown);

    const dropdownItemList = wrapper.find("[data-testid=dropdown-item-list]");
    expect(dropdownItemList.exists()).toBeFalsy();
  })

  it('should be open and contain two items', async () => {
    const wrapper = render(FDDropDown, {
        items: [
          {
            id: "1",
            label: "English",
            value: "en",
          },
          {
            id: "2",
            label: "Deutsch",
            value: "de",
          }
        ],
      }
    );

    const dropdownOpenButton = wrapper.find("[data-testid=dropdown-open-button]");
    await dropdownOpenButton.trigger("click");

    const dropdownItemList = wrapper.find("[data-testid=dropdown-item-list]");
    const itemCount = dropdownItemList.findAll("[data-testid=dropdown-item]").length;

    expect(dropdownItemList.isVisible()).toBeTruthy();
    expect(itemCount).toEqual(2);
  })
})