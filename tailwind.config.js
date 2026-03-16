/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        red: {
          militant: '#E63946',
          dark: '#C1121F',
          deep: '#9B2226'
        },
        teal: '#2A9D8F',
        dark: {
          bg: '#0A0A0A',
          card: '#141414',
          border: '#222222',
          borderLight: '#333333'
        },
        cream: '#F5F0EB',
        muted: '#A8A29E',
        dim: '#78716C'
      },
      fontFamily: {
        serif: ['Libre Baskerville', 'Georgia', 'serif'],
        mono: ['Space Mono', 'monospace'],
        sans: ['DM Sans', 'sans-serif']
      }
    }
  },
  plugins: []
};
