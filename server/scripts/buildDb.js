/**
 * buildDb.js
 *
 * Reads all markdown files from the website markdown directory,
 * processes them, and populates the SQLite database with sections,
 * subsections, and a full-text search index.
 *
 * Run with: npm run build-db   (from the server/ directory)
 */

const fs = require("fs");
const path = require("path");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

const MARKDOWN_DIR = path.join(
  __dirname,
  "../../website/src/markdown"
);
const DB_PATH = path.join(__dirname, "../srch.db");

/* ----------------------------- Utilities ----------------------------- */

function parseFrontmatter(content) {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return { content, frontmatter: {} };
  }

  const frontmatterBlock = match[1];
  const cleanContent = content.replace(frontmatterRegex, "");
  const frontmatter = {};

  frontmatterBlock.split("\n").forEach((line) => {
    if (line.trim() === "") return;
    const [key, ...valueParts] = line.split(":");
    const value = valueParts.join(":").trim();
    if (value === "true") frontmatter[key.trim()] = true;
    else if (value === "false") frontmatter[key.trim()] = false;
    else if (!isNaN(Number(value))) frontmatter[key.trim()] = Number(value);
    else frontmatter[key.trim()] = value;
  });

  return { content: cleanContent, frontmatter };
}

function createIdFromHeading(text) {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function getPlaintextFromMarkdown(content) {
  if (!content) return "";

  content = content.replace(/^---[\s\S]*?---\s*/, "");
  content = content.replace(/!\[[^\]]*\]\([^)]*\)/g, "");
  content = content.replace(/\{([A-Za-z0-9-]+)\}/g, (match, p1) =>
    p1.replace(/-/g, " ")
  );
  content = content.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
  content = content.replace(/(\*\*|__)(.*?)\1/g, "$2");
  content = content.replace(/(\*|_)(.*?)\1/g, "$2");
  content = content.replace(/`([^`]+)`/g, "$1");
  content = content.replace(/^#{1,6}\s*(.*)$/gm, "$1");
  content = content.replace(/\[\^([^\]]+)\]/g, "");
  content = content.replace(/^\s*\|[-:\s|]+\|\s*$/gm, "");
  content = content.replace(/[ \t]{2,}/g, " ");
  content = content.replace(/\n{2,}/g, "\n\n").trim();
  content = content.replace(/\[[^\]]*\]/g, "");
  return content;
}

function parseSidebar(sidebarRaw) {
  const sidebar = {};
  let currentKey = null;
  let currentHeading = null;
  let currentValue = [];

  sidebarRaw.split("\n").forEach((line) => {
    const keyMatch = line.match(/^([A-Za-z0-9-_]+):\s*$/);
    if (keyMatch) {
      if (currentKey) {
        sidebar[currentKey.toLowerCase()] = {
          heading: currentHeading || currentKey.replace(/-/g, " "),
          content: currentValue.join("\n").trim(),
        };
      }
      currentKey = keyMatch[1];
      currentHeading = null;
      currentValue = [];
    } else if (line.startsWith("Heading:")) {
      currentHeading = line.replace("Heading:", "").trim();
    } else if (currentKey) {
      currentValue.push(line);
    }
  });

  if (currentKey) {
    sidebar[currentKey.toLowerCase()] = {
      heading: currentHeading || currentKey.replace(/-/g, " "),
      content: currentValue.join("\n").trim(),
    };
  }

  return sidebar;
}

function extractMainAndSidebar(markdown) {
  const dividerRegex = /^##\s*(All Sidebar Content Below|Sidebar)\s*$/m;
  const dividerMatch = dividerRegex.exec(markdown);

  let mainContent = markdown;
  let sidebarRaw = null;

  if (dividerMatch) {
    const splitIndex = dividerMatch.index;
    mainContent = markdown.slice(0, splitIndex).trim();
    sidebarRaw = markdown.slice(splitIndex + dividerMatch[0].length).trim();
  }

  return { mainContent, sidebarRaw };
}

function extractBlocksFromContent(
  sectionId,
  sectionTitle,
  content,
  subsectionId,
  subsectionTitle
) {
  const lines = content.replace(/\r/g, "").split("\n");
  const blocks = [];

  let currentTitle = null;
  let currentAnchor = null;
  let currentLines = [];

  const pushBlock = () => {
    if (currentTitle !== null) {
      blocks.push({
        id: `${sectionId}${subsectionId ? "/" + subsectionId : ""}#${currentAnchor || "unknown"}`,
        section_id: sectionId,
        section_title: sectionTitle,
        subsection_id: subsectionId || null,
        subsection_title: subsectionTitle || null,
        anchor: currentAnchor,
        title: getPlaintextFromMarkdown(currentTitle),
        content: currentLines.join("\n").trim(),
        sidebar_key: null,
        is_drawer: 0,
      });
    } else if (currentLines.length) {
      blocks.push({
        id: `${sectionId}${subsectionId ? "/" + subsectionId : ""}#intro`,
        section_id: sectionId,
        section_title: sectionTitle,
        subsection_id: subsectionId || null,
        subsection_title: subsectionTitle || null,
        anchor: "intro",
        title: "Introduction",
        content: currentLines.join("\n").trim(),
        sidebar_key: null,
        is_drawer: 0,
      });
    }
  };

  lines.forEach((line) => {
    if (line.startsWith("## ")) {
      pushBlock();
      currentTitle = line.replace("## ", "").trim();
      currentAnchor = createIdFromHeading(currentTitle);
      currentLines = [];
    } else {
      currentLines.push(line);
    }
  });

  pushBlock();
  return blocks;
}

