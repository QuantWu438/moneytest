/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        'neon-blue': '#00f0ff',
        'neon-pink': '#ff00ff',
        'dark-bg': '#0a0a0a',
        'primary-blue': '#1e3c72',
        'secondary-blue': '#2a5298',
        'cyber-black': '#0A0A14',
        'neon-blue-glow': 'rgba(0, 240, 255, 0.5)',
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
      },
      fontFamily: {
        'orbitron': ['Orbitron', 'sans-serif'],
        'press-start': ['"Press Start 2P"', 'cursive'],
      },
      animation: {
        'scan-x': 'scan-x 2s linear infinite',
        'scan-y': 'scan-y 2s linear infinite',
        'matrix-rain': 'matrix-rain 20s linear infinite',
        'grid-flow': 'grid-flow 20s linear infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        'scan-pulse': 'scan-pulse 2s ease-in-out infinite',
        'scan-rotate': 'scan-rotate 4s linear infinite',
        'neon-pulse': 'neon-pulse 2s ease-in-out infinite',
        'cyber-hover': 'cyber-hover 1s ease-in-out infinite',
      },
      keyframes: {
        'scan-x': {
          '0%': { left: '0%' },
          '100%': { left: '100%' }
        },
        'scan-y': {
          '0%': { top: '0%' },
          '100%': { top: '100%' }
        },
        'matrix-rain': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' }
        },
        'grid-flow': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(4rem)' }
        },
        'glow-pulse': {
          '0%, 100%': { opacity: 0.4 },
          '50%': { opacity: 1 }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        'scan-pulse': {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.7' }
        },
        'scan-rotate': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        'neon-pulse': {
          '0%': { boxShadow: '0 0 5px #00f0ff, 0 0 10px #00f0ff, 0 0 20px #00f0ff' },
          '50%': { boxShadow: '0 0 10px #00f0ff, 0 0 20px #00f0ff, 0 0 40px #00f0ff' },
          '100%': { boxShadow: '0 0 5px #00f0ff, 0 0 10px #00f0ff, 0 0 20px #00f0ff' }
        },
        'cyber-hover': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' }
        }
      },
      boxShadow: {
        'neon': '0 0 5px theme(colors.neon-blue), 0 0 10px theme(colors.neon-blue)',
        'neon-strong': '0 0 10px theme(colors.neon-blue), 0 0 20px theme(colors.neon-blue), 0 0 40px theme(colors.neon-blue)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}