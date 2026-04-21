/**
 * ExportIndex.js
 *
 * Build-time script that reads all markdown files and exports a pre-processed
 * content array to `public/search-index.json`.
 *
 * Loading this JSON in the browser means the FlexSearch index is populated
 * from a single fetch instead of loading and parsing every markdown file
 * individually, significantly reducing initial load time.
 *
 * Run with: npm run export-index
 * (uses babel-node as defined in package.json scripts)
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const MARKDOWN_DIR = path.join(__dirname, "../markdown");
const SEARCH_INDEX_OUTPUT_PATH = path.join(
  __dirname,
  "../../public/search-index.json",
);
const MARKDOWN_DATA_OUTPUT_PATH = path.join(
  __dirname,
  "../../public/markdown-data.json",
);

/* ----------------------------- Utilities ----------------------------- */

function parseFrontmatter(content) {
  const frontmatterRegex = /^---\s*\r?\n([\s\S]*?)\r?\n---\s*(?:\r?\n|$)/;
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
    p1.replace(/-/g, " "),
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
    const normalizedLine = line.trimStart();
    const keyMatch = normalizedLine.match(/^([A-Za-z0-9-_]+):\s*$/);
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
    } else if (normalizedLine.startsWith("Heading:")) {
      currentHeading = normalizedLine.replace("Heading:", "").trim();
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
  const dividerRegex = /^##\s*Sidebar\s*$/m;
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

function stripFurtherReadingBlocks(markdown) {
  if (!markdown || typeof markdown !== "string") {
    return { stripped: markdown, furtherReadingBlock: null };
  }

  const lines = markdown.split(/\r?\n/);
  const furtherReadingHeadingRegex = /^##\s+Further Reading\s*$/i;
  const h2Regex = /^##\s/;

  const keptLines = [];
  const furtherReadingBlocks = [];

  for (let i = 0; i < lines.length; ) {
    if (furtherReadingHeadingRegex.test(lines[i])) {
      i += 1;
      const blockLines = [];

      while (i < lines.length && !h2Regex.test(lines[i])) {
        blockLines.push(lines[i]);
        i += 1;
      }

      const block = blockLines.join("\n").trim();
      if (block) furtherReadingBlocks.push(block);
      continue;
    }

    keptLines.push(lines[i]);
    i += 1;
  }

  return {
    stripped: keptLines.join("\n"),
    furtherReadingBlock: furtherReadingBlocks.join("\n\n") || null,
  };
}

function extractFootnotes(markdown) {
  if (!markdown || typeof markdown !== "string") {
    return { stripped: markdown, footnotes: [], furtherReadingBlock: null };
  }

  const { stripped: withoutFurtherReading, furtherReadingBlock } =
    stripFurtherReadingBlocks(markdown);

  const defRegex = /^\[\^([^\]]+)\]:\s*(.*(?:\n(?!\[\^|\s*$).*)*)/gm;
  const definitions = {};
  let match;

  while ((match = defRegex.exec(withoutFurtherReading)) !== null) {
    definitions[match[1]] = match[2].trim();
  }

  return { definitions, furtherReadingBlock };
}

function parseMarkdownContentForRuntime(cleanContent, frontmatter = {}) {
  const dividerRegex = /^##\s*Sidebar\s*$/m;
  const dividerMatch = dividerRegex.exec(cleanContent);

  let mainContent = cleanContent;
  let sidebarRaw = null;

  if (dividerMatch) {
    const splitIndex = dividerMatch.index;
    mainContent = cleanContent.slice(0, splitIndex).trim();
    const afterDivider = cleanContent.slice(
      dividerMatch.index + dividerMatch[0].length,
    );
    sidebarRaw = afterDivider.trim();
  }

  const { definitions: allDefinitions, furtherReadingBlock } =
    extractFootnotes(mainContent);
  const sidebar = sidebarRaw ? parseSidebar(sidebarRaw) : {};

  const parsedContent = mainContent.replace(/\{([^}]+)\}/g, (_, term) => {
    return `<sidebar-ref term="${term}"></sidebar-ref>`;
  });

  let lastUpdated = null;
  if (frontmatter.lastUpdated) {
    lastUpdated = frontmatter.lastUpdated;
  } else {
    const footerMatch = mainContent.match(/_Last updated\s+(.+?)\._/i);
    if (footerMatch) {
      lastUpdated = footerMatch[1].trim();
    }
  }

  return {
    content: parsedContent,
    sidebar,
    allDefinitions,
    furtherReadingBlock,
    frontmatter: { ...frontmatter, lastUpdated },
  };
}

