// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-11-01',
	ssr: false,
	devtools: { enabled: true },
	css: ['~/assets/css/main.css'],

	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},

	modules: ['@nuxtjs/tailwindcss', 'nuxt-lucide-icons', 'shadcn-nuxt'],
})