import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // שמרנו את ההגדרה הקיימת שלך
    rollupOptions: {
      external: [
        // הוספנו את ההגדרה הזו כדי לפתור את שגיאת Rollup
        '@google/generative-ai'
      ]
    }
  }
})