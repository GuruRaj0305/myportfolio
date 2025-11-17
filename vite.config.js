import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    chunkSizeWarningLimit: 500, // optional, increases warning limit
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          router: ["react-router-dom"],
          gsap: ["gsap", "@gsap/react"],
          slick: ["react-slick", "slick-carousel"],
          icons: ["lucide-react"],
        },
      },
    },
  },
})

