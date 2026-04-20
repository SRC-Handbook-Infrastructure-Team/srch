import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";

function regenerateMarkdownCaches() {
  const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
  const result = spawnSync(npmCommand, ["run", "export-index"], {
    stdio: "inherit",
  });

  if (result.status !== 0) {
    console.error("Failed to regenerate markdown caches via export-index");
  }
}

function markdownCacheWatchPlugin() {
  let debounceTimer = null;

  return {
    name: "markdown-cache-watch",
    apply: "serve",
    configureServer(server) {
      const markdownRoot = path.resolve(process.cwd(), "src/markdown");

      const isMarkdownSource = (filePath) => {
        const normalized = path.resolve(filePath);
        return (
          normalized.startsWith(markdownRoot) && normalized.endsWith(".md")
        );
      };

      const onMarkdownChange = (filePath) => {
        if (!isMarkdownSource(filePath)) return;

        if (debounceTimer) {
          clearTimeout(debounceTimer);
        }

        debounceTimer = setTimeout(() => {
          regenerateMarkdownCaches();
          server.ws.send({ type: "full-reload" });
        }, 250);
      };

      server.watcher.on("add", onMarkdownChange);
      server.watcher.on("change", onMarkdownChange);
      server.watcher.on("unlink", onMarkdownChange);
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    markdownCacheWatchPlugin(),
    {
      name: "copy-index-to-404",
      apply: "build",
      closeBundle() {
        const indexPath = path.join(process.cwd(), "dist/index.html");
        const notFoundPath = path.join(process.cwd(), "dist/404.html");
        fs.copyFileSync(indexPath, notFoundPath);
        console.log("✅ Copied index.html to 404.html");
      },
    },
  ],
  base: process.env.VITE_BASE || "/",
});
