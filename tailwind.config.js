/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  safelist: [
    {
      pattern: /grid|grid-cols-+/
    },
    {
      pattern: /col-span-+/
    },
    {
      pattern: /gap-+/
    }
  ],
  theme: {
    extend: {}
  },
  plugins: []
}
