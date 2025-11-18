import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // Base alias
      '@': path.resolve(__dirname, './src'),
      
      // Feature-Sliced Design layers
      '@shared': path.resolve(__dirname, './src/shared'),
      '@entities': path.resolve(__dirname, './src/entities'),
      '@components': path.resolve(__dirname, './src/components'),
      '@assets': path.resolve(__dirname, './src/assets'),
      
      // Shared sub-layers
      '@shared/ui': path.resolve(__dirname, './src/shared/ui'),
      '@shared/lib': path.resolve(__dirname, './src/shared/lib'),
    },
  },
})
