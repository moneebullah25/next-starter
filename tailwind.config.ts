import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./hoc/**/*.{ts,tsx}",
    "./utils/**/*.{ts,tsx}",
    "./config/**/*.{ts,tsx}",
    "./context/**/*.{ts,tsx}"
  ],
  darkMode: "class"
} satisfies Config;
