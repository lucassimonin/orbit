/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      colors: {
        background: '#050508',
        surface: '#0f0f15',
        card: 'rgba(255, 255, 255, 0.03)',
        neon: {
          purple: '#bc13fe',
          pink: '#ff00ff',
          lime: '#32cd32',
          blue: '#00ffff',
          yellow: '#ffff00',
          orange: '#ff6b00',
        }
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'mesh': 'mesh 15s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        mesh: {
          '0%, 100%': {
            'background-position': '0% 50%'
          },
          '50%': {
            'background-position': '100% 50%'
          },
        },
        glow: {
          '0%': { 'box-shadow': '0 0 5px rgba(188, 19, 254, 0.2), 0 0 10px rgba(188, 19, 254, 0.2)' },
          '100%': { 'box-shadow': '0 0 20px rgba(188, 19, 254, 0.6), 0 0 40px rgba(188, 19, 254, 0.4)' },
        }
      },
      boxShadow: {
        'neon-purple': '0 0 15px rgba(188, 19, 254, 0.4), 0 0 30px rgba(188, 19, 254, 0.2)',
        'neon-pink': '0 0 15px rgba(255, 0, 255, 0.4), 0 0 30px rgba(255, 0, 255, 0.2)',
        'neon-lime': '0 0 15px rgba(50, 205, 50, 0.4), 0 0 30px rgba(50, 205, 50, 0.2)',
        'neon-blue': '0 0 15px rgba(0, 255, 255, 0.4), 0 0 30px rgba(0, 255, 255, 0.2)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.8)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'mesh-gradient': 'linear-gradient(45deg, #050508 0%, #0f0f15 50%, #050508 100%)',
      }
    },
  },
  plugins: [],
}
