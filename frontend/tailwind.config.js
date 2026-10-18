/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          red:      '#dc2626',   // logo / accent red
          redDark:  '#b91c1c',   // hover red
          green:    '#16a34a',   // primary CTA green
          greenDark:'#15803d',   // hover green
          greenBg:  '#f0fdf4',   // light green background tint
          white:    '#ffffff',
          offWhite: '#f8fafc',
          dark:     '#1a1a1a',   // footer / dark sections
          gray:     '#374151',
        },
      },
      fontFamily: {
        sans:    ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in':    'fadeIn 0.6s ease-out forwards',
        'slide-up':   'slideUp 0.6s ease-out forwards',
        'slide-right':'slideRight 0.6s ease-out forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn:     { '0%': { opacity: '0' },                                   '100%': { opacity: '1' } },
        slideUp:    { '0%': { opacity: '0', transform: 'translateY(30px)' },    '100%': { opacity: '1', transform: 'translateY(0)' } },
        slideRight: { '0%': { opacity: '0', transform: 'translateX(-30px)' },   '100%': { opacity: '1', transform: 'translateX(0)' } },
      },
      backgroundImage: {
        // Hero: white → very light green tint
        'hero-gradient':    'linear-gradient(135deg, #ffffff 0%, #f0fdf4 40%, #dcfce7 100%)',
        'hero-dark':        'linear-gradient(135deg, #052e16 0%, #14532d 50%, #166534 100%)',
        'card-gradient':    'linear-gradient(180deg, transparent 0%, rgba(26,26,26,0.92) 100%)',
        'section-gradient': 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
      },
    },
  },
  plugins: [],
}
