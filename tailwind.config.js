const rippleUIconfig = {
  themes: [
    {
      themeName: "light",
      colorScheme: "light",
      colors: {
        primary: "#0091FF",
        primary2: "#0081F1",
        primary3: "#006AF9",

        secondary: "#8E4EC6",
        secondary2: "#8445BC",
        secondary3: "#793AAF",

        accent: "#30A46C",
        accent2: "#299764",
        accent3: "#18794E",

        link: "#0062BC",

        error: "#F31260",
        success: "#17C964",
        warning: "#FFB800",

        backgroundPrimary: "#FCFCFC",
        content1: "#1C1C1C",
        backgroundSecondary: "#F8F8F8",
        content2: "#585757",
        border: "#E2E2E2",
        content3: "#969696",
      },
    },
    {
      themeName: "dark",
      colorScheme: "dark",
      colors: {
        primary: "#0072F5",
        primary2: "#369EFF",
        primary3: "#52A9FF",

        secondary: "#9750DD",
        secondary2: "#9D5BD2",
        secondary3: "#BF7AF0",

        link: "#2c9cd9",

        accent: "#18794E",
        accent2: "#3CB179",
        accent3: "#4CC38A",

        error: "#F31260",
        success: "#17C964",
        warning: "#FFB800",

        backgroundPrimary: "#222222",
        content1: "#E8E8E8",
        backgroundSecondary: "#282828",
        content2: "#BABABA",
        border: "#525252",
        content3: "#767676",
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
