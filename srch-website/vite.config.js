import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "copy-index-to-404",
      apply: "build",
      closeBundle() {
        const indexPath = path.resolve(__dirname, "dist/index.html");
        const notFoundPath = path.resolve(__dirname, "dist/404.html");
        fs.copyFileSync(indexPath, notFoundPath);
        console.log("✅ Copied index.html to 404.html");
      },
    },
  ],
  base: "/srch-s25/",
});
