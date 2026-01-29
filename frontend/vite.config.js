import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => ({
  server: {
      host: '0.0.0.0',
      port: loadEnv(mode, process.cwd()).VITE_DEV_PORT,
    },
  plugins: [
    vue()
  ]
  })
)
