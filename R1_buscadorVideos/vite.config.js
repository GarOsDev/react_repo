import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true, // Esta línea fuerza a Vite a revisar cambios de archivos de manera efectiva en WSL
    },
    host: true, // Esto permite que Vite use la red local
    port: 5181,
   }, // Puedes cambiar el puerto si es necesario
})
