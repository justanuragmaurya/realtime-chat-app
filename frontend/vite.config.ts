import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Listen on all interfaces (allows access from other devices)
    port: 5173,        // Optional: Set a specific port number (change if needed)
  }
})
