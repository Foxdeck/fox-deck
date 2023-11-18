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
          50: "#94B1EE",
          100: "#82A5EB",
          200: "#5F8BE6",
          300: "#3C72E0",
          400: "#215BD2",
          500: "#1C4CAF",
          600: "#163D8B",
          700: "#112D68",
          800: "#0B1E45",
          900: "#030915",
          950: "#000000",
        },
        danger: {
          normal: "#E02630",
          lighter: "#FA959B",
        },
        warn: {
          normal: "#FF7F00",
          darker: "#572B00",
        },
        success: {
          normal: "#7DC742",
          darker: "#468226",
        },
      },
      fontFamily: {
        poppins: "Poppins, sans serif",
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
