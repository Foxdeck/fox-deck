import {defaultColors, defineConfig} from 'histoire'
import {HstVue} from '@histoire/plugin-vue'

export default defineConfig({
  theme: {
    title: 'Acme Design System',
    colors: {
      primary: defaultColors.cyan,
    },
    logoHref: 'https://acme.com',
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