/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				primary: {
					50: "#f0f9ff",
					100: "#e0f2fe",
					200: "#bae6fd",
					300: "#7dd3fc",
					400: "#38bdf8",
					500: "#0ea5e9",
					600: "#0284c7",
					700: "#0369a1",
					800: "#075985",
					900: "#0c4a6e",
				},
				secondary: {
					50: "#fdf4ff",
					100: "#fae8ff",
					200: "#f5d0fe",
					300: "#f0abfc",
					400: "#e879f9",
					500: "#d946ef",
					600: "#c026d3",
					700: "#a21caf",
					800: "#86198f",
					900: "#701a75",
				},
			},
			fontFamily: {
				display: ["Inter", "system-ui", "sans-serif"],
				sans: ["Inter", "system-ui", "sans-serif"],
			},
			animation: {
				"fade-in": "fadeIn 0.6s ease-out",
				"slide-up": "slideUp 0.5s ease-out",
				"scale-in": "scaleIn 0.4s ease-out",
				float: "float 6s ease-in-out infinite",
			},
			keyframes: {
				fadeIn: {
					"0%": { opacity: "0", transform: "translateY(10px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
				slideUp: {
					"0%": { opacity: "0", transform: "translateY(20px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
				scaleIn: {
					"0%": { opacity: "0", transform: "scale(0.9)" },
					"100%": { opacity: "1", transform: "scale(1)" },
				},
				float: {
					"0%, 100%": { transform: "translateY(0px)" },
					"50%": { transform: "translateY(-10px)" },
				},
			},
			boxShadow: {
				soft: "0 4px 20px 0 rgba(0, 0, 0, 0.05)",
				medium: "0 8px 30px 0 rgba(0, 0, 0, 0.08)",
				large: "0 20px 50px 0 rgba(0, 0, 0, 0.12)",
				glow: "0 0 40px 0 rgba(14, 165, 233, 0.15)",
			},
			backdropBlur: {
				xs: "2px",
			},
		},
	},
	plugins: [],
};
