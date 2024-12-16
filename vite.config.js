// vite.config.js
import { defineConfig } from "vite";

export default defineConfig({
  server: { fs: { strict: false } },
  base: "./", // Ensures relative paths for assets in subpages
});
