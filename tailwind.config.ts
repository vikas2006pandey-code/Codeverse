import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
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
      fontFamily: {
        body: ['Inter', 'sans-serif'],
        headline: ['"Space Grotesk"', 'sans-serif'],
        code: ['monospace'],
      },
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
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'background-pan': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'float-up': {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
          '100%': { transform: 'translateY(0px)' },
        },
        'float-down': {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(20px)' },
          '100%': { transform: 'translateY(0px)' },
        },
        'pulse-goal': {
            '0%, 100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 hsl(var(--primary) / 0.5)' },
            '50%': { transform: 'scale(1.05)', boxShadow: '0 0 10px 5px hsl(var(--primary) / 0.2)' },
        },
        shake: {
            '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
            '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
            '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
            '40%, 60%': { transform: 'translate3d(4px, 0, 0)' },
        },
        'thumbs-up': {
            '0%': { transform: 'scale(0.5) rotate(0deg)', opacity: '0'},
            '50%': { transform: 'scale(1.2) rotate(-15deg)', opacity: '1'},
            '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1'},
        },
        'radar-sweep': {
          '0%': { transform: 'translateX(-100%) skewX(-30deg)' },
          '100%': { transform: 'translateX(300%) skewX(-30deg)' },
        },
        'missile-fall': {
          '0%': { transform: 'translateY(-100px)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateY(150px)', opacity: '0' },
        },
        'spider-swing': {
            '0%, 100%': { transform: 'rotate(20deg)' },
            '50%': { transform: 'rotate(-20deg)' },
        },
        'radar-pulse': {
            '0%': { transform: 'scale(0.5)', opacity: '0' },
            '50%': { opacity: '1' },
            '100%': { transform: 'scale(1.2)', opacity: '0' },
        },
        'lightning-pulse': {
            '0%, 100%': {
                opacity: '0.7',
                filter: 'drop-shadow(0 0 2px hsl(var(--chart-4)))'
            },
            '50%': {
                opacity: '1',
                filter: 'drop-shadow(0 0 10px hsl(var(--chart-4)))'
            },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'background-pan': 'background-pan 15s ease infinite',
        'float-up': 'float-up 10s ease-in-out infinite',
        'float-down': 'float-down 10s ease-in-out infinite',
        'pulse-goal': 'pulse-goal 2.5s infinite',
        shake: 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both',
        'thumbs-up': 'thumbs-up 0.5s ease-in-out forwards',
        'radar-sweep': 'radar-sweep 3s ease-in-out infinite',
        'missile-fall': 'missile-fall 2s ease-in infinite',
        'spider-swing': 'spider-swing 4s ease-in-out infinite',
        'radar-pulse': 'radar-pulse 2s ease-out infinite',
        'lightning-pulse': 'lightning-pulse 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
} satisfies Config;
