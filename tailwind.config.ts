import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx,mdx}',
    './app/**/*.{ts,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'custom-orange': 'rgba(253, 98, 11, 0.95)',
        'custom-color': '#000',
      },
      fontFamily: {
        'laila': ['Laila', 'sans-serif'],
        'ubuntu': ['Ubuntu', 'sans-serif'],
      },
      boxShadow: {
        'custom': '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
};

export default config;
