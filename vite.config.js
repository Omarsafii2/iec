import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const drupalUrl = env.VITE_DRUPAL_URL || 'http://localhost:8000'

  return {
    plugins: [react()],
    server: {
      port: 3000,
      proxy: {
        // Proxy for general Drupal API calls — strips /api prefix
        '/api': {
          target: drupalUrl,
          changeOrigin: true,
          secure: drupalUrl.startsWith('https'),
          rewrite: (path) => path.replace(/^\/api/, '')
        },
        // ✅ Proxy for custom file upload module — NO rewrite, path stays as-is
        '/webform-file-upload': {
          target: drupalUrl,
          changeOrigin: true,
          secure: drupalUrl.startsWith('https'),
        }
      }
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
      manifest: true
    }
  }
})