/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryDark: "#50614a",
        primaryLight: "#c4e641",
        neutral: "#e6e9d8",
        hover: "#668000",
        white: "#ffffff",
      },
      borderRadius: {
        large: "64px",
        medium: "32px",
        small: "16px",
      },
    },
  },
  plugins: [],
};
