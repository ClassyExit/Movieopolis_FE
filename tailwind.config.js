const rippleUIconfig = {
  themes: [
    {
      themeName: "light",
      colorScheme: "light",
      colors: {
        primary: "#4A90E2",
        primary2: "#3A7DD4",
        primary3: "#2A6AC6",

        secondary: "#7E5ACF",
        secondary2: "#734ECC",
        secondary3: "#6640C1",

        accent: "#50C878",
        accent2: "#48B66A",
        accent3: "#3A9A58",

        link: "#0074D9",

        error: "#E74C3C",
        success: "#27AE60",
        warning: "#F39C12",

        backgroundPrimary: "#FFFFFF",
        content1: "#2C2C2C",
        backgroundSecondary: "#F4F4F4",
        content2: "#6B6B6B",
        border: "#D9D9D9",
        content3: "#A0A0A0",
      },
    },
    {
      themeName: "dark",
      colorScheme: "dark",
      colors: {
        primary: "#4A90E2",
        primary2: "#3A7DD4",
        primary3: "#2A6AC6",

        secondary: "#7E5ACF",
        secondary2: "#734ECC",
        secondary3: "#6640C1",

        accent: "#50C878",
        accent2: "#48B66A",
        accent3: "#3A9A58",

        link: "#409EFF",

        error: "#E74C3C",
        success: "#27AE60",
        warning: "#F39C12",

        backgroundPrimary: "#1C1C1C",
        content1: "#F5F5F5",
        backgroundSecondary: "#292929",
        content2: "#CCCCCC",
        border: "#4D4D4D",
        content3: "#999999",
      },
    },
  ],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }
    },
    extend: {},
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    require("rippleui")({
      ...rippleUIconfig,
    }),
  ],
};
