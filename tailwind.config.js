/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        konkhmer: ['Konkhmer Sleokchher'],
        variable: ['Inter Variable']
      },
    },
  },
  plugins: [],
}

