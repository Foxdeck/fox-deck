import {defaultColors, defineConfig} from 'histoire'
import {HstVue} from '@histoire/plugin-vue'

export default defineConfig({
  theme: {
    title: 'Foxdeck Design System',
    colors: {
      primary: defaultColors.cyan,
    },
    hideColorSchemeSwitch: true,
    storeColorScheme: true,
  },
  plugins: [
    HstVue(),
  ],
  setupFile: "./src/histoire-setup.ts",
  tree: {
    groups: [
      {
        id: "introduction",
        title: "Introduction"
      }
    ],
  },
})