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
        background: "#F5F2ED",
        foreground: "#1A1A1A",
        cream: "#F5F2ED",
        charcoal: "#1A1A1A",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["'Noto Serif SC'", "serif"],
        playfair: ["'Playfair Display'", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
