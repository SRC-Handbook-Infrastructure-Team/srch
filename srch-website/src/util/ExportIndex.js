import fs from "fs";
import FlexSearch from "flexsearch";
import path from "path";

// Create the FlexSearch Document index
const index = new FlexSearch.Document({
  document: {
    id: "id",
    index: [
      {
        field: "title",
        tokenize: "full",
        threshold: 0,
        storeLocations: true, // track match positions for title
      },
      {
        field: "content",
        tokenize: "full",
        threshold: 0,
        storeLocations: true, // track match positions for content
      },
    ],
    store: [
      "title",
      "sectionTitle",
      "section",
      "subsectionTitle",
      "subsection",
      "content",
      "anchor",
      "isDrawer",
    ], // store full content for snippet extraction
  },
  preset: "match",
  encode: false,
  matcher: false,
  filter: false,
});

let indexInitialized = false;

// markdown renderer

/* ----------------------------- Markdown Imports ----------------------------- */


export async function getAllMarkdownFiles() {
  const markdownDir = path.resolve("src/markdown");
  const markdownFiles = {};

  const files = fs.readdirSync(markdownDir);

  for (const file of files) {
    if (file.endsWith(".md")) {
      const fullPath = path.join(markdownDir, file);
      const content = fs.readFileSync(fullPath, "utf-8");
      markdownFiles[file] = () => Promise.resolve(content);
    }
  }

  return markdownFiles;
}

const allMarkdownFiles = await getAllMarkdownFiles();


/* ----------------------------- Section Loaders ----------------------------- */

export const getSections = async () => {
  try {
    const sections = [];
    const paths = Object.keys(allMarkdownFiles);
    const processedSections = new Set();

    for (const path of paths) {
      const segments = path.split("/");
      if (segments[2] === "primers") continue;

      if (segments.length === 4 && segments[3].endsWith(".md")) {
        const sectionId = segments[2];
        const fileName = segments[3];

        if (
          fileName === `${sectionId}.md` &&
          !processedSections.has(sectionId)
        ) {
          processedSections.add(sectionId);
          const content = await allMarkdownFiles[path]();
          const { content: cleanContent, frontmatter } =
            parseFrontmatter(content);

          sections.push({
            id: sectionId,
            title:
              frontmatter.title ||
              cleanContent.split("\n")[0].replace("# ", ""),
            order: frontmatter.order || 999,
            content: cleanContent,
            final: frontmatter.final,
          });
        }
      }
    }

    return sections.sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error("Error loading sections:", error);
    return [];
  }
};

export const getSubsections = async (sectionId) => {
  try {
    const subsections = [];
    const paths = Object.keys(allMarkdownFiles);
    const processedSubsections = new Set();

    for (const path of paths) {
      const segments = path.split("/");
      if (
        segments.length === 5 &&
        segments[2] === sectionId &&
        segments[3] !== "drawer" &&
        segments[4].endsWith(".md")
      ) {
        const subsectionId = segments[3];
        const fileName = segments[4];

        if (
          fileName === `${subsectionId}.md` &&
          !processedSubsections.has(subsectionId)
        ) {
          processedSubsections.add(subsectionId);
          const content = await allMarkdownFiles[path]();
          const { content: cleanContent, frontmatter } =
            parseFrontmatter(content);

          subsections.push({
            id: subsectionId,
            title:
              frontmatter.title ||
              cleanContent.split("\n")[0].replace("# ", ""),
            order: frontmatter.order || 999,
            content: cleanContent,
            final: frontmatter.final,
          });
        }
      }
    }

    return subsections.sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error(`Error loading subsections for ${sectionId}:`, error);
    return [];
  }
};

/* ----------------------------- Utility Functions ----------------------------- */

