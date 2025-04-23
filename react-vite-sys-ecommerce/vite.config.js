import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
// dev_1 fruit
export default defineConfig({
  plugins: [react()],
  resolve:{
    alies:[
      {find: '@', replacement:path.resolve(__dirname, 'src')}
    ]
  }
})
