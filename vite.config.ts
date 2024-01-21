import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  root: `${path.resolve(__dirname, 'client')}`,
  plugins: [
    Vue(),
    Components({
      dirs: ['src/components'],
      dts: true,
      include: [/\.vue$/, /\.vue\?vue/]
    }),
    AutoImport({
      dts: 'src/auto-imports.d.ts',
      imports: ['vue', 'vue-router'],
      vueTemplate: true,
    }),
  ],
  // Additional Vite-specific configurations
  optimizeDeps: {
    include: ['vue', 'vue-router'],
  }
})
