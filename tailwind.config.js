module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      padding: {
        DEFAULT: "1rem",
      },
    },
    extend: {
      dropShadow: {
        milan: "0px 0px 90px rgba(0, 0, 0, 0.08)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
