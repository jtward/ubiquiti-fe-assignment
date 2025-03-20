import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // Use jsdom for React component testing
    globals: true, // Enables global APIs like `describe`, `it`, etc.
    setupFiles: './src/setupTests.ts', // Optional: For setup code (see step 3)
  },
});
