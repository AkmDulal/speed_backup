/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sx: "320px",
      ss: "375px",
      sm: "640px",
      md: "768px",
      lg: "1200px",
      xl: "1600px",
    },
    fontFamily: {
      defaultfont: ["Source Code Pro", ""],
    },
    colors: {
      brandColor: "#FF6600",
      titleColor: "#332922",
      textColor: "#332922",
      white: "#FFFFFF",
    },
    container: {
      screens: {
        sx: "320px",
        ss: "375px",
        sm: "640px",
        md: "768px",
        lg: "1200px",
        xl: "1600px",
      },
      padding: {
        DEFAULT: "1rem",
        sx: "1rem",
        ss: "1rem",
        sm: "2rem",
        lg: "3rem",
        xl: "4rem",
        "2xl": "5rem",
      },
    },
    extend: {},
  },
  plugins: [],
};
