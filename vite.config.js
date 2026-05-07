import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({

server: {
    port: 8080,
    // strictPort: true, // forces port 3000, won't switch to another
  },



  plugins: [react()],
})
