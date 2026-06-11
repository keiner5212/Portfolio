import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				cyan: "hsl(var(--brand-cyan))",
				amber: "hsl(var(--brand-amber))",
				violet: "hsl(var(--brand-violet))",
				"surface-1": "hsl(var(--surface-1))",
				"surface-2": "hsl(var(--surface-2))",
				"surface-3": "hsl(var(--surface-3))",
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
				xl: "calc(var(--radius) + 4px)",
				"2xl": "calc(var(--radius) + 8px)",
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
				"gradient-primary": "var(--gradient-primary)",
				"gradient-text": "var(--gradient-text)",
				"gradient-divider": "var(--gradient-divider)",
				"gradient-radial-spot": "var(--gradient-radial-spot)",
				"gradient-border": "var(--gradient-border)",
			},
			boxShadow: {
				"glow-primary": "var(--shadow-glow-primary)",
				"card-hover": "var(--shadow-card-hover)",
				"card-hover-dark": "var(--shadow-card-hover-dark)",
			},
			fontFamily: {
				heading: ["var(--font-heading)", "system-ui", "sans-serif"],
				body: ["var(--font-body)", "system-ui", "sans-serif"],
				mono: [
					"ui-monospace",
					"SFMono-Regular",
					"Menlo",
					"monospace",
				],
			},
			letterSpacing: {
				tightest: "-0.04em",
				tighter: "-0.03em",
				tight: "-0.025em",
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
				"glow-pulse": {
					"0%,100%": { opacity: "0.55" },
					"50%": { opacity: "1" },
				},
				"float-slow": {
					"0%,100%": { transform: "translateY(0)" },
					"50%": { transform: "translateY(-10px)" },
				},
				"float-slower": {
					"0%,100%": { transform: "translateY(0)" },
					"50%": { transform: "translateY(-18px)" },
				},
				"spin-slow": {
					from: { transform: "rotate(0deg)" },
					to: { transform: "rotate(360deg)" },
				},
				shimmer: {
					"0%": { backgroundPosition: "-200% 0" },
					"100%": { backgroundPosition: "200% 0" },
				},
				marquee: {
					"0%": { transform: "translateX(0)" },
					"100%": { transform: "translateX(-50%)" },
				},
				"points-drift": {
					"0%": { transform: "translate3d(0, 0, 0)" },
					"50%": { transform: "translate3d(24px, -18px, 0)" },
					"100%": { transform: "translate3d(0, 0, 0)" },
				},
				"points-twinkle": {
					"0%, 100%": { opacity: "0.35" },
					"50%": { opacity: "0.9" },
				},
				"spotlight-sway": {
					"0%, 100%": { transform: "translateX(-14%) rotate(-3deg) scaleY(1)", opacity: "0.85" },
					"50%": { transform: "translateX(14%) rotate(3deg) scaleY(1.06)", opacity: "1" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"glow-pulse": "glow-pulse 3.5s ease-in-out infinite",
				"float-slow": "float-slow 7s ease-in-out infinite",
				"float-slower": "float-slower 11s ease-in-out infinite",
				"spin-slow": "spin-slow 22s linear infinite",
				shimmer: "shimmer 8s linear infinite",
				marquee: "marquee 40s linear infinite",
				"points-drift": "points-drift 18s ease-in-out infinite",
				"points-twinkle": "points-twinkle 4s ease-in-out infinite",
				"spotlight-sway": "spotlight-sway 5.5s ease-in-out infinite",
			},
			transitionTimingFunction: {
				"out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
				"out-quart": "cubic-bezier(0.25, 1, 0.5, 1)",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};
export default config;
