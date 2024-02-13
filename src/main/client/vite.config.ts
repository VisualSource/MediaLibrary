import { defineConfig } from 'vite'
import { resolve } from 'node:path';
import react from '@vitejs/plugin-react-swc';
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@/components": resolve(__dirname, "./src/components")
    }
  },
  build: {
    outDir: "../resources/static/",
    emptyOutDir: true
  }
})
