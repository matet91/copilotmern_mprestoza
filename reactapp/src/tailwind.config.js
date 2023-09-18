/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./components/**/*.{html,js}"],
  theme: {
    //container center the content
    container: {
      center: true,
    },
    extend: {},
  },
  plugins: [
    //require tailwindcss/typography
    require('@tailwindcss/typography'),
    //require tailwindcss/forms
    require('@tailwindcss/forms'),
  ],
}

