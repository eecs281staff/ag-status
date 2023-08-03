/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // https://brand.umich.edu/design-resources/colors/
        maize: "#FFCB05",
        mblue: "#00274C",
        pumablack: "#131516",
      },
    },
  },
  plugins: [],
};
