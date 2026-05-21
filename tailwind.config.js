/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Team colors
        navy: "#182651",
        "light-blue": "#80D3EE",
        "secondary-blue": "#7FC3F2",
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        'open-sans': ['Open Sans', 'sans-serif'],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
        'pill': '50px',
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        'glass': '0 8px 32px rgba(24, 38, 81, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        'glow': '0 0 20px rgba(128, 211, 238, 0.4)',
        'glow-lg': '0 0 40px rgba(128, 211, 238, 0.5), 0 0 80px rgba(128, 211, 238, 0.15)',
        'navy-glow': '0 0 30px rgba(24, 38, 81, 0.4)',
        'card': '0 4px 24px rgba(24, 38, 81, 0.08)',
        'card-hover': '0 16px 48px rgba(24, 38, 81, 0.18)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "marquee": {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(128, 211, 238, 0.4)" },
          "50%": { boxShadow: "0 0 0 15px rgba(128, 211, 238, 0)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-left": {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.8)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "scale-in-bounce": {
          "0%": { opacity: "0", transform: "scale(0.7)" },
          "70%": { transform: "scale(1.05)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "glow-breathe": {
          "0%, 100%": { boxShadow: "0 0 8px rgba(128, 211, 238, 0.3), 0 0 0 rgba(128, 211, 238, 0)" },
          "50%": { boxShadow: "0 0 30px rgba(128, 211, 238, 0.7), 0 0 60px rgba(128, 211, 238, 0.2)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "bounce-gentle": {
          "0%, 100%": { transform: "translateX(-50%) translateY(0)" },
          "50%": { transform: "translateX(-50%) translateY(-8px)" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        "count-pop": {
          "0%": { opacity: "0", transform: "translateY(16px) scale(0.8)" },
          "60%": { transform: "translateY(-4px) scale(1.05)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "border-glow": {
          "0%, 100%": { borderColor: "rgba(128, 211, 238, 0.2)" },
          "50%": { borderColor: "rgba(128, 211, 238, 0.7)" },
        },
        "slide-down": {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "marquee": "marquee 10s linear infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "float": "float 4s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.7s ease-out both",
        "slide-in-left": "slide-in-left 0.7s ease-out both",
        "slide-in-right": "slide-in-right 0.7s ease-out both",
        "scale-in": "scale-in 0.4s ease-out both",
        "scale-in-bounce": "scale-in-bounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both",
        "glow-breathe": "glow-breathe 3s ease-in-out infinite",
        "spin-slow": "spin-slow 8s linear infinite",
        "bounce-gentle": "bounce-gentle 2s ease-in-out infinite",
        "gradient-shift": "gradient-shift 4s ease infinite",
        "shimmer": "shimmer 2.5s linear infinite",
        "count-pop": "count-pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both",
        "border-glow": "border-glow 2.5s ease-in-out infinite",
        "slide-down": "slide-down 0.4s ease-out both",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
