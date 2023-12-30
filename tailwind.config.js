/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,vue}",
  ],
  theme: {
    extend: {
      colors: {
        'chinese-black': '#111112',
        'onyx': '#3a3a3c',
        'brass': '#b59f3b',
        'middle-green': '#538d4e',
        'davys-grey': '#565758',
        'old-silver': '#818384',
        'cultured': '#f8f8f8'
      },
      screens: {
        'kb': '460px'
      }
    },
  },
  plugins: [],
}