/* ----------------------------- Scanner ----------------------------- */

function scanMarkdownDirectory(dirPath) {
  const result = { sections: [], subsectionsMap: {} };

  if (!fs.existsSync(dirPath)) {
    console.error(`Markdown directory not found: ${dirPath}`);
    return result;
  }

  const sectionDirs = fs
    .readdirSync(dirPath, { withFileTypes: true })
    .filter((d) => d.isDirectory() && d.name !== "primers")
    .map((d) => d.name);

  for (const sectionId of sectionDirs) {
    const sectionDir = path.join(dirPath, sectionId);
    const sectionFile = path.join(sectionDir, `${sectionId}.md`);

    if (!fs.existsSync(sectionFile)) continue;

    const rawContent = fs.readFileSync(sectionFile, "utf8");
    const { content: cleanContent, frontmatter } = parseFrontmatter(rawContent);

    const section = {
      id: sectionId,
      title:
        frontmatter.title || cleanContent.split("\n")[0].replace("# ", ""),
      order_num: frontmatter.order || 999,
      content: cleanContent,
      is_final: frontmatter.final ? 1 : 0,
    };
    result.sections.push(section);

    // Scan subsections
    const subsections = [];
    const entries = fs
      .readdirSync(sectionDir, { withFileTypes: true })
      .filter(
        (d) =>
          d.isDirectory() &&
          d.name !== "drawer" &&
          !d.name.startsWith(".")
      );

    for (const entry of entries) {
      const subsectionId = entry.name;
      const subsectionFile = path.join(
        sectionDir,
        subsectionId,
        `${subsectionId}.md`
      );

      if (!fs.existsSync(subsectionFile)) continue;

      const subRaw = fs.readFileSync(subsectionFile, "utf8");
      const { content: subClean, frontmatter: subFm } =
        parseFrontmatter(subRaw);

      subsections.push({
        id: subsectionId,
        section_id: sectionId,
        title:
          subFm.title || subClean.split("\n")[0].replace("# ", ""),
        order_num: subFm.order || 999,
        content: subClean,
        is_final: subFm.final ? 1 : 0,
      });
    }

    subsections.sort((a, b) => a.order_num - b.order_num);
    result.subsectionsMap[sectionId] = subsections;
  }

  result.sections.sort((a, b) => a.order_num - b.order_num);
  return result;
}

