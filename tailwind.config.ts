import type { Config } from 'tailwindcss';

const config: Config = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    boxShadow: { DEFAULT: '0 1px 3px rgba(0,0,0, 0.2)' },
    extend: {
      colors: {
        redis: '#F35C7A',
      },
    },
  },
  plugins: [],
};
export default config;
