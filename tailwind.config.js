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

          neutral: "#64748B", // Slate-500
          "neutral-focus": "#475569", // Slate-600
          "neutral-content": "#ffffff",

          "base-100": "#F8FAFC", // Slate-50
          "base-200": "#E2E8F0", // Slate-200
          "base-300": "#CBD5E1", // Slate-300
          "base-content": "#1E293B", // Slate-800

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

          neutral: "#334155", // Slate-700
          "neutral-focus": "#1E293B", // Slate-800
          "neutral-content": "#F1F5F9",

          "base-100": "#000000", // Pure Black Base
          "base-200": "#0B0F1A", // Darker Shade
          "base-300": "#111827", // Slate-900
          "base-content": "#F8FAFC", // Slate-50

          info: "#60A5FA", // Blue-400
          success: "#34D399", // Emerald-400
          warning: "#FBBF24", // Amber-400
          error: "#F87171", // Red-400
        },
      },
    ],
  },
};
