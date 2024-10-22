import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/payment-donation-app/', // Add this line to specify the base URL for GitHub Pages
  build: {
    chunkSizeWarningLimit: 1000, // Increase chunk size warning limit (in KB)
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        },
      },
    },
  },
});
