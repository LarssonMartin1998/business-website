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
      "pages": path.resolve(__dirname, 'src/pages'),
      "api": path.resolve(__dirname, 'src/api'),
      "utils": path.resolve(__dirname, 'src/utils'),
      "hooks": path.resolve(__dirname, 'src/hooks'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false
      },
      '/rss': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(/^\/rss\/?$/, '/api/v1/rss'),
      },
      '/feed': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(/^\/feed\/?$/, '/api/v1/rss'),
      },
    }
  }
})
