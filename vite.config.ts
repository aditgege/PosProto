import ui from '@nuxt/ui/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { cloudflare } from "@cloudflare/vite-plugin";
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), ui({
    ui: {
      colors: {
        primary: 'rose',
        neutral: 'zinc',
      },
    },
  }), cloudflare()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})