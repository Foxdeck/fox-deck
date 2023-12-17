/** @type {import("tailwindcss").Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue,mdx}"
  ],
  theme: {
    extend: {
      translate: {
        screen: "100vw",
      },
      colors: {
        primary: {
          50: "inherit",
          100: "inherit",
          200: "inherit",
          300: "inherit",
          400: "inherit",
          500: "inherit",
          600: "inherit",
          700: "inherit",
          800: "inherit",
          900: "inherit",
          950: "inherit",
        },
        danger: {
          darker: "#991b1b",
          normal: "#E02630",
          lighter: "#FA959B",
          light: "#ffdbdc",
        },
        warn: {
          normal: "#FF7F00",
          darker: "#572B00",
        },
        success: {
          normal: "#0a8d56",
          darker: "#165239",
        },
      },
      fontFamily: {
        poppins: "Poppins, sans serif",
        gabarito: "Gabarito, sans serif",
        indie: "Indie Flower, cursive",
      },
      screens: {
        "3xl": "1920px",
        "4xl": "2560px",
        "5xl": "3840px",
      },
    },
  },
};
