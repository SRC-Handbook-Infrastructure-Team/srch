import FlexSearch from "flexsearch";
import {
  getSections,
  getSubsections,
  createIdFromHeading,
  allMarkdownFiles,
  parseFrontmatter,
} from "./MarkdownRenderer.jsx";

// Create the FlexSearch Document index
const index = new FlexSearch.Document({
  document: {
    id: "id",
    index: [
      {
        field: "title",
        tokenize: "forward",
        threshold: 0,
        storeLocations: true, // track match positions for title
      },
      {
        field: "content",
        tokenize: "forward",
        threshold: 0,
        storeLocations: true, // track match positions for content
      },
    ],
    store: [
      "title",
      "section",
      "subsectionTitle",
      "subsection",
      "content",
      "anchor",
    ], // store full content for snippet extraction
  },
  preset: "match",
  tokenize: "forward",
});

// Extract h2 blocks from markdown with anchors
function extractHeadingBlocks(
  markdown,
  sectionId,
  subsectionId = null,
  subsectionTitle
) {
  const content = markdown.replace(/\r/g, "");
  const lines = content.split("\n");
  const blocks = [];

  let currentTitle = null;
  let currentAnchor = null;
  let currentLines = [];

  const pushBlock = () => {
    if (currentTitle !== null) {
      blocks.push({
        id: `${sectionId}${
          subsectionId ? "/" + subsectionId : ""
        }#${currentAnchor}`,
        section: sectionId,
        subsection: subsectionId,
        subsectionTitle: subsectionTitle,
        anchor: currentAnchor,
        title: currentTitle,
        content: currentLines.join("\n").trim(),
      });
    } else if (currentLines.length) {
      blocks.push({
        id: `${sectionId}${subsectionId ? "/" + subsectionId : ""}#intro`,
        section: sectionId,
        subsection: subsectionId,
        subsectionTitle: subsectionTitle,
        anchor: "intro",
        title: "Introduction",
        content: currentLines.join("\n").trim(),
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

// Initialize FlexSearch index from all markdown content
export async function initializeIndex() {
  const sections = await getSections();
  const contentArray = [];

  for (const section of sections) {
    // Section-level heading blocks
    contentArray.push(...extractHeadingBlocks(section.content, section.id));
    const subsections = await getSubsections(section.id);

    for (const subsection of subsections) {
      // Subsection-level heading blocks
      contentArray.push(
        ...extractHeadingBlocks(
          subsection.content,
          section.id,
          subsection.id,
          subsection.title
        )
      );

      // Drawer files for this subsection
      const drawerPathPrefix = `../markdown/${section.id}/${subsection.id}/drawer/`;
      const drawerFiles = Object.keys(allMarkdownFiles).filter(
        (path) => path.startsWith(drawerPathPrefix) && path.endsWith(".md")
      );

      for (const drawerFilePath of drawerFiles) {
        const drawerContentRaw = await allMarkdownFiles[drawerFilePath]();
        const { content: drawerContentClean, frontmatter } =
          parseFrontmatter(drawerContentRaw);
        // Get the first line of the drawer content
        const firstLine = drawerContentClean.split("\n")[0].trim();

        // If the line starts with one or more #, make the title that text without the #
        const headerMatch = firstLine.match(/^#+\s*(.*)/);

        // Add drawer file content to index as a separate document
        contentArray.push({
          id: `${section.id}/${subsection.id}/drawer/${drawerFilePath
            .split("/")
            .pop()
            .replace(".md", "")}`,
          section: section.id,
          subsection: subsection.id,
          subsectionTitle: subsection.title,
          drawerFile: drawerFilePath, // tracks original path
          title:
            frontmatter.title ||
            (headerMatch ? headerMatch[1].trim() : "unnamed drawer content"),
          content: drawerContentClean,
          isDrawer: true, // mark as drawer content
        });
      }
    }
  }

  contentArray.forEach((item) => {
    index.add(item);
  });
}

function getPlaintextFromMarkdown(content) {
  if (!content) return "";

  // Remove YAML frontmatter
  content = content.replace(/^---[\s\S]*?---\s*/, "");

  // Remove images
  content = content.replace(/!\[[^\]]*\]\([^\)]*\)/g, "");

  // Replace drawer links [drawer:text](target) with just 'text'
  content = content.replace(/\[drawer:([^\]]+)\]\([^\)]+\)/g, "$1");

  // Replace nav links [nav:text](target) with just 'text'
  content = content.replace(/\[nav:([^\]]+)\]\([^\)]+\)/g, "$1");

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

  // Make white space normal
  content = content.replace(/\s{2,}/g, " ");
  content = content.replace(/\n+/g, " ").trim();

  return content;
}

// Extract some highlighted snippets from content for a search
function createSnippet(content, query, radius = 30, maxSnippets = 5) {
  const snippets = [];
  const contentLower = content.toLowerCase();
  const queryLower = query.toLowerCase();
  let startIndex = 0;

  while (snippets.length < maxSnippets) {
    const index = contentLower.indexOf(queryLower, startIndex);
    if (index === -1) break;

    // Move start backward to word boundary if needed
    let start = index;
    while (
      start > 0 &&
      /\S/.test(content[start - 1]) &&
      !/\s/.test(content[start - 1])
    ) {
      start--;
    }

    // Calculate initial end index
    let end = index + query.length + radius;

    // Adjust end to a full word (move forward until next whitespace)
    while (end < content.length && /\S/.test(content[end])) {
      end++;
    }

    end = Math.min(content.length, end);

    // Extract snippet, highlight query
    let snippet = content.substring(start, end);

    const regex = new RegExp(`(${query})`, "gi");
    snippet = snippet.replace(regex, "<mark>$1</mark>");

    snippets.push(snippet.trim() + "...");
    startIndex = index + query.length;
  }

  return snippets;
}

// Search function returning results and snippets
export function search(query) {
  if (!query || query.length < 3) return [];

  const results = index.search(query, { enrich: true, depth: 2 });
  const allResults = results.reduce(
    (acc, fieldResults) => acc.concat(fieldResults.result),
    []
  );

  const snippetResults = [];
  const seenKeys = new Set();

  allResults.forEach((res) => {
    const doc = res.doc;
    if (doc && doc.content) {
      const plainText = getPlaintextFromMarkdown(doc.content);
      const snippets = createSnippet(plainText, query, 30, 5);

      snippets.forEach((snippet, i) => {
        const uniqueKey = res.id + "|" + snippet;
        if (!seenKeys.has(uniqueKey)) {
          seenKeys.add(uniqueKey);
          snippetResults.push({
            ...res,
            id: res.id + "_snippet_" + i,
            snippet,
            allSnippets: snippets,
          });
        }
      });
    }
  });

  return snippetResults;
}
