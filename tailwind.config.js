/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		"./src/styles/**/*.{css,scss}"
	],
	// classes used inside CSS via @apply that may not appear in JSX
	safelist: [
		'font-playfair',
	],
	theme: {
		extend: {
			fontFamily: {
				playfair: ["Playfair Display", "serif"],
				inter: ["Inter", "sans-serif"],
			},
			colors: {
				primary: {
					50: "#fdf2f4",
					100: "#fce7eb",
					200: "#f8cfd7",
					300: "#f4a7bf",
					400: "#ed7ca0",
					500: "#e4567f",
					600: "#c41e3a",
					700: "#a81839",
					800: "#8b0000",
					900: "#6b0021",
				},
				accent: {
					50: "#faf8f5",
					100: "#f1e5d5",
					200: "#e6d4b0",
					300: "#dcc08b",
					400: "#d4a574",
					500: "#c9925d",
					600: "#b87d45",
					700: "#a67c52",
					800: "#7d5f3c",
					900: "#5a4428",
				},
				campaign: {
					red: "#c41e3a",
					gold: "#d4a574",
					navy: "#1a2e5a",
					white: "#ffffff",
					cream: "#faf5f0",
				},
			},
			boxShadow: {
				sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
				base: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
				md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
				lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
				xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
				"2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
				premium: "0 20px 40px -10px rgba(196, 30, 58, 0.15)",
			},
			spacing: {
				"0": "0",
				"1": "0.25rem",
				"2": "0.5rem",
				"3": "0.75rem",
				"4": "1rem",
				"5": "1.25rem",
				"6": "1.5rem",
				"8": "2rem",
				"12": "3rem",
				"16": "4rem",
				"20": "5rem",
				"24": "6rem",
			},
			borderRadius: {
				none: "0",
				sm: "0.375rem",
				base: "0.5rem",
				md: "0.75rem",
				lg: "1rem",
				xl: "1.25rem",
				"2xl": "1.5rem",
				"3xl": "2rem",
				full: "9999px",
			},
		},
	},
	plugins: [],
};
