import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

/**
 * Store for saving theme information of the user.
 */
export const useThemeStore = defineStore("themeStore", () => {
  type Theme = "light" | "dark";
  const selectedTheme = useStorage<Theme>("theme", "light");

  /**
   * Switch the theme of the user between light and dark.
   */
  const switchTheme = (): void => {
    if (selectedTheme.value === "light") {
      selectedTheme.value = "dark";
      return;
    }

    if (selectedTheme.value === "dark") {
      selectedTheme.value = "light";
      return;
    }
  };

  /**
   * Returns if the current selected theme is light.
   */
  const isThemeLight = (): boolean => {
    return selectedTheme.value === "light";
  };

  /**
   * Public API
   */
  return {
    selectedTheme: selectedTheme,
    isThemeLight: isThemeLight,
    switchTheme: switchTheme,
  };
});
