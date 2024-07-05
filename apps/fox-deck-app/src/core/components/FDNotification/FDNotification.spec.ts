import {describe, expect, it} from "vitest";

import {render} from "@/testing/utils/vue-test-utils";

import FDNotification from "./FDNotification.vue";


describe("FDNotification", () => {
  it("should render correctly", () => {
    const wrapper = render(FDNotification, {
      title: "Some error happens",
      text: "This is a long description of the error",
      severity: "danger"
    }
    );

    const errorIcon = wrapper.find("[data-testid=notification-error-icon]");
    const title = wrapper.find("[data-testid=notification-title]");
    const text = wrapper.find("[data-testid=notification-text]");

    expect(errorIcon.isVisible()).toBeTruthy();
    expect(title.text()).toEqual("Some error happens");
    expect(text.text()).toEqual("This is a long description of the error");
  });
});