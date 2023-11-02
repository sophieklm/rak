/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */

module.exports = {
  mode: "jit",
  content: [
    "./public/*.html",
    "./app/helpers/**/*.rb",
    "./app/javascript/**/*.js",
    "./app/views/**/*",
    "./src/**/*.{html,js}",
  ],
  theme: {
    extend: {},
  },
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
