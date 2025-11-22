import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			'@components': resolve(
				dirname(fileURLToPath(import.meta.url)),
				'src/components'
			),
			'@constants': resolve(
				dirname(fileURLToPath(import.meta.url)),
				'src/constants'
			),
			'@store': resolve(dirname(fileURLToPath(import.meta.url)), 'src/store'),
			'@hoc': resolve(dirname(fileURLToPath(import.meta.url)), 'src/hoc'),
			'@windows': resolve(
				dirname(fileURLToPath(import.meta.url)),
				'src/windows'
			),
			'@gsap': resolve(dirname(fileURLToPath(import.meta.url)), 'src/gsap'),
		},
	},
})
