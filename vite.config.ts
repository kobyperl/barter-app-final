import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
rollupOptions: {
      external: [
        // הוספנו את התיקון הזה כדי לפתור את שגיאת Rollup
        '@google/generative-ai'
      ]
    }
  }
});