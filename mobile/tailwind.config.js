/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  darkMode: 'media', // Use device color scheme settings
  theme: {
    extend: {
      colors: {
        // Brand colors
        primary: '#1bc4bc',
        secondary: '#4d02a0',

        // Semantic colors - define light and dark variants
        // Background
        'bg-primary': '#ffffff',
        'bg-primary-dark': '#0f172a',
        'bg-secondary': '#f8fafc',
        'bg-secondary-dark': '#1e293b',

        // Text
        'text-primary': '#0f172a',
        'text-primary-dark': '#f8fafc',
        'text-secondary': '#64748b',
        'text-secondary-dark': '#cbd5e1',

        // Tab bar
        'tabbar-bg': '#ffffff',
        'tabbar-bg-dark': '#1e293b',
        'tabbar-border': '#e5e7eb',
        'tabbar-border-dark': '#334155',

        // Icons
        'icon-active': '#1bc4bc',
        'icon-inactive': '#6b7280',
        'icon-inactive-dark': '#9ca3af',
      },
    },
  },
  plugins: [],
};
