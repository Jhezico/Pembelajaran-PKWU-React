/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'gambar': '0px 0.44276px 2.28762px 0px rgba(0, 0, 0, 0.04), 0px 1.06402px 7.25536px 0px rgba(0, 0, 0, 0.06), 0px 2.00345px 15.94674px 0px rgba(0, 0, 0, 0.08), 0px 3.57381px 30.34034px 0px rgba(0, 0, 0, 0.10), 0px 6.68442px 55.25337px 0px rgba(0, 0, 0, 0.12), 0px 16px 116px 0px rgba(0, 0, 0, 0.16)'
      }
    },
  },
  plugins: [],
}

