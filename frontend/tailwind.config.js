/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        f1: {
          red: '#E10600',
          dark: '#15151E',
          darker: '#0A0A0F',
          gray: {
            100: '#F5F5F5',
            200: '#E0E0E0',
            300: '#B8B8B8',
            400: '#8F8F8F',
            500: '#666666',
            600: '#4A4A4A',
            700: '#2E2E38',
            800: '#1A1A24',
            900: '#15151E',
          },
          teal: {
            400: '#00D2BE',
            500: '#00BFA9',
            600: '#00A88F',
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
        f1: ['Formula1', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 20px rgba(0, 210, 190, 0.3)',
        'glow-red': '0 0 20px rgba(225, 6, 0, 0.3)',
        'inner-glow': 'inset 0 0 20px rgba(0, 210, 190, 0.1)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-in': 'slideIn 0.5s ease-out',
        'fade-in': 'fadeIn 0.3s ease-in',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
