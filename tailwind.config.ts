/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from 'tailwindcss'
import { withUt } from 'uploadthing/tw'

const config: Config = withUt({
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  extend: {
  animation: {
    glow: 'glow 4s ease-in-out infinite',
    sweep: 'sweep 3s linear infinite',
    blink: 'blink 1.5s infinite',
    shake: 'shake 0.4s infinite',
    '3dflip': 'flip3d 0.8s ease',
    particles: 'particles 10s linear infinite',
  },
  
  keyframes: {
    glow: {
      '0%,100%': { opacity: 0.6 },
      '50%': { opacity: 1 },
    },
    sweep: {
      '0%': { transform: 'translateX(-100%)' },
      '100%': { transform: 'translateX(100%)' },
    },
    blink: {
      '0%,100%': { opacity: 1 },
      '50%': { opacity: 0.4 },
    },
    shake: {
      '0%': { transform: 'translateX(0)' },
      '25%': { transform: 'translateX(-2px)' },
      '50%': { transform: 'translateX(2px)' },
      '75%': { transform: 'translateX(-2px)' },
      '100%': { transform: 'translateX(0)' },
    },
    flip3d: {
      '0%': { transform: 'rotateX(90deg)' },
      '100%': { transform: 'rotateX(0)' },
    },
    particles: {
      '0%': { backgroundPosition: '0 0' },
      '100%': { backgroundPosition: '200px 400px' },
    },
  },
},

  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      }, animation: {
        'spin-fast': 'spin 0.7s linear infinite', // ✅ fast rotation added
      },
       keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}) satisfies Config

export default config
