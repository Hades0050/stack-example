import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      script: {
        defineModel: true,
        propsDestructure: true
      }
    })
  ],
  
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
  
  // Development server optimization
  server: {
    port: 5173,
    strictPort: false,
    host: true,
    open: false,
    cors: true,
    hmr: {
      overlay: true
    }
  },
  
  // Build optimization
  build: {
    target: 'esnext',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('vue')) {
              return 'vue-vendor'
            }
            return 'vendor'
          }
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    },
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
    reportCompressedSize: false,
    assetsInlineLimit: 4096
  },
  
  // Dependency optimization
  optimizeDeps: {
    include: ['vue', 'vue-router'],
    exclude: []
  },
  
  // CSS optimization
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/styles/variables.scss";`
      }
    }
  },
  
  // Preview server settings
  preview: {
    port: 4173,
    strictPort: false,
    host: true,
    open: false,
    cors: true
  }
})
