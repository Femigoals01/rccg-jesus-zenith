/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        zenithBlue: "#0B1C3D",
        zenithDeep: "#1E3A8A",
        zenithGold: "#FACC15",
      },
    },
  },
  plugins: [],
};
