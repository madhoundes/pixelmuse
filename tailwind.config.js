import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html', 
    './src/**/*.{js,ts,jsx,tsx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          dark: 'hsl(var(--primary-dark))',
          light: 'hsl(var(--primary-light))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
        },
        success: {
          DEFAULT: 'hsl(var(--success))',
        },
        warning: {
          DEFAULT: 'hsl(var(--warning))',
        },
        error: {
          DEFAULT: 'hsl(var(--error))',
        },
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'fade-in': 'fadeIn 0.3s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(59, 130, 246, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.8)' },
        },
        fadeIn: {
          from: {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      spacing: {
        '18': '4.5rem',
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            background: "#FFFFFF",
            foreground: "#11181C",
            primary: {
              50: "#e6f1fe",
              100: "#cce3fd",
              200: "#99c7fb",
              300: "#66aaf9",
              400: "#338ef7",
              500: "#006FEE",
              600: "#005bc4",
              700: "#004493",
              800: "#002e62",
              900: "#001731",
              DEFAULT: "#006FEE",
              foreground: "#ffffff",
            },
            secondary: {
              50: "#f2eafa",
              100: "#e4d4f4",
              200: "#c9a9e9",
              300: "#ae7ede",
              400: "#9353d3",
              500: "#7828c8",
              600: "#6020a0",
              700: "#481878",
              800: "#301050",
              900: "#180828",
              DEFAULT: "#7828c8",
              foreground: "#ffffff",
            },
          },
        },
        dark: {
          colors: {
            background: "#000000",
            foreground: "#ECEDEE",
            primary: {
              50: "#001731",
              100: "#002e62",
              200: "#004493",
              300: "#005bc4",
              400: "#006FEE",
              500: "#338ef7",
              600: "#66aaf9",
              700: "#99c7fb",
              800: "#cce3fd",
              900: "#e6f1fe",
              DEFAULT: "#006FEE",
              foreground: "#ffffff",
            },
            secondary: {
              50: "#180828",
              100: "#301050",
              200: "#481878",
              300: "#6020a0",
              400: "#7828c8",
              500: "#9353d3",
              600: "#ae7ede",
              700: "#c9a9e9",
              800: "#e4d4f4",
              900: "#f2eafa",
              DEFAULT: "#9353d3",
              foreground: "#ffffff",
            },
          },
        },
      },
    }),
  ],
};