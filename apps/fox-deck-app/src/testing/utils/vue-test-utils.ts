import {type ComponentMountingOptions, mount} from "@vue/test-utils";
import VueFeather from "vue-feather";
import type {Component} from "vue";
import {vuetify} from "@/vuetify";

/**
 * Wrapper around @vue/test-utils mount function to globally register component.
 * @param component the component to test
 * @param props the props of the component
 */
export function render<T = {}>(component: Component, props = {} as T) {
  return mount(component, {
    components: {
      "vue-feather": VueFeather
    },
    global: {
      plugins: [vuetify]
    },
    props: props as ComponentMountingOptions<T>
  });
}
