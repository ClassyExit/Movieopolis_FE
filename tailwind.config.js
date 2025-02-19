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
  plugins: [require("tailwind-scrollbar-hide"), require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#4F46E5", // Indigo-600
          "primary-focus": "#4338CA", // Indigo-700
          "primary-content": "#ffffff",

          secondary: "#22D3EE", // Cyan-400
          "secondary-focus": "#06B6D4", // Cyan-500
          "secondary-content": "#ffffff",

          accent: "#F59E0B", // Amber-500
          "accent-focus": "#D97706", // Amber-600
          "accent-content": "#ffffff",

          neutral: "#6B7280", // Gray-500
          "neutral-focus": "#4B5563", // Gray-600
          "neutral-content": "#ffffff",

          "base-100": "#F9FAFB", // Gray-50
          "base-200": "#E5E7EB", // Gray-200
          "base-300": "#D1D5DB", // Gray-300
          "base-content": "#111827", // Gray-900

          info: "#3B82F6", // Blue-500
          success: "#10B981", // Emerald-500
          warning: "#F59E0B", // Amber-500
          error: "#EF4444", // Red-500
        },
      },
      {
        dark: {
          primary: "#6366F1", // Indigo-500
          "primary-focus": "#4F46E5", // Indigo-600
          "primary-content": "#ffffff",

          secondary: "#22D3EE", // Cyan-400
          "secondary-focus": "#06B6D4", // Cyan-500
          "secondary-content": "#0F172A",

          accent: "#FBBF24", // Amber-400
          "accent-focus": "#F59E0B", // Amber-500
          "accent-content": "#0F172A",

          neutral: "#4B5563", // Gray-600
          "neutral-focus": "#374151", // Gray-700
          "neutral-content": "#F3F4F6", // Gray-100

          "base-100": "#000000", // Pure Black
          "base-200": "#0F0F0F", // Darker Shade
          "base-300": "#1F1F1F", // Very Dark Gray
          "base-content": "#E5E7EB", // Gray-200

          info: "#60A5FA", // Blue-400
          success: "#34D399", // Emerald-400
          warning: "#FBBF24", // Amber-400
          error: "#F87171", // Red-400
        },
      },
    ],
  },
};
