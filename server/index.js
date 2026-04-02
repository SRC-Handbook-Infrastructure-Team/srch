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
  console.log(`SRCH server listening on http://localhost:${PORT}`);
  console.log(`CORS allowed origin: ${ALLOWED_ORIGIN}`);
});

module.exports = app;
