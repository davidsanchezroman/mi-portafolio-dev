/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class', // Habilita el modo oscuro basado en la clase 'dark' en el HTML
  theme: {
    extend: {
      colors: {
        'dark-background': '#1A1A2E',
        'dark-surface': '#252540',
        'dark-border': '#3C3C5C',
        'dark-text': '#E0E0E0',
        'dark-text-muted': '#B0B0B0',
        'accent-blue': '#00ADB5',
        'accent-blue-dark': '#007A80',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      }
    },
  },
  plugins: [],
}