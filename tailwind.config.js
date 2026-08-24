/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F8F5F0',
        surface: '#EFE8DD',
        card: '#EFE8DD',
        primary: '#111111',
        secondary: '#5B5B5B',
        accent: '#C8A977',
        highlight: '#C8A977',
        success: '#2E7D32',
        hover: '#1F2937',
        muted: '#9B9B9B',
        cream: '#E8DDCF',
        'glass-border': 'rgba(0, 0, 0, 0.08)',
        'glass-bg': 'rgba(255, 255, 255, 0.65)',
        'glass-bg-hover': 'rgba(255, 255, 255, 0.85)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'mesh-gradient': 'radial-gradient(at 30% 20%, rgba(232, 221, 207, 0.8) 0px, transparent 50%), radial-gradient(at 80% 10%, rgba(248, 245, 240, 0.9) 0px, transparent 50%), radial-gradient(at 10% 70%, rgba(239, 232, 221, 0.7) 0px, transparent 50%), radial-gradient(at 70% 80%, rgba(200, 169, 119, 0.08) 0px, transparent 50%)',
      },
      animation: {
        'float': 'float 8s ease-in-out infinite',
        'float-slow': 'float-slow 12s ease-in-out infinite',
        'float-slower': 'float-slower 16s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 6s ease-in-out infinite',
        'spin-slow': 'spin-slow 25s linear infinite',
        'grid-fade': 'grid-fade 6s ease-in-out infinite',
        'typing-cursor': 'typing-cursor 1s ease-in-out infinite',
        'ring-rotate': 'ring-rotate 10s linear infinite',
        'ring-rotate-reverse': 'ring-rotate-reverse 15s linear infinite',
        'particle-drift': 'particle-drift 20s ease-in-out infinite',
        'scroll-indicator': 'scroll-indicator 2s ease-in-out infinite',
        'grain': 'grain 0.5s steps(1) infinite',
      },
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(3deg)' },
        },
        'float-slower': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-8px) rotate(-2deg)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.03)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'grid-fade': {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.5' },
        },
        'typing-cursor': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'ring-rotate': {
          '0%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
          '100%': { transform: 'translate(-50%, -50%) rotate(360deg)' },
        },
        'ring-rotate-reverse': {
          '0%': { transform: 'translate(-50%, -50%) rotate(360deg)' },
          '100%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
        },
        'particle-drift': {
          '0%': { transform: 'translateY(100vh) translateX(0)', opacity: '0' },
          '10%': { opacity: '0.6' },
          '90%': { opacity: '0.6' },
          '100%': { transform: 'translateY(-10vh) translateX(20px)', opacity: '0' },
        },
        'scroll-indicator': {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '50%': { transform: 'translateY(8px)', opacity: '0.3' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'grain': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-2%, -3%)' },
          '20%': { transform: 'translate(3%, 2%)' },
          '30%': { transform: 'translate(-1%, 4%)' },
          '40%': { transform: 'translate(4%, -1%)' },
          '50%': { transform: 'translate(-3%, 3%)' },
          '60%': { transform: 'translate(2%, -4%)' },
          '70%': { transform: 'translate(-4%, 2%)' },
          '80%': { transform: 'translate(3%, -2%)' },
          '90%': { transform: 'translate(-2%, 4%)' },
        },
      },
      boxShadow: {
        'luxury': '0 4px 24px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0, 0, 0, 0.04)',
        'luxury-hover': '0 12px 40px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.06)',
        'luxury-card': '0 2px 16px rgba(0, 0, 0, 0.06)',
        'luxury-card-hover': '0 8px 32px rgba(0, 0, 0, 0.10)',
        'glow-gold': '0 0 20px rgba(200, 169, 119, 0.25), 0 0 40px rgba(200, 169, 119, 0.10)',
        'glow-black': '0 0 20px rgba(0, 0, 0, 0.12)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.08)',
        'glass-hover': '0 16px 48px rgba(0, 0, 0, 0.12), 0 4px 16px rgba(200, 169, 119, 0.1)',
      },
    },
  },
  plugins: [],
}
