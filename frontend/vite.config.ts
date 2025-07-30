import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwind from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwind()],
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src/components'),
      assets: path.resolve(__dirname, 'src/assets'),
      "design-system": path.resolve(__dirname, 'src/design-system'),
    },
  },
})
