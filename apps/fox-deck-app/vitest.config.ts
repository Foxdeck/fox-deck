import { fileURLToPath } from "node:url";
import { mergeConfig, defineConfig, configDefaults } from "vitest/config";
import viteConfig from "./vite.config";

const customExcludes = ["**/api.ts"];

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      watch: false,
      environment: "jsdom",
      exclude: [...configDefaults.exclude, "e2e/*", ...customExcludes],
      root: fileURLToPath(new URL("./", import.meta.url)),
      coverage: {
        enabled: true,
        exclude: [...customExcludes],
        provider: "istanbul",
        reporter: ["html"],
      },
      reporters: ["html"],
      outputFile: "./test-report/test-output.html",
    },
  }),
);
