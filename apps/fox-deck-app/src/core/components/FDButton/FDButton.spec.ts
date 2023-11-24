import {describe, expect, it} from 'vitest'
import FDButton from './FDButton.vue'
import {render} from "@/testing/utils/vue-test-utils";


describe('FDButton', () => {
  it('should render correctly without icon', () => {
    const wrapper = render(FDButton, {
        label: "Click me!"
      }
    );

    expect(wrapper.text()).toEqual("Click me!")
    expect(wrapper.findComponent("[data-testid=button-icon]").exists()).not.toBeTruthy();
  })

  it('should render correctly with icon', () => {
    const wrapper = render(FDButton, {
        label: "Click me!",
        icon: "home"
      }
    );

    expect(wrapper.text()).toEqual("Click me!")
    expect(wrapper.findComponent("[data-testid=button-icon]").isVisible()).toBeTruthy();
  })
})