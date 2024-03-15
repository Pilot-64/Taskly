module.exports = {
  content: ["./src/index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      taskly: ["Inter", "ui-sans-serif", "system-ui"]
    },
    extend: {
      width: {
        "screen-1/4": "25vw",
        "screen-1/3": "33.333333vw",
        "screen-1/2": "50vw",
        "screen-2/3": "66.666667vw",
        "screen-3/4": "75vw"
      },
      height: {
        "screen-1/4": "25vh",
        "screen-1/3": "33.333333vh",
        "screen-1/2": "50vh",
        "screen-2/3": "66.666667vh",
        "screen-3/4": "75vh"
      }
    }
  },
  darkMode: "class",
  plugins: []
};
