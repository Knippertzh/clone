/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin-slow 60s linear infinite',
        'flicker': 'flicker 2s infinite',
      },
    },
  },
  plugins: [],
};