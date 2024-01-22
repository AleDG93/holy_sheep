import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  root: `${path.resolve(__dirname, './')}`,
  plugins: [
    Vue(),
    Components({
      dirs: ['src/components'],
      dts: true,
    }),
    AutoImport({
      imports: ['vue', 'vue-router'],
      vueTemplate: true,
    }),
  ],
  // Additional Vite-specific configurations
  optimizeDeps: {
    include: ['vue', 'vue-router'],
  },
  build: {
    chunkSizeWarningLimit: 5000,
    commonjsOptions: {
      esmExternals: true,
    },
    sourcemap: process.env.SOURCE_MAP === 'true',
    outDir: './dist',
  },
  resolve: {
    preserveSymlinks: true,
    alias: [
      {
        find: '@',
        replacement: `${path.resolve(__dirname, 'src')}/`,
      },
      {
        find: '@commons',
        replacement: `${path.resolve(__dirname, '../commons/src')}/`,
      }]
  }
})
