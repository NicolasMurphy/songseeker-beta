/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          secondary: "gold",
        },
      },
    ],
  },
  plugins: [
    require("daisyui"),
    plugin(({ addBase, theme }) => {
      addBase({
        ".scrollbar": {
          overflowY: "auto",
          scrollbarColor: `${theme("colors.gray.400")} ${theme(
            "colors.gray.200"
          )}`,
        },
        ".scrollbar::-webkit-scrollbar": {
          height: "2px",
          width: "2px",
        },
        ".scrollbar::-webkit-scrollbar-thumb": {
          backgroundColor: theme("colors.gray.400"),
        },
        ".scrollbar::-webkit-scrollbar-track-piece": {
          backgroundColor: theme("colors.gray.200"),
        },
      });
    }),
  ],
};
