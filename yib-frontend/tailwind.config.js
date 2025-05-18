/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  plugins: [
    require('tailwind-scrollbar-hide')
    
  ]
,
  theme: {
    screens: {
      'sm': '640px',
      'md': '820px',
      'mmd':'900px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      blur: {
        sm: '4px',
        md: '8px',
        lg: '16px',
        xl: '24px',
      },
      keyframes: {
        'slide-down': {
          '0%': { transform: 'translateY(-100%)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
      animation: {
        'slide-down': 'slide-down 0.5s ease-out forwards',
          'spin-slow': 'spin 8s linear infinite'
    
      },

    },
  },
  plugins: [
],
}

