import { mount } from "@vue/test-utils";
import VueFeather from "vue-feather";
import type { Component } from "vue";

/**
 * Wrapper around @vue/test-utils mount function to globally register component.
 * @param component the component to test
 * @param props the props of the component
 */
export function render(component: Component, props: any = {}) {
  return mount(component, {
    components: {
      "vue-feather": VueFeather,
    },
    props,
  });
}
