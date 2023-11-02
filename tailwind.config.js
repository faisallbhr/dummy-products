/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': 'hsl(222.2 47.4% 11.2%)',
        'secondary': 'hsl(210 40% 96.1%)'
      }
    },
  },
  plugins: [],
}

