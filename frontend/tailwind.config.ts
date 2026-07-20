import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#F7FBFF',
        'primary': '#5A84D6',
        'primary-dark': '#3D5AA3',
        'accent': '#89B4FA',
        'card': 'rgba(255,255,255,0.75)',
        'border': '#DCE9F8',
        'text': '#183153',
        'text-light': '#5A7BA6',
        'success': '#3FB950',
        'warning': '#F0B429',
        'danger': '#D9534F',
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        inter: ['Inter', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#183153',
            a: {
              color: '#5A84D6',
              '&:hover': {
                color: '#3D5AA3',
              },
            },
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
        'glass-hover': '0 8px 32px 0 rgba(90, 132, 214, 0.2)',
        'card': '0 4px 20px 0 rgba(31, 38, 135, 0.08)',
        'card-hover': '0 8px 30px 0 rgba(90, 132, 214, 0.15)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}

export default config
