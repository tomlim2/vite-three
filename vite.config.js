import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import restart from "vite-plugin-restart";
import glsl from "vite-plugin-glsl";

export default defineConfig({
  server: { fs: { strict: false } },
  base: "./", // Ensures relative paths for assets in subpages
  plugins: [
    restart({ restart: "../static/**" }), // Restart server when files in static folder change
    react(),
    glsl(),
  ],
});
