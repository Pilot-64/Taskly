const {nextui} = require("@nextui-org/react");

module.exports = {
  content: [
    './src/index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {}
  },
  variants: {
    extend: {},
    fontFamily: {
      sans: ['Inter', 'ui-sans-serif', 'system-ui']
    }
  },
  darkMode: 'class',
  plugins: [nextui()],
};
