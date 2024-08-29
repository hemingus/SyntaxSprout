/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'canvas-green': '#96AA8C',
        'canvas-brown': '#AA9673'
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}
