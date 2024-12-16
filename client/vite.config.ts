import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@api": "/src/api",
      "@components": "/src/components",
      "@hooks": "/src/hooks",
      "@providers": "/src/providers",
    },
  },
});
