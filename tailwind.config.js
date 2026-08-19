/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#0D1F1A',
          deep: '#07120E',
          surface: '#142C25',
          light: '#1D3D34'
        },
        parchment: {
          DEFAULT: '#F5F2EB',
          light: '#FAF8F4',
          dark: '#EBE5D8',
          card: '#FFFFFF'
        },
        green: {
          DEFAULT: '#2D6A4F',
          dark: '#1B4332',
          light: '#40916C',
          bright: '#52B788',
          mint: '#D8F3DC'
        },
        amber: {
          DEFAULT: '#E9C46A',
          dark: '#C89D34',
          light: '#F4A261',
          soft: '#FEF3C7',
          glow: 'rgba(233, 196, 106, 0.25)'
        },
        teal: {
          DEFAULT: '#264653',
          dark: '#1A303A',
          light: '#2A9D8F',
          soft: '#E0F2F1'
        },
        sand: {
          DEFAULT: '#D5CCBA',
          light: '#E8E3D7',
          dark: '#B8AD96'
        },
        error: {
          DEFAULT: '#D85A30',
          light: '#FBE9E7'
        }
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
        body: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'blink': 'blink 1s step-start infinite',
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'marquee': 'marquee 28s linear infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.03)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(13, 31, 26, 0.05)',
        'card-hover': '0 12px 30px -4px rgba(13, 31, 26, 0.12)',
        'card-dark': '0 4px 20px -2px rgba(0, 0, 0, 0.3)',
        'glow-green': '0 0 25px rgba(45, 106, 79, 0.3)',
        'glow-amber': '0 0 25px rgba(233, 196, 106, 0.35)',
      },
    },
  },
  plugins: [],
}
