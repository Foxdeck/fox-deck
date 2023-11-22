import { setActivePinia, createPinia } from "pinia";
import { describe, expect, it, beforeEach } from "vitest";
import { useThemeStore } from "@/core/stores/theme.store";

describe("Theme Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("switchTheme", () => {
    it("should switch theme from light to dark", () => {
      const themeStore = useThemeStore();
      themeStore.selectedTheme = "light";

      themeStore.switchTheme();

      expect(themeStore.selectedTheme).toEqual("dark");
    });

    it("should switch theme from dark to light", () => {
      const themeStore = useThemeStore();
      themeStore.selectedTheme = "dark";

      themeStore.switchTheme();

      expect(themeStore.selectedTheme).toEqual("light");
    });
  });

  describe("isThemeLight", () => {
    it("should return true if theme is light", () => {
      const themeStore = useThemeStore();
      themeStore.selectedTheme = "light";

      const isLight = themeStore.isThemeLight();

      expect(isLight).toBeTruthy();
    });

    it("should return false if theme is dark", () => {
      const themeStore = useThemeStore();
      themeStore.selectedTheme = "dark";

      const isLight = themeStore.isThemeLight();

      expect(isLight).toBeFalsy();
    });
  });
});
