import react from '@vitejs/plugin-react'
import {configDefaults, defineConfig} from 'vitest/config'

export default defineConfig({
	plugins: [react()],
	test: {
		reporters: ['junit', 'verbose'],
		environment: 'jsdom',
		globals: true,
		outputFile: {
			junit: './junit.xml'
		},
		exclude: [...configDefaults.exclude, 'tests/e2e/**'],
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html']
		},
		setupFiles: ['./src/setupTests.ts']
	}
})
