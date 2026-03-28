import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0c0c0f",
        card: "#0d0d10",
        accent: "#cffe25",
        "accent-light": "#f3ff9b",
        "green-light": "#d8f7d6",
        stroke: "rgba(255,255,255,0.10)",
        "text-grey": "#888888",
      },
      fontFamily: {
        sans: ["BDO Grotesk", "Plus Jakarta Sans", "Arial", "sans-serif"],
      },
      fontSize: {
        h1: ["62px", { lineHeight: "70px", letterSpacing: "-0.03em" }],
        h2: ["48px", { lineHeight: "56px", letterSpacing: "-0.02em" }],
        h3: ["36px", { lineHeight: "44px", letterSpacing: "-0.02em" }],
        h4: ["28px", { lineHeight: "36px", letterSpacing: "-0.01em" }],
        h5: ["22px", { lineHeight: "30px", letterSpacing: "-0.01em" }],
        h6: ["18px", { lineHeight: "26px" }],
        "p-01": ["18px", { lineHeight: "28px" }],
        "p-02": ["16px", { lineHeight: "26px" }],
        "p-03": ["14px", { lineHeight: "22px" }],
        tag: ["14px", { lineHeight: "20px", letterSpacing: "0" }],
      },
      borderRadius: {
        sm: "7px",
        DEFAULT: "12px",
        md: "16px",
        lg: "20px",
        xl: "24px",
        "2xl": "30px",
        full: "100px",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(50px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        marquee: "marquee 25s linear infinite",
        "marquee-slow": "marquee 40s linear infinite",
        "marquee-reverse": "marquee-reverse 25s linear infinite",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
