/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        auraGold: '#F0D696',
        auraTeal: '#4DB1A7',
        auraNavy: '#050B18',
        auraNavyMid: '#0A1628',
        auraNavyLight: '#0F1F3D',
      },
      backgroundImage: {
        'divine-glow': 'radial-gradient(circle, rgba(240,214,150,0.2) 0%, rgba(5,11,24,1) 70%)',
        'teal-glow': 'radial-gradient(circle, rgba(77,177,167,0.2) 0%, rgba(5,11,24,1) 70%)',
        'card-gradient': 'linear-gradient(to top, rgba(5,11,24,0.95) 0%, rgba(5,11,24,0.4) 50%, transparent 100%)',
      },
      boxShadow: {
        'gold-glow': '0 0 30px rgba(240,214,150,0.3), 0 0 60px rgba(240,214,150,0.1)',
        'teal-glow': '0 0 20px rgba(77,177,167,0.4)',
        'card': '0 25px 60px rgba(0,0,0,0.6)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-gold': 'pulse-gold 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        'pulse-gold': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(240,214,150,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(240,214,150,0.6)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
    },
  },
  plugins: [],
}
