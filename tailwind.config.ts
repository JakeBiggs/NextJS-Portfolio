import { s } from "framer-motion/client";
import type { Config } from "tailwindcss";

export default {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        light: {
          background: '#F7FAFC', // Light Gray
          background_secondary: '#EDF2F7', // Lighter Gray
          background_tertiary: '#E2E8F0', // Even Lighter Gray
          primary: '#1A1A2E',
          secondary: '#00ADB5',
          text: '#1f2937',
          accent: '#07909c',
        },
        dark: {
          background: '#1A1A2E',
          background_secondary: '#1f2937',
          background_tertiary: '#101927',
          primary: '#EAEAEA',
          secondary: '#07909c',
          text: '#EAEAEA',
          accent: '#00ADB5',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;

