import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vitest/config';

export default defineConfig({
    plugins: [
        tailwindcss()
    ],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.ts',
    include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}']
  },
})