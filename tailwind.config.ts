import type { Config } from "tailwindcss"
import { semanticColors } from "./tailwind.tokens"

const config: Config = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: semanticColors,
    },
  },
  plugins: [],
}

export default config
