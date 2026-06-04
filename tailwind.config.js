/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        charcoal: '#0D0D14',
        'midnight-purple': '#100D1F',
        surface: '#1A1A2E',
        emerald: {
          500: '#00E5A0',
        },
        teal: {
          500: '#00C8FF',
        },
        coral: {
          500: '#FF6B6B',
        },
      },
      fontFamily: {
        jakarta: ['var(--font-jakarta)', 'Plus Jakarta Sans', 'sans-serif'],
        inter: ['var(--font-inter)', 'Inter', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUpSlide 0.6s ease forwards',
        'shimmer': 'shimmer 3s infinite',
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
        'glow': 'glowPulse 2.5s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2.5s ease-in-out infinite',
      },
      keyframes: {
        fadeUpSlide: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 229, 160, 0.25), 0 0 40px rgba(0, 200, 255, 0.15)' },
          '50%': { boxShadow: '0 0 30px rgba(0, 229, 160, 0.35), 0 0 60px rgba(0, 200, 255, 0.22)' },
        },
      },
      boxShadow: {
        'glow-sm': '0 0 20px rgba(0, 229, 160, 0.2)',
        'glow': '0 0 30px rgba(0, 229, 160, 0.25)',
        'glow-lg': '0 0 40px rgba(0, 229, 160, 0.3)',
      }
    },
  },
  plugins: [],
}

