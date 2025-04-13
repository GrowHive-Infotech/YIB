import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/', // ✅ Needed for correct script paths in Azure
  plugins: [react(),tailwindcss()],
  build: {
    outDir: 'build', // ✅ Must match your GitHub Actions config
    emptyOutDir: true
  }
})
