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
          50: "#EAFDFE",
          100: "#CDF9FC",
          200: "#93EDF9",
          300: "#5ADEF5",
          400: "#20C9F2",
          500: "#0C9DC9",
          600: "#086A8F",
          700: "#053C55",
          800: "#042F47",
          900: "#032338",
          950: "#031E31",
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
          normal: "#25C274",
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
