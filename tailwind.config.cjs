/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Habilita el modo oscuro basado en la clase 'dark'
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'dark-background': '#1A1A2E',
        'dark-surface': '#252540',
        'dark-border': '#333350',
        'dark-text': '#E0E0E0',
        'dark-text-muted': '#B0B0B0',
        'accent-blue': '#00ADB5',
        'accent-blue-dark': '#007A80',
        'accent-purple': '#8E44AD',
        'accent-purple-dark': '#6C3483',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Usando Inter como ejemplo
        mono: ['Fira Code', 'monospace'], // Para bloques de código
      },
    },
  },
  plugins: [],
}
