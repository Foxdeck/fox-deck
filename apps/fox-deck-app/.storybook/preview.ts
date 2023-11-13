import type { Preview } from "@storybook/vue3";
import { setup } from "@storybook/vue3";
import VueFeather from "vue-feather";
import "../src/assets/main.css";

setup((app) => {
  app.component(VueFeather.name, VueFeather);
});

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
