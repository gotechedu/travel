/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#041528',
          900: '#082B52', // Deep Navy
          800: '#0B3A6F',
          700: '#0E498C',
        },
        brand: {
          navy: '#082B52',   // Deep Navy (headings, nav, footer)
          blue: '#0B4F8A',   // Royal Blue
          orange: '#FF6B00', // Orange (primary CTA, active states)
          orangeLight: '#FFF1E7', // Light Orange (badges, accents)
          orangeHover: '#E55A00',
          dark: '#0B192C',
          surface: '#F8FAFC',
          card: '#FFFFFF',
          border: '#E2E8F0',
          muted: '#64748B',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(8, 43, 82, 0.08)',
        'soft-lg': '0 10px 30px -4px rgba(8, 43, 82, 0.12)',
        'glow-orange': '0 0 20px rgba(255, 107, 0, 0.35)',
      },
      borderRadius: {
        'card': '18px',
      }
    },
  },
  plugins: [],
}