export function createIdFromHeading(text) {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function parseFrontmatter(content) {
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

// Extract h2 blocks from markdown with anchors
function extractHeadingBlocks(
  markdown,
  sectionId,
  sectionTitle,
  subsectionId = null,
  subsectionTitle
) {
  const content = markdown.replace(/\r/g, "");
  const lines = content.split("\n");
  const blocks = [];

  let currentTitle = null;
  let currentAnchor = null;
  let currentLines = [];

  function pushDrawerBlock(anchor, lines) {
    blocks.push({
      id: `${sectionId}${subsectionId ? "/" + subsectionId : ""}#${anchor}`,
      section: sectionId,
      sectionTitle: sectionTitle,
      subsection: subsectionId,
      subsectionTitle: subsectionTitle,
      anchor: anchor,
      title:
        lines.length > 0
          ? lines[0].startsWith("Heading:")
            ? lines[0].replace(/^Heading:\s*/, "")
            : getPlaintextFromMarkdown(
                lines[0].split(/\s+/).slice(0, 5).join(" ") + "..."
              )
          : anchor,
      content: (lines.length > 0 && lines[0].startsWith("Heading:")
        ? lines.slice(1)
        : lines
      )
        .join("\n")
        .trim(),
      isDrawer: true,
    });
  }

  const pushBlock = () => {
    if (currentTitle !== null) {
      if (currentTitle === "All Sidebar Content Below") {
        let currentAnchorLocal = null;
        let anchorLines = [];
        currentLines.forEach((line) => {
          const match = line.match(/^([A-Za-z0-9-_]+):\s*$/);
          if (match) {
            if (currentAnchorLocal !== null) {
              pushDrawerBlock(currentAnchorLocal, anchorLines);
            }
            currentAnchorLocal = match[1].trim();
            anchorLines = [];
          } else {
            anchorLines.push(line);
          }
        });
        if (currentAnchorLocal !== null) {
          pushDrawerBlock(currentAnchorLocal, anchorLines);
        }
      } else {
        blocks.push({
          id: `${sectionId}${subsectionId ? "/" + subsectionId : ""}#${
            currentAnchor || "unknown"
          }`,
          section: sectionId,
          sectionTitle: sectionTitle,
          subsection: subsectionId,
          subsectionTitle: subsectionTitle,
          anchor: currentAnchor,
          title: currentTitle,
          content: currentLines.join("\n").trim(),
          isDrawer: false,
        });
      }
    } else if (currentLines.length) {
      blocks.push({
        id: `${sectionId}${subsectionId ? "/" + subsectionId : ""}#intro`,
        section: sectionId,
        sectionTitle: sectionTitle,
        subsection: subsectionId,
        subsectionTitle: subsectionTitle,
        anchor: "intro",
        title: "Introduction",
        content: currentLines.slice(2).join("\n").trim(),
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

async function initializeIndex() {
  if (indexInitialized) return;

  const sections = await getSections();
  const contentArray = [];

  for (const section of sections) {
    contentArray.push(...extractHeadingBlocks(section.content, section.id));
    const subsections = await getSubsections(section.id);

    for (const subsection of subsections) {
      contentArray.push(
        ...extractHeadingBlocks(
          subsection.content,
          section.id,
          section.title,
          subsection.id,
          subsection.title
        )
      );
    }
  }

  contentArray.forEach((item) => {
    index.add(item);
  });

  console.log("Built index:", index);
}

function getPlaintextFromMarkdown(content) {
  if (!content) return "";

  // Remove YAML frontmatter
  content = content.replace(/^---[\s\S]*?---\s*/, "");

  // Remove images
  content = content.replace(/!\[[^\]]*\]\([^\)]*\)/g, "");

  // Replace drawer links {text} with just 'text'
  content = content.replace(/\{([A-Za-z0-9-]+)\}/g, (match, p1) =>
    p1.replace(/-/g, " ")
  );
  // Replace general links [text](url) with just 'text'
  content = content.replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1");

  // Remove emphasis and code markers
  content = content.replace(/(\*\*|__)(.*?)\1/g, "$2"); // bold
  content = content.replace(/(\*|_)(.*?)\1/g, "$2"); // italic
  content = content.replace(/`([^`]+)`/g, "$1"); // inline code

  // Remove headings but keep text
  content = content.replace(/^#{1,6}\s*(.*)$/gm, "$1");

  // Remove footnotes
  content = content.replace(/\[\^([^\]]+)\]/g, "");

  // Normalize spaces (but keep newlines)
  content = content.replace(/[ \t]{2,}/g, " ");

  // Preserve paragraph breaks by replacing multiple newlines with exactly two newlines
  content = content.replace(/\n{2,}/g, "\n\n").trim();

  return content;
}

async function exportIndex() {
  await initializeIndex(); // make sure it is initialized
  const json = index.export(); // export full index as JSON object
    if (!json) {
      throw new Error(
        "Index export returned undefined. Index might not be initialized properly."
      );
    }
  const jsonString = JSON.stringify(json);
  // Write to file in Node.js environment
  fs.writeFileSync("search-index.json", jsonString, "utf-8");
  console.log("Index exported successfully");
}

exportIndex().catch((err) => {
  console.error(err);
  process.exit(1);
});
