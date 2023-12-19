import {describe, expect, it} from "vitest";
import {render} from "@/testing/utils/vue-test-utils";
import {DOMWrapper} from "@vue/test-utils";
import type {AppButtonProps} from "./AppButton.types.ts";
import AppButton from "./AppButton.vue";
import {Icon} from "@/core/components/AppIcon/icons";

describe("AppButton", () => {
  it("should render a filled button", async () => {
    const wrapper = render<AppButtonProps>(AppButton, {
        variant: "tonal",
        label: "Click me!",
        icon: Icon.HOME,
      }
    );

    const buttonElement = wrapper.find("md-filled-tonal-button");

    expect(AppButtonSpecHelper.isButtonVisible(buttonElement)).toBeTruthy();
    expect(AppButtonSpecHelper.hasLabel(buttonElement, "Click me!")).toBeTruthy();
    expect(AppButtonSpecHelper.hasIcon(buttonElement, "fi-rr-home")).toBeTruthy();
  })

  it("should render a text button", async () => {
    const wrapper = render<AppButtonProps>(AppButton, {
        variant: "outlined",
        label: "Click me!",
        icon: Icon.HOME,
      }
    );

    const buttonElement = wrapper.find("md-outlined-button");

    expect(AppButtonSpecHelper.isButtonVisible(buttonElement)).toBeTruthy();
    expect(AppButtonSpecHelper.hasLabel(buttonElement, "Click me!")).toBeTruthy();
    expect(AppButtonSpecHelper.hasIcon(buttonElement, "fi-rr-home")).toBeTruthy();
  })

  it("should render a text button", async () => {
    const wrapper = render<AppButtonProps>(AppButton, {
        variant: "text",
        label: "Click me!",
        icon: Icon.HOME,
      }
    );

    const buttonElement = wrapper.find("md-text-button");

    expect(AppButtonSpecHelper.isButtonVisible(buttonElement)).toBeTruthy();
    expect(AppButtonSpecHelper.hasLabel(buttonElement, "Click me!")).toBeTruthy();
    expect(AppButtonSpecHelper.hasIcon(buttonElement, "fi-rr-home")).toBeTruthy();
  })
})

/**
 * Helper functions for writing UI tests for the button component.
 */
const AppButtonSpecHelper = {
  labelElementSelector: "[data-testid=button-label]",
  iconElementSelector: "[data-testid=button-icon]",

  isButtonVisible: (buttonElement: DOMWrapper<Element>): boolean => {
    return buttonElement.isVisible();
  },
  hasLabel: (buttonElement: DOMWrapper<Element>, label: string): boolean => {
    const labelElement = buttonElement.find(AppButtonSpecHelper.labelElementSelector);
    return labelElement.text() === label;
  },
  hasIcon: (buttonElement: DOMWrapper<Element>, icon: string): boolean => {
    const iconElement = buttonElement.find(AppButtonSpecHelper.iconElementSelector);
    return iconElement.classes().includes("fi") && iconElement.classes().includes(icon)
  }
}