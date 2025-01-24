import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5012,
    watch: {
      usePolling: true,
    },
    proxy: {
      "/api": {
        target: "http://backend:5011",
        changeOrigin: true,
      },
    },
  },
});
