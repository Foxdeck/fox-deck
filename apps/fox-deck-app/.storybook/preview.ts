import type { Preview } from "@storybook/vue3";
import "./../src/assets/main.css";

const preview: Preview = {
  decorators: [
    // we need wrap the story with a div, containing the class for the 'theme'
    () => {
      return {
        template: "<div class='light'><story/></div>"
      };
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
