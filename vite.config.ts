// https://zenn.dev/drop_table_user/articles/7b043bef6cec29
// https://miyauchi.dev/ja/posts/lib-vite-tailwindcss/

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';
import { peerDependencies, dependencies } from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'syg-vue-tabs',
      formats: ['es', 'cjs'],
      fileName: (format) => `vue-tabs.${format}.js`,
    },
    rollupOptions: {
      external: [...Object.keys(peerDependencies), ...Object.keys(dependencies)],
      output: {
        external: ['vue'],
      },
    },
    target: 'esnext',
    sourcemap: true,
  },
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src'),
    },
  },
  plugins: [vue()],
})
