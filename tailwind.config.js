/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // all React components
    "./public/index.html",        // your main HTML file
  ],
  theme: {
    extend: {sans: ['Quicksand', 'sans-serif'],},
  },
  plugins: [],
}

