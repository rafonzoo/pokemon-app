import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '425px',
      },
      height: {
        '12.5': '3.125rem',
        '14.5': '3.625rem',
      },
      padding: {
        '7.5': '1.875rem',
      },
      borderRadius: {
        '2lg': '0.625rem',
        '2.5xl': '1.25rem',
        '4xl': '1.875rem',
      },
    },
  },
  plugins: [],
}
export default config
