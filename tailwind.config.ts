import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "bg-gradient-to-r",
    "from-yellow-50",
    "to-pink-50",
    "from-pink-50",
    "to-blue-50",
    "from-blue-50",
    "to-yellow-50",
  ],
  theme: {
    boxShadow: { DEFAULT: "0 1px 3px rgba(0,0,0, 0.2)" },
    extend: {
      colors: {
        redis: "#F35C7A",
      },
    },
  },
  plugins: [],
};

export default config;
