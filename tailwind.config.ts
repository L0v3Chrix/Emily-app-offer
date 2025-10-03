import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bestie: {
          coral: '#FA8977',      // Primary coral/peach
          blue: '#1E73BE',       // Deep blue
          'blue-hover': '#4489D6', // Lighter blue for hovers
          mint: '#E7F1F1',       // Light mint background
          green: '#9DE4A1',      // Lemon green accent
          gray: '#474747',       // Dark gray text
          'gray-light': '#F5F5F5', // Light gray backgrounds
        }
      }
    },
  },
  plugins: [],
};
export default config;
