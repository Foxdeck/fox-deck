import {fileURLToPath, URL} from "node:url";

import {defineConfig} from "vite";
import svgLoader from "vite-svg-loader";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({
    template: {
      compilerOptions: {
        // register material-design web components as custom element
        isCustomElement: (tag) => tag.startsWith("md")
      }
    }
  }), svgLoader()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    setupFiles: "vuetify.config.ts",
    deps: {
      inline: ["vuetify"],
    },
    globals: true,
  }
});
