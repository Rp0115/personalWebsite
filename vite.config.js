import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/** Repo: https://github.com/Rp0115/personalWebsite → https://rp0115.github.io/personalWebsite/ */
export default defineConfig({
  base: '/personalWebsite/',
  plugins: [react()],
})
