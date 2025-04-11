import { defineConfig } from 'vite'


// https://vite.dev/config/
export default defineConfig({
  preprocessorOptions: {
    scss: {
      additionalData: `
        @import "./style.sass"
      `
    }
  }
})
