import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";

function copyIndexTo404() {
  return {
    name: "copy-index-to-404",
    apply: "build",
    writeBundle(options) {
      const outDir = options.dir || "dist";
      const indexPath = path.join(outDir, "index.html");
      const notFoundPath = path.join(outDir, "404.html");

      if (fs.existsSync(indexPath)) {
        fs.copyFileSync(indexPath, notFoundPath);
      } else {
        console.warn("index.html not found, skipping 404 copy");
      }
    },
  };
}

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
  base: process.env.VITE_BASE || "/",
  plugins: [copyIndexTo404(), react(), markdownCacheWatchPlugin()],
  optimizeDeps: {
    include: ["react", "react-dom", "react/jsx-runtime"],
  },
  ssr: {
    noExternal: ["@ark-ui/react"],
  },
  resolve: {
    dedupe: ["react", "react-dom"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-markdown": ["react-markdown", "remark-gfm", "rehype-raw"],
          "vendor-icons": ["react-icons"],
          "vendor-ui": ["@chakra-ui/react"],
        },
      },
    },
  },
});
