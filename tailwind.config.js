/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        command: {
          950: '#02050c',
          900: '#050c18',
          850: '#081222',
          800: '#0c1a30',
          700: '#112544',
          600: '#193560',
        },
        water: {
          cyan: '#00f2fe',
          blue: '#38bdf8',
          deep: '#0284c7',
        },
        crisis: {
          red: '#ff3344',
          crimson: '#ef4444',
          amber: '#f59e0b',
        },
        eco: {
          emerald: '#10b981',
          mint: '#34d399',
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        display: ['"Rajdhani"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -3px rgba(0, 242, 254, 0.45)',
        'glow-red': '0 0 25px -3px rgba(255, 51, 68, 0.55)',
        'glow-amber': '0 0 25px -3px rgba(245, 158, 11, 0.45)',
        'glow-emerald': '0 0 25px -3px rgba(16, 185, 129, 0.45)',
      }
    },
  },
  plugins: [],
}
