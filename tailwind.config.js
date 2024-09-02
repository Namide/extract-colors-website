/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,vue,ts}', './index.html'],
  safelist: [{
    pattern: /hljs+/,
  }],
  theme: {
    hljs: {
      theme: 'monokai',
    },
  },
  daisyui: {
    themes: ["cmyk"],
  },
  plugins: [require("daisyui"), require('tailwind-highlightjs')],
}
