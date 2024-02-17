import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "node:path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@component": resolve(__dirname, "./src/components"),
      "@ui": resolve(__dirname, "./src/components/ui"),
      "@event": resolve(__dirname, "./src/lib/event"),
      "@auth": resolve(__dirname, "./src/lib/auth"),
      "@hook": resolve(__dirname, "./src/hooks"),
      "@lib": resolve(__dirname, "./src/lib")
    }
  },
  build: {
    outDir: "../resources/static/",
    emptyOutDir: true
  }
})
