/**
 * routes/search.js
 *
 * REST API route for full-text search using SQLite FTS5.
 *
 * Endpoint:
 *   GET /api/search?q=<query>&limit=<n>
 *
 * Returns an array of matching search blocks with a text snippet.
 */

const express = require("express");
const router = express.Router();
const { getDb } = require("../db");

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

/**
 * Builds a short text snippet around the first occurrence of the query term.
 */
function buildSnippet(content, query) {
  if (!content) return "";
  const lower = content.toLowerCase();
  const queryLower = query.toLowerCase();
  const idx = lower.indexOf(queryLower);

  if (idx === -1) return content.slice(0, 200);

  const start = Math.max(0, idx - 80);
  const end = Math.min(content.length, idx + query.length + 120);
  const prefix = start > 0 ? "..." : "";
  const suffix = end < content.length ? "..." : "";
  const raw = content.slice(start, end);

  // Wrap the matched term in <mark> tags
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const highlighted = raw.replace(
    new RegExp(`(${escaped})`, "gi"),
    "<mark>$1</mark>"
  );

  return prefix + highlighted + suffix;
}

router.get("/search", async (req, res) => {
  const query = (req.query.q || "").trim();
  const rawLimit = parseInt(req.query.limit, 10);
  const limit = isNaN(rawLimit)
    ? DEFAULT_LIMIT
    : Math.min(rawLimit, MAX_LIMIT);

  if (!query) {
    return res.json([]);
  }

  try {
    const db = await getDb();

    // Escape double quotes in the FTS5 query
    const ftsQuery = query.replace(/"/g, '""');

    const rows = await db.all(
      `SELECT
        sb.id,
        sb.section_id,
        sb.section_title,
        sb.subsection_id,
        sb.subsection_title,
        sb.anchor,
        sb.title,
        sb.content,
        sb.sidebar_key,
        sb.is_drawer
      FROM search_index si
      JOIN search_blocks sb ON si.block_id = sb.id
      WHERE search_index MATCH ?
      ORDER BY rank
      LIMIT ?`,
      `"${ftsQuery}"`,
      limit
    );

    const results = rows.map((row) => ({
      id: row.id,
      section: row.section_id,
      sectionTitle: row.section_title,
      subsection: row.subsection_id,
      subsectionTitle: row.subsection_title,
      anchor: row.anchor,
      title: row.title,
      sidebarKey: row.sidebar_key,
      isDrawer: row.is_drawer === 1,
      snippet: buildSnippet(row.content, query),
    }));

    res.json(results);
  } catch (err) {
    console.error("GET /search error:", err);
    res.status(500).json({ error: "Search failed" });
  }
});

module.exports = router;
