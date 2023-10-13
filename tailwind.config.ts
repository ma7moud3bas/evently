import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/stories/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        error: {
          300: "#FDA29B",
          500: "#E46D64"
        },
        primary: {
          200: "#EEEEEE",
          300: "#D6D6D6",
          400: "#9A9A9A",
          500: "#828282",
          700: "#404040"
        },
        gray: {
          200: "#BABABA",
          300: "#989898",
          400: "#757575",
          500: "#535353",
          600: "#484848",
          700: "#3C3C3C",
          800: "#2E2E2E",
          900: "#252525",
          1000: "#1A1A1A"
        }
      }
    },
  },
  plugins: [],
}
export default config
