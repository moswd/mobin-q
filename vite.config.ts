import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@assets': resolve(__dirname, './src/assets'),
      '@components': resolve(__dirname, './src/components'),
      '@hooks': resolve(__dirname, './src/hooks'),
      '@layouts': resolve(__dirname, './src/layouts'),
      '@providers': resolve(__dirname, './src/providers'),
      '@utils': resolve(__dirname, './src/utils')
    }
  },
  plugins: [react()]
})
