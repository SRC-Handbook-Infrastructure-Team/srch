import FlexSearch from "flexsearch";
import {
  getSections,
  getSubsections,
  createIdFromHeading,
} from "./MarkdownRenderer.jsx";
import fs from "fs";

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
        console.log(sectionId);
        if (sectionId == "about") {
          sectionTitle = "About";
          subsectionTitle = "About";
        }
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
      if (sectionId == "about") {
        sectionTitle = "About";
        subsectionTitle = "About";
      }
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

export async function initializeIndex() {
  if (indexInitialized) return;

  const sections = await getSections();
  const contentArray = [];

  for (const section of sections) {
    contentArray.push(...extractHeadingBlocks(section.content, section.id));
    const subsections = await getSubsections(section.id);

    for (const subsection of subsections) {
      console.log(section.id, section.title);
      console.log(subsection.id, subsection.title);
      console.log();
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
  // exportIndexFrontend();
  indexInitialized = true;
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

function createSnippet(content, query) {
  const queryLower = query.toLowerCase();
  const regex = new RegExp(
    `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
    "gi"
  );
  const paragraphs = content.split(/\n\s*\n/);

  // Filter to only paragraphs containing the query
  const matchedParagraphs = paragraphs.filter((para) =>
    para.toLowerCase().includes(queryLower)
  );

  if (matchedParagraphs.length === 0) {
    // fallback: highlight entire content if no paragraph found
    return content.replace(regex, "<mark>$1</mark>").trim();
  }

  // Highlight query in matched paragraphs
  const snippet = matchedParagraphs
    .map((para) => para.replace(regex, "<mark>$1</mark>").trim())
    .join("\n\n");

  return snippet.trim();
}

export async function search(query) {
  if (!query) return [];
  const results = index.search(query, {
    enrich: true,
    depth: 1,
    match: "strict",
  });

  const allResults = results.reduce(
    (acc, fieldResults) => acc.concat(fieldResults.result),
    []
  );

  const snippetResults = [];
  const seenKeys = new Set();

  allResults.forEach((res) => {
    const doc = res.doc;
    if (doc) {
      const regex = new RegExp(
        `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
        "gi"
      );

      const titleMatches =
        doc.title && doc.title.toLowerCase().includes(query.toLowerCase());
      const contentHasMatch =
        doc.content &&
        getPlaintextFromMarkdown(doc.content)
          .toLowerCase()
          .includes(query.toLowerCase());

      // Add title match as a result
      if (titleMatches) {
        const titleKey = `${res.id}-title`;
        if (!seenKeys.has(titleKey)) {
          seenKeys.add(titleKey);
          snippetResults.push({
            ...res,
            id: titleKey,
            snippet: doc.title.replace(regex, "<mark>$1</mark>"),
            allSnippets: [doc.title.replace(regex, "<mark>$1</mark>")],
          });
        }
      }

      // Add content match as a separate result
      if (contentHasMatch) {
        const contentKey = `${res.id}-content`;
        if (!seenKeys.has(contentKey)) {
          const plainText = getPlaintextFromMarkdown(doc.content);
          const contentSnippet = createSnippet(plainText, query);

          if (contentSnippet.includes("<mark>")) {
            seenKeys.add(contentKey);
            snippetResults.push({
              ...res,
              id: contentKey,
              snippet: contentSnippet,
              allSnippets: [contentSnippet],
            });
          }
        }
      }
    }
  });

  return snippetResults;
}
