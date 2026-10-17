import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        slate: {
          850: "#131b2e",
          900: "#0f172a",
          950: "#020617",
        },
        risk: {
          low: "#10b981", // emerald-500
          moderate: "#f59e0b", // amber-500
          high: "#f43f5e", // rose-500
          buffer: "#6366f1", // indigo-500
        },
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "ping-slow": "ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
