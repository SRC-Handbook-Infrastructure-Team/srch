/**
 * db.js
 *
 * Sets up the SQLite database connection and schema.
 * The database stores section/subsection content and a full-text search index.
 */

const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const path = require("path");

const DB_PATH = path.join(__dirname, "srch.db");

let dbPromise = null;

async function getDb() {
  if (!dbPromise) {
    dbPromise = open({
      filename: DB_PATH,
      driver: sqlite3.Database,
    }).then(async (db) => {
      await db.exec("PRAGMA journal_mode = WAL");
      await db.exec("PRAGMA foreign_keys = ON");
      await initSchema(db);
      return db;
    });
  }
  return dbPromise;
}

async function initSchema(db) {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS sections (
      id          TEXT PRIMARY KEY,
      title       TEXT NOT NULL,
      order_num   INTEGER NOT NULL DEFAULT 999,
      content     TEXT NOT NULL DEFAULT '',
      is_final    INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS subsections (
      id          TEXT NOT NULL,
      section_id  TEXT NOT NULL REFERENCES sections(id) ON DELETE CASCADE,
      title       TEXT NOT NULL,
      order_num   INTEGER NOT NULL DEFAULT 999,
      content     TEXT NOT NULL DEFAULT '',
      is_final    INTEGER NOT NULL DEFAULT 0,
      PRIMARY KEY (id, section_id)
    );

    CREATE TABLE IF NOT EXISTS search_blocks (
      id                TEXT PRIMARY KEY,
      section_id        TEXT NOT NULL,
      section_title     TEXT NOT NULL,
      subsection_id     TEXT,
      subsection_title  TEXT,
      anchor            TEXT,
      title             TEXT NOT NULL,
      content           TEXT NOT NULL DEFAULT '',
      sidebar_key       TEXT,
      is_drawer         INTEGER NOT NULL DEFAULT 0
    );

    CREATE VIRTUAL TABLE IF NOT EXISTS search_index USING fts5(
      block_id,
      title,
      content,
      tokenize='unicode61'
    );
  `);
}

module.exports = { getDb };
