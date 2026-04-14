/**
 * routes/content.js
 *
 * REST API routes for serving section and subsection content from SQLite.
 *
 * Endpoints:
 *   GET /api/sections                            - list all sections (id, title, order)
 *   GET /api/sections/:sectionId                 - full section record including content
 *   GET /api/sections/:sectionId/subsections     - list subsections for a section
 *   GET /api/sections/:sectionId/:subsectionId   - full subsection record
 */

const express = require("express");
const router = express.Router();
const { getDb } = require("../db");

// List all sections (summary, no content)
router.get("/sections", async (req, res) => {
  try {
    const db = await getDb();
    const sections = await db.all(
      "SELECT id, title, order_num, is_final FROM sections ORDER BY order_num ASC"
    );
    res.json(sections);
  } catch (err) {
    console.error("GET /sections error:", err);
    res.status(500).json({ error: "Failed to retrieve sections" });
  }
});

// Get a single section by id (includes content)
router.get("/sections/:sectionId", async (req, res) => {
  try {
    const db = await getDb();
    const section = await db.get(
      "SELECT * FROM sections WHERE id = ?",
      req.params.sectionId
    );

    if (!section) {
      return res.status(404).json({ error: "Section not found" });
    }
    res.json(section);
  } catch (err) {
    console.error("GET /sections/:sectionId error:", err);
    res.status(500).json({ error: "Failed to retrieve section" });
  }
});

// List subsections for a section (summary, no content)
router.get("/sections/:sectionId/subsections", async (req, res) => {
  try {
    const db = await getDb();
    const subsections = await db.all(
      `SELECT id, section_id, title, order_num, is_final
       FROM subsections
       WHERE section_id = ?
       ORDER BY order_num ASC`,
      req.params.sectionId
    );
    res.json(subsections);
  } catch (err) {
    console.error("GET /sections/:sectionId/subsections error:", err);
    res.status(500).json({ error: "Failed to retrieve subsections" });
  }
});

// Get a single subsection by id (includes content)
router.get("/sections/:sectionId/:subsectionId", async (req, res) => {
  try {
    const db = await getDb();
    const subsection = await db.get(
      "SELECT * FROM subsections WHERE id = ? AND section_id = ?",
      req.params.subsectionId,
      req.params.sectionId
    );

    if (!subsection) {
      return res.status(404).json({ error: "Subsection not found" });
    }
    res.json(subsection);
  } catch (err) {
    console.error("GET /sections/:sectionId/:subsectionId error:", err);
    res.status(500).json({ error: "Failed to retrieve subsection" });
  }
});

module.exports = router;
