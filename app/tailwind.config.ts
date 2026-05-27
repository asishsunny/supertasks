import type { Config } from "tailwindcss";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const medusaPreset = require("@medusajs/ui-preset");

const config: Config = {
  presets: [medusaPreset as Config],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@medusajs/ui/dist/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        "ui-bg-kanban-column": "var(--bg-kanban-column)",
        "ui-bg-segment-control": "var(--bg-segment-control)",
      },
    },
  },
  plugins: [],
};

export default config;
