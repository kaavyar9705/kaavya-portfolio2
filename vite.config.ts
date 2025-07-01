import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/kaavya-portfolio2/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
