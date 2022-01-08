module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  media: false,
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "2240px",
    },
    fontFamily: {
      caveat: ["Caveat", "Brush Script MT", "sans-serif"],
    },
    container: {
      padding: {
        DEFAULT: "1rem",
      },
    },
    extend: {
      dropShadow: {
        smooth: "0px 0px 90px rgba(0, 0, 0, 0.08)",
      },
    },
  },
  plugins: [],
}
