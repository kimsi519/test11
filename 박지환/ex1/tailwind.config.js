/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'hana-green': '#029377',
      },
      fontFamily: {
        hana_regular: ["hana-regular"],
        hana_bold: ["hana-bold"],
      },
    },
  },
  plugins: [],
}