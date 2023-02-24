/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bxPrimary: '#C4C4C4',
        bxBrand: '#097275',
        bxBrandLight: '#17A498',
        bxSecondary: '#FDF8F2',
        bxContrast: '#E2AD38',
        bxBoxLight: '#f8f8f8'
      },
    },
  },
  plugins: [],
}
