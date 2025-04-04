import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/', // ✅ Needed for correct script paths in Azure
  plugins: [react()],
  build: {
    outDir: 'build', // ✅ Must match your GitHub Actions config
    emptyOutDir: true
  }
})
