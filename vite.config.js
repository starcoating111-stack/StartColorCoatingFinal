import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/starcolourscoating',
  server: {
    host: true,      // allows local network testing, remove if unnecessary
    port: 5173,      // fixed port for consistency
  },
  build: {
    outDir: 'dist',  // production build folder
    sourcemap: false, // disable source maps in prod
    minify: 'esbuild', // use esbuild for faster minification
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor dependencies into separate chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'sanity-vendor': ['@sanity/client', '@sanity/image-url'],
          'animation-vendor': ['framer-motion', 'react-scroll-parallax'],
          'ui-vendor': ['@heroicons/react', 'lucide-react', 'react-icons'],
          'masonry': ['react-masonry-css'],
        },
      },
    },
    chunkSizeWarningLimit: 600, // increase limit slightly since we're optimizing
    cssCodeSplit: true, // split CSS into separate files
    reportCompressedSize: true,
    target: 'esnext', // target modern browsers for smaller bundles
  },
  // Optimizations for dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@sanity/client',
      '@sanity/image-url',
      'framer-motion',
      'react-icons',
      'lucide-react',
    ],
  },
})