/* ----------------------------- Main ----------------------------- */

async function buildDatabase() {
  console.log("Building SQLite database from markdown files...");

  if (fs.existsSync(DB_PATH)) {
    fs.unlinkSync(DB_PATH);
    console.log("Removed existing database.");
  }

  const db = await open({ filename: DB_PATH, driver: sqlite3.Database });
  await db.exec("PRAGMA journal_mode = WAL");
  await db.exec("PRAGMA foreign_keys = ON");

  // Create schema
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

  const { sections, subsectionsMap } = scanMarkdownDirectory(MARKDOWN_DIR);

  let sectionCount = 0;
  let subsectionCount = 0;
  let blockCount = 0;

  for (const section of sections) {
    await db.run(
      `INSERT OR REPLACE INTO sections (id, title, order_num, content, is_final)
       VALUES (?, ?, ?, ?, ?)`,
      [section.id, section.title, section.order_num, section.content, section.is_final]
    );
    sectionCount++;

    const subsections = subsectionsMap[section.id] || [];
    for (const subsection of subsections) {
      await db.run(
        `INSERT OR REPLACE INTO subsections (id, section_id, title, order_num, content, is_final)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [subsection.id, subsection.section_id, subsection.title, subsection.order_num, subsection.content, subsection.is_final]
      );
      subsectionCount++;

      const { mainContent, sidebarRaw } = extractMainAndSidebar(subsection.content);
      const sidebarParsed = sidebarRaw ? parseSidebar(sidebarRaw) : {};

      const blocks = extractBlocksFromContent(
        section.id,
        section.title,
        mainContent,
        subsection.id,
        subsection.title
      );

      for (const block of blocks) {
        await db.run(
          `INSERT OR REPLACE INTO search_blocks
           (id, section_id, section_title, subsection_id, subsection_title, anchor, title, content, sidebar_key, is_drawer)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [block.id, block.section_id, block.section_title, block.subsection_id, block.subsection_title,
           block.anchor, block.title, block.content, block.sidebar_key, block.is_drawer]
        );
        await db.run(
          `INSERT INTO search_index (block_id, title, content) VALUES (?, ?, ?)`,
          [block.id, block.title, getPlaintextFromMarkdown(block.content)]
        );
        blockCount++;
      }

      for (const [key, value] of Object.entries(sidebarParsed)) {
        const drawerBlock = {
          id: `${section.id}/${subsection.id}#sidebar-${key}`,
          section_id: section.id,
          section_title: section.title,
          subsection_id: subsection.id,
          subsection_title: subsection.title,
          anchor: key,
          title: getPlaintextFromMarkdown(value.heading || key.replace(/-/g, " ")),
          content: value.content,
          sidebar_key: key,
          is_drawer: 1,
        };

        await db.run(
          `INSERT OR REPLACE INTO search_blocks
           (id, section_id, section_title, subsection_id, subsection_title, anchor, title, content, sidebar_key, is_drawer)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [drawerBlock.id, drawerBlock.section_id, drawerBlock.section_title,
           drawerBlock.subsection_id, drawerBlock.subsection_title, drawerBlock.anchor,
           drawerBlock.title, drawerBlock.content, drawerBlock.sidebar_key, drawerBlock.is_drawer]
        );
        await db.run(
          `INSERT INTO search_index (block_id, title, content) VALUES (?, ?, ?)`,
          [drawerBlock.id, drawerBlock.title, getPlaintextFromMarkdown(drawerBlock.content)]
        );
        blockCount++;
      }
    }
  }

  await db.close();

  console.log(
    `Inserted ${sectionCount} sections, ${subsectionCount} subsections, ${blockCount} search blocks.`
  );
  console.log(`Database written to ${DB_PATH}`);
}

buildDatabase().catch((err) => {
  console.error("Build failed:", err);
  process.exit(1);
});
