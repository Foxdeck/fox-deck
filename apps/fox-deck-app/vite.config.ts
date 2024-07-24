import {fileURLToPath, URL} from "node:url";

import vue from "@vitejs/plugin-vue";
import {defineConfig} from "vite";
import svgLoader from "vite-svg-loader";

import viteLogger from "./src/plugins/vite-plugin-logger";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        rewrite: (path) => path.replace(/^\/api/, "")
      },
    }
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // register material-design web components as custom element
          isCustomElement: (tag) => tag.startsWith("md")
        }
      }
    }),
    svgLoader(),
    viteLogger()
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  optimizeDeps: {
    exclude: ["@material"]
  }
});
