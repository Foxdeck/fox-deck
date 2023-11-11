/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    extend: {
      translate: {
        screen: "100vw",
      },
      colors: {
        primary: {
          50: "#eefaff",
          100: "#d9f4ff",
          200: "#bcecff",
          300: "#8ee2ff",
          400: "#59ceff",
          500: "#33b4fe",
          600: "#1c97f4",
          700: "#147bdb",
          800: "#1766b6",
          900: "#19568f",
          950: "#143557",
        },
        danger: {
          normal: "#B00020",
          lighter: "#ffdbe2",
        },
        warn: {
          normal: "#f0ad4e",
          darker: "#774b0c",
        },
        success: {
          normal: "#7cdca4",
          darker: "#085633",
        },
      },
      fontFamily: {
        gabarito: "Gabarito, sans serif",
      },
      screens: {
        "3xl": "1920px",
        "4xl": "2560px",
        "5xl": "3840px",
      },
    },
  },
};
