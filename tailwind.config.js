import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    darkMode: "class",
    extend: {
      fontFamily: {
        Manrope: ["Manrope", "sans-serif"],
        MonaSans: ['"Mona-Sans"', "sans-serif"],
        Merriweather: ["Merriweather", "serif"],
      },
    },
  },
  plugins: [nextui()],
};
