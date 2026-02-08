import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'forest': '#1F3D2B', // Deep Forest Green
        'sand': '#E6E0D4',   // Soft Sand
        'charcoal': '#4A4A4A', // Slate Grey (Mapping charcoal to slate grey for backward compatibility)
        'slate-grey': '#4A4A4A', // Explicit Slate Grey
        'off-white': '#F4F4F2', // Off White
        'clay': '#C46A3A',   // Terracotta
        'terracotta': '#C46A3A', // Explicit Terracotta
        'sky': '#6FA8DC', // Keeping existing sky blue if needed, or remove if strictly following brand kit? Brand kit says "Drainage: Blue", so keep a blue.
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-dm-serif)', 'serif'], // Keeping DM Serif for now as secondary or remove? Brand Kit says Headings: Montserrat.
        // Let's keep serif for specific "serif" usages but default headings to Montserrat
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
