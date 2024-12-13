const animate = require("tailwindcss-animate")

module.exports = {
	darkMode: ["class"],
	safelist: ["dark"],

	content: [
		"./components/**/*.{js,vue,ts}",
		"./layouts/**/*.vue",
		"./pages/**/*.vue",
		"./plugins/**/*.{js,ts}",
		"./app.vue",
		"./error.vue",
		'./node_modules/shadcn-vue/**/*.js', // Include shadcn-vue
	],
	theme: {
		container: {
			center: true,
		},
		extend: {
			fontFamily: {
				sans: ["Funnel Sans", "sans-serif"],
				serif: ["Sour Gummy", "serif"],
			},
			colors: {
				pale: "#fff7f4",
				purple: "#201b6e",
				blue: "#114ef5",
				pink: "#e8387b",
				green: "#4acc6f",
				text: "#261503",
			},
			keyframes: {
				"accordion-down": {
				from: { height: 0 },
				to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
				from: { height: "var(--radix-accordion-content-height)" },
				to: { height: 0 },
				},
				"collapsible-down": {
				from: { height: 0 },
				to: { height: 'var(--radix-collapsible-content-height)' },
				},
				"collapsible-up": {
				from: { height: 'var(--radix-collapsible-content-height)' },
				to: { height: 0 },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"collapsible-down": "collapsible-down 0.2s ease-in-out",
				"collapsible-up": "collapsible-up 0.2s ease-in-out",
			},
		},
	},
	plugins: [
		animate,
		require('@tailwindcss/typography'),
	],
}