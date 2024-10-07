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
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        lobster: ['Lobster', 'cursive'],
        playfair: ['Playfair Display', 'serif']
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}
