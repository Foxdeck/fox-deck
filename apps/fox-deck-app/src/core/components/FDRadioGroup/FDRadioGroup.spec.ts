import {describe, expect, it} from 'vitest'
import FDRadioGroup from './FDRadioGroup.vue'
import {render} from "@/testing/utils/vue-test-utils";

describe('FDRadioGroup', () => {
  it('should select the first element correctly', () => {
    const items = [
      {
        id: "1",
        label: "Dark",
        text: "Activate dark mode",
        value: "dark"
      },
      {
        id: "2",
        label: "Light",
        text: "Activate light mode",
        value: "light"
      }
    ];
    const selectedItemId = "1";
    const wrapper = render(FDRadioGroup, {
        name: "my-group",
        items,
        selectedItemId
      }
    );

    const radioGroupItems = wrapper.findAll("[data-testid=radio-group-item]");
    const firstRadioGroup = radioGroupItems[0];
    const firstRadioGroupInput = firstRadioGroup.find("[data-testid=radio-group-item-input]").element as HTMLInputElement;
    const firstRadioGroupLabel = firstRadioGroup.find("[data-testid=radio-group-item-label]");
    const firstRadioGroupText = firstRadioGroup.find("[data-testid=radio-group-item-text]");
    const firstRadioGroupIcon = firstRadioGroup.find("[data-testid=radio-group-item-icon]");

    const secondRadioGroup = radioGroupItems[1];
    const secondRadioGroupInput = secondRadioGroup.find("[data-testid=radio-group-item-input]").element as HTMLInputElement;
    const secondRadioGroupLabel = secondRadioGroup.find("[data-testid=radio-group-item-label]");
    const secondRadioGroupText = secondRadioGroup.find("[data-testid=radio-group-item-text]");
    const secondRadioGroupIcon = secondRadioGroup.find("[data-testid=radio-group-item-icon]");

    expect(firstRadioGroupInput.checked).toBeTruthy();
    expect(firstRadioGroupLabel.text()).toEqual("Dark");
    expect(firstRadioGroupText.text()).toEqual("Activate dark mode");
    expect(firstRadioGroupIcon.isVisible()).toBeTruthy();
    expect(secondRadioGroupInput.checked).toBeFalsy();
    expect(secondRadioGroupLabel.text()).toEqual("Light");
    expect(secondRadioGroupText.text()).toEqual("Activate light mode");
    expect(secondRadioGroupIcon.exists()).toBeFalsy();
    expect(radioGroupItems.length).toEqual(2);
  })
})