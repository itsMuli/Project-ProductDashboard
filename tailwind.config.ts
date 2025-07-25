/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // <--- VERY IMPORTANT
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