function extractBlocksFromContent(
  sectionId,
  sectionTitle,
  content,
  subsectionId,
  subsectionTitle,
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
        section: sectionId,
        sectionTitle,
        subsection: subsectionId || null,
        subsectionTitle: subsectionTitle || null,
        anchor: currentAnchor,
        title: getPlaintextFromMarkdown(currentTitle),
        content: currentLines.join("\n").trim(),
        sidebarKey: null,
        isDrawer: false,
      });
    } else if (currentLines.length) {
      blocks.push({
        id: `${sectionId}${subsectionId ? "/" + subsectionId : ""}#intro`,
        section: sectionId,
        sectionTitle,
        subsection: subsectionId || null,
        subsectionTitle: subsectionTitle || null,
        anchor: "intro",
        title: "Introduction",
        content: currentLines.join("\n").trim(),
        sidebarKey: null,
        isDrawer: false,
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

function buildContentArray() {
  const contentArray = [];
  const sections = [];
  const subsectionsBySection = {};
  const contentByKey = {};

  if (!fs.existsSync(MARKDOWN_DIR)) {
    console.error(`Markdown directory not found: ${MARKDOWN_DIR}`);
    return { contentArray, sections, subsectionsBySection, contentByKey };
  }

  const sectionDirs = fs
    .readdirSync(MARKDOWN_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory() && d.name !== "primers")
    .map((d) => d.name);

  // Load and sort sections
  const rawSections = [];
  for (const sectionId of sectionDirs) {
    const sectionDir = path.join(MARKDOWN_DIR, sectionId);
    const sectionFile = path.join(sectionDir, `${sectionId}.md`);
    if (!fs.existsSync(sectionFile)) continue;

    const rawContent = fs.readFileSync(sectionFile, "utf8");
    const { content: cleanContent, frontmatter } = parseFrontmatter(rawContent);

    rawSections.push({
      id: sectionId,
      title: frontmatter.title || cleanContent.split("\n")[0].replace("# ", ""),
      order: frontmatter.order || 999,
      content: cleanContent,
      frontmatter,
    });
  }

  rawSections.sort((a, b) => a.order - b.order);

  rawSections.forEach((section) => {
    sections.push({
      id: section.id,
      title: section.title,
      order: section.order,
      content: section.content,
    });

    contentByKey[section.id] = parseMarkdownContentForRuntime(
      section.content,
      section.frontmatter,
    );
  });

  for (const section of rawSections) {
    const sectionDir = path.join(MARKDOWN_DIR, section.id);

    // Load subsections
    const subsectionDirs = fs
      .readdirSync(sectionDir, { withFileTypes: true })
      .filter(
        (d) =>
          d.isDirectory() && d.name !== "drawer" && !d.name.startsWith("."),
      )
      .map((d) => d.name);

    const subsections = [];
    for (const subsectionId of subsectionDirs) {
      const subFile = path.join(sectionDir, subsectionId, `${subsectionId}.md`);
      if (!fs.existsSync(subFile)) continue;

      const subRaw = fs.readFileSync(subFile, "utf8");
      const { content: subClean, frontmatter: subFm } =
        parseFrontmatter(subRaw);

      subsections.push({
        id: subsectionId,
        title: subFm.title || subClean.split("\n")[0].replace("# ", ""),
        order: subFm.order || 999,
        content: subClean,
        frontmatter: subFm,
      });
    }

    subsections.sort((a, b) => a.order - b.order);

    subsectionsBySection[section.id] = subsections.map((subsection) => ({
      id: subsection.id,
      title: subsection.title,
      order: subsection.order,
      content: subsection.content,
    }));

    for (const subsection of subsections) {
      const subsectionKey = `${section.id}/${subsection.id}`;
      contentByKey[subsectionKey] = parseMarkdownContentForRuntime(
        subsection.content,
        subsection.frontmatter,
      );

      const { mainContent, sidebarRaw } = extractMainAndSidebar(
        subsection.content,
      );
      const sidebarParsed = sidebarRaw ? parseSidebar(sidebarRaw) : {};

      const blocks = extractBlocksFromContent(
        section.id,
        section.title,
        mainContent,
        subsection.id,
        subsection.title,
      );
      contentArray.push(...blocks);

      for (const [key, value] of Object.entries(sidebarParsed)) {
        contentArray.push({
          id: `${section.id}/${subsection.id}#sidebar-${key}`,
          section: section.id,
          sectionTitle: section.title,
          subsection: subsection.id,
          subsectionTitle: subsection.title,
          anchor: key,
          title: getPlaintextFromMarkdown(
            value.heading || key.replace(/-/g, " "),
          ),
          content: value.content,
          sidebarKey: key,
          isDrawer: true,
        });
      }
    }
  }

  return { contentArray, sections, subsectionsBySection, contentByKey };
}

/* ----------------------------- Main ----------------------------- */

const { contentArray, sections, subsectionsBySection, contentByKey } =
  buildContentArray();
const markdownData = {
  generatedAt: new Date().toISOString(),
  sections,
  subsectionsBySection,
  contentByKey,
};

fs.mkdirSync(path.dirname(SEARCH_INDEX_OUTPUT_PATH), { recursive: true });
fs.writeFileSync(
  SEARCH_INDEX_OUTPUT_PATH,
  JSON.stringify(contentArray),
  "utf8",
);
fs.writeFileSync(
  MARKDOWN_DATA_OUTPUT_PATH,
  JSON.stringify(markdownData),
  "utf8",
);

console.log(
  `Exported ${contentArray.length} search blocks to ${SEARCH_INDEX_OUTPUT_PATH}`,
);
console.log(`Exported markdown cache to ${MARKDOWN_DATA_OUTPUT_PATH}`);
