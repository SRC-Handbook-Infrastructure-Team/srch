/**
 * index.js
 *
 * Express server for the SRCH Handbook back-end.
 *
 * Serves the SQLite-backed REST API for sections, subsections, and search.
 * Run `node scripts/buildDb.js` first to populate the database.
 *
 * Usage:
 *   node index.js [port]
 *
 * Environment variables:
 *   PORT           - Port to listen on (default: 3001)
 *   ALLOWED_ORIGIN - Allowed CORS origin (default: http://localhost:5173)
 */

const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const contentRoutes = require("./routes/content");
const searchRoutes = require("./routes/search");

const bootStartedAt = Date.now();
const PORT = parseInt(process.env.PORT, 10) || 3001;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "http://localhost:5173";

const app = express();

app.use(
  cors({
    origin: ALLOWED_ORIGIN,
    methods: ["GET"],
  })
);

app.use(express.json());

// Rate limit all API requests: 200 requests per minute per IP
const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests, please try again later." },
});

app.use("/api", apiLimiter);

// API routes
app.use("/api", contentRoutes);
app.use("/api", searchRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  const readyMs = Date.now() - bootStartedAt;
  const localUrl = `http://localhost:${PORT}/`;
  const linkedLocalUrl = process.stdout.isTTY
    ? `\u001b]8;;${localUrl}\u001b\\${localUrl}\u001b]8;;\u001b\\`
    : localUrl;

  console.log(`\n  SRCH v1.0  ready in ${readyMs} ms\n`);
  console.log(`  ->  Local:   ${linkedLocalUrl}`);
  console.log("  ->  press Ctrl+C to stop");
  console.log("");
});

module.exports = app;
