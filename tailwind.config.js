/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef3ff',
          100: '#dce7ff',
          200: '#c1d3ff',
          300: '#9ab7ff',
          400: '#7090ff',
          500: '#4f66f9',
          600: '#3a45ef',
          700: '#2f35d8',
          800: '#2a2fae',
          900: '#272e8a',
          950: '#1a1c54',
        },
        secondary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#b9e6fe',
          300: '#7cd4fd',
          400: '#36bffa',
          500: '#0ca5eb',
          600: '#0284c7',
          700: '#036ba1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        dark: {
          100: '#d5d7e0',
          200: '#acafc1',
          300: '#8387a3',
          400: '#595f84',
          500: '#303865',
          600: '#262d51',
          700: '#1d223d',
          800: '#131628',
          900: '#0a0b14',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};