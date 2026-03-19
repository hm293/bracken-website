import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'bracken-taupe': '#9B8B7A',
        'ritual-cream': '#FAF7F2',
        'warm-sand': '#F0E8DC',
        'burnished-brass': '#B8976A',
        'deep-earth': '#2C241E',
        'stone': '#6B5E52',
        'soft-linen': '#E8DFD3',
        'charcoal-root': '#3D3228',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['Lora', 'Georgia', 'serif'],
        sans: ['Raleway', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
      },
    },
  },
  plugins: [],
}

export default config
