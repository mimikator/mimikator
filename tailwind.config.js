/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cerise:      "#7D0507",
        fraise:      "#C00F3D",
        rose_fonce:  "#D77374",
        rosy:        "#FB8BA3",
        powder:      "#FFB1C2",
        peche:       "#FFD4C9",
        ancien_rose: "#E0B2AC",
        olive:       "#7B7E0F",
        fougere:     "#3E4423",
        white_lilac: "#F9F8FE",
      },
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        body:    ["'DM Sans'", "sans-serif"],
        accent:  ["'Dancing Script'", "cursive"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
    },
  },
  plugins: [],
};