import {type ComponentMountingOptions, mount} from "@vue/test-utils";
import type {Component} from "vue";
import VueFeather from "vue-feather";

/**
 * Wrapper around @vue/test-utils mount function to globally register component.
 * @param component the component to test
 * @param props the props of the component
 */
export function render<T = {}>(component: Component, props = {} as T) {
  return mount(component, {
    components: {
      "vue-feather": VueFeather,
    },
    props: props as ComponentMountingOptions<T>
  });
}
