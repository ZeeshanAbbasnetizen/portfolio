/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#efeee9',
        dark: '#0C0C0C',
        accent: '#D7E2EA',
      },
      fontFamily: {
        kanit: ['Kanit', 'sans-serif'],
        sans: ['Kanit', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 1.2s ease-out both',
        'rise-in': 'riseIn 1.4s cubic-bezier(0.22, 1, 0.36, 1) 300ms both',
        'line': 'growLine 1.1s cubic-bezier(0.76, 0, 0.24, 1) 1200ms both',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        riseIn: {
          '0%': { opacity: '0', transform: 'translateY(4vh) scale(1.03)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        growLine: {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
      }
    },
  },
  plugins: [],
}
