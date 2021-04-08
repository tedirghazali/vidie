import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: 'src/lib.ts',
      name: 'vidie'
    },
    rollupOptions: {
      external: ['vue', 'alga-js', 'alga-css'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
