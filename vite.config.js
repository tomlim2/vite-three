import glsl from "vite-plugin-glsl";
import restart from "vite-plugin-restart";

// vite.config.js
import { defineConfig } from "vite";

export default defineConfig({
  server: { fs: { strict: false } },
  base: "./", // Ensures relative paths for assets in subpages
  plugins: [
    restart({ restart: "../static/**" }), // Restart server when files in static folder change
    glsl(),
  ],
});
