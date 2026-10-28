/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          light: '#FAF7F2',
          DEFAULT: '#F5F1EA',
          dark: '#EBE5DA',
        },
        brand: {
          amber: '#F97316',
          purple: '#8B5CF6',
          cyan: '#06B6D4',
          magenta: '#EC4899',
          ink: '#0F172A',
          charcoal: '#1E293B',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Cal Sans', 'Plus Jakarta Sans', 'sans-serif'],
      },
      boxShadow: {
        'glow-purple': '0 0 50px -10px rgba(139, 92, 246, 0.3)',
        'glow-warm': '0 0 50px -10px rgba(249, 115, 22, 0.25)',
        'subtle-card': '0 20px 40px -15px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(0, 0, 0, 0.03)',
        'premium': '0 25px 50px -12px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(15, 23, 42, 0.04)',
      },
      borderRadius: {
        '3xl': '1.75rem',
        '4xl': '2.25rem',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}