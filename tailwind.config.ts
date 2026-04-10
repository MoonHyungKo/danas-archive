import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0F0F0F",
        accent: "#D4AF37", // Champagne Gold
        softRose: "#FFB7B2",
      },
      backgroundImage: {
        "shinkai-sky": "url('/images/bg.png')",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "serif"],
      },
      animation: {
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(212, 175, 55, 0.5)" },
          "100%": { boxShadow: "0 0 20px rgba(212, 175, 55, 0.8)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
