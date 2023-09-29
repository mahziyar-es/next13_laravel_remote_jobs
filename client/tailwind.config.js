/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors:{
        'theme-1': '#5f0f40',
        'theme-1-contrast': '#ffff',
        'theme-2': '#ff6d00',
        'theme-2-contrast': '#ffff',
        'theme-3': '#006466',
        'theme-3-contrast': '#ffff',
        'theme-4': '#240046',
        'theme-4-contrast': '#ffff',
      },

      backgroundImage: theme => ({
          'landing': "url('/landing-mobile-bg.png')",
          'landing-md': "url('/landing-bg.png')",
      }),

      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        fadeInScale: {
          '0%': { opacity: 0,transform: 'scale(0.97)' },
          '100%': { opacity: 1,transform: 'scale(1)' },
        },
        slideInRight: {
          '0%': { opacity: 0, transform: 'translateX(-10px)' },
          '100%': { opacity: 1, transform: 'translateX(0px)' },
        },
        slideInLeft: {
          '0%': { opacity: 0, transform: 'translateX(10px)' },
          '100%': { opacity: 1, transform: 'translateX(0px)' },
        },
        upDown: {
          '0%': { transform: 'translateY(0px)' },
          '15%': { transform: 'translateY(-20px)' },
          '20%': { transform: 'translateY(0px)' },
        },
      },

      animation: {
        fadeIn: 'fadeIn 1s ease-in-out',
        slideInRight: 'slideInRight 1s ease-in-out',
        slideInLeft: 'slideInLeft 1s ease-in-out',
        fadeInScale: 'fadeInScale 1s ease-in-out',
        upDown: 'upDown 10s ease-in-out infinite',
      }

    },

  },
  plugins: [],
}
