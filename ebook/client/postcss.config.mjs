const config = {
  plugins: ["@tailwindcss/postcss"],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ["var(--font-satoshi)"],
        geist: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
    },
  },
};

export default config;
