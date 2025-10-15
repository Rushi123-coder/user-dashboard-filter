import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { open: true },
   test: {
    globals: true,          // ← This allows 'expect' and 'it' without import
    environment: 'jsdom',   // ← Needed for React DOM testing
  },
});
