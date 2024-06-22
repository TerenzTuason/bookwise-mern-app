/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'lime': '#dae1ba',
      'midnight': '#191731',
      'gunmetal': '#24223b',
      'white': '#ffffff',
      'sky': '#36acc9',
      'black': '#000000',
      'darkpink': '#D81B60',
      'lightpink': '#FFEBEE',
    },
  },
  plugins: [],
}