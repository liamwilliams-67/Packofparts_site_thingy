import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        contact: resolve(__dirname, "contact.html"),
        join: resolve(__dirname, "join.html"),
        meetTheTeam: resolve(__dirname, "meet-the-team.html"),
        stemKits: resolve(__dirname, "stem-kits.html"),
        recycling: resolve(__dirname, "recycling.html"),
      },
    },
  },
});
