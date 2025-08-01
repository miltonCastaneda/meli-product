import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    globals: true,
    exclude: ['**/node_modules/**', '**/dist/**', '**/tests/**'], // Exclude Playwright tests
    coverage: {
      provider: 'v8', // or 'istanbul'
      reporter: ['text', 'html'], // 'text' for console, 'html' for HTML report
      reportsDirectory: './coverage',
      exclude: [
        'src/App.jsx',
        'src/main.jsx',
        'playwright.config.js',
        'src/components/layout/Header.jsx',
        '**/index.js',
        'src/features/product-detail/components/Breadcrumbs.jsx',
        'src/features/product-detail/components/SidebarRelatedProducts.jsx',
        '**/*.config.js',
        'src/components/icons/**'
      ]
    },
  },
});
