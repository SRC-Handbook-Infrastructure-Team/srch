import FlexSearch from "flexsearch";
import {
  getSections,
  getSubsections,
  createIdFromHeading,
} from "./MarkdownRenderer.jsx";

const index = new FlexSearch.Document({
  document: {
    id: "id",
    index: [
      {
        field: "title",
        tokenize: "full",
        threshold: 0,
        storeLocations: true,
      },
      {
        field: "content",
        tokenize: "full",
        threshold: 0,
        storeLocations: true,
      },
    ],
    store: [
      "title",
      "sectionTitle",
      "section",
      "subsectionTitle",
      "subsection",
      "content",
      "sidebarKey",
      "anchor",
      "isDrawer",
    ],
  },
  preset: "match",
  encode: false,
  matcher: false,
  filter: false,
});

let indexInitialized = false;

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

  // Remove Markdown table rows (lines starting and ending with |)
  content = content.replace(/^\s*\|[-:\s|]+\|\s*$/gm, "");

  // Normalize spaces (but keep newlines)
  content = content.replace(/[ \t]{2,}/g, " ");

  // Preserve paragraph breaks by replacing multiple newlines with exactly two newlines
  content = content.replace(/\n{2,}/g, "\n\n").trim();

  // Remove remaining text inside square brackets including the brackets
  content = content.replace(/\[[^\]]*\]/g, "");

  return content;
}
function truncateSnippet(snippet, searchQuery) {
  if (!snippet) return "";

  const lowerSnippet = snippet.toLowerCase();
  const lowerQuery = searchQuery.toLowerCase();

  const idx = lowerSnippet.indexOf(lowerQuery);

  if (idx !== -1) {
    const beforeQuery = snippet.slice(0, idx);

    const lastSpaceIdx = beforeQuery.lastIndexOf(" ");
    const wordStartIdx = lastSpaceIdx + 1;

    let snippetStartIndex = lastSpaceIdx !== -1 ? wordStartIdx : 0;

    let charBeforeIdx = snippetStartIndex - 1;
    while (
      charBeforeIdx >= 0 &&
      (snippet[charBeforeIdx] === " " ||
        snippet[charBeforeIdx] === "\n" ||
        snippet[charBeforeIdx] === "\r")
    ) {
      charBeforeIdx--;
    }

    const sentenceEndPunctuations = [".", "!", "?"];
    const charBefore = charBeforeIdx >= 0 ? snippet[charBeforeIdx] : null;

    const addEllipses =
      charBeforeIdx >= 0 && !sentenceEndPunctuations.includes(charBefore);

    let resultSnippet = snippet.slice(snippetStartIndex);
    if (addEllipses) {
      resultSnippet = "..." + resultSnippet;
    }
    return resultSnippet;
  }

  return snippet;
}

function extractBlocksFromContent(
  sectionId,
  sectionTitle,
  content,
  subsectionId = null,
  subsectionTitle = null,
  defaultTitle = null
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
        sectionTitle: sectionTitle,
        subsection: subsectionId,
        subsectionTitle: subsectionTitle,
        anchor: currentAnchor,
        title: getPlaintextFromMarkdown(currentTitle),
        content: currentLines.join("\n").trim(),
        isDrawer: false,
      });
    } else if (currentLines.length) {
      blocks.push({
        id: `${sectionId}${subsectionId ? "/" + subsectionId : ""}#intro`,
        section: sectionId,
        sectionTitle: sectionTitle,
        subsection: subsectionId,
        subsectionTitle: subsectionTitle,
        anchor: "intro",
        title: defaultTitle
          ? getPlaintextFromMarkdown(defaultTitle)
          : "Introduction",
        content: currentLines.join("\n").trim(),
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
    const subsections = await getSubsections(section.id);
    for (const subsection of subsections) {
      const { mainContent: subMain, sidebarRaw: subSidebar } =
        extractMainAndSidebar(subsection.content);
      const subSidebarParsed = subSidebar ? parseSidebar(subSidebar) : {};

      const subBlocks = extractBlocksFromContent(
        section.id,
        section.title,
        subMain,
        subsection.id,
        subsection.title
      );
      contentArray.push(...subBlocks);

      for (const [key, value] of Object.entries(subSidebarParsed)) {
        const sidebarBlocks = extractBlocksFromContent(
          section.id,
          section.title,
          value.content,
          subsection.id,
          subsection.title,
          value.heading || null
        );

        sidebarBlocks.forEach((block) => {
          const baseId = `${section.id}/${subsection.id}#sidebar-${key}`;
          contentArray.push({
            ...block,
            id: baseId,
            anchor: key,
            sidebarKey: key,
            isDrawer: true,
          });
        });
      }
    }
  }

  contentArray.forEach((item) => {
    index.add(item);
  });

  indexInitialized = true;
}

function createSnippet(content, query) {
  const queryLower = query.toLowerCase();
  const regex = new RegExp(
    `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
    "gi"
  );
  const paragraphs = content.split(/\n\s*\n/);

  const matchedParagraphs = paragraphs.filter((para) =>
    para.toLowerCase().includes(queryLower)
  );

  if (matchedParagraphs.length === 0) {
    return content.replace(regex, "<mark>$1</mark>").trim();
  }

  const snippet = matchedParagraphs
    .map((para) => para.replace(regex, "<mark>$1</mark>").trim())
    .join("\n\n");

  return snippet.trim();
}

export async function search(query, truncateSnippetFlag = true) {
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
        doc.title &&
        doc.title.toLowerCase().includes(query.toLowerCase()) &&
        doc.title !== "Introduction";
      const contentHasMatch =
        doc.content &&
        getPlaintextFromMarkdown(doc.content)
          .toLowerCase()
          .includes(query.toLowerCase());

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

      if (contentHasMatch) {
        const contentKey = `${res.id}-content`;
        if (!seenKeys.has(contentKey)) {
          const plainText = getPlaintextFromMarkdown(doc.content);
          let baseSnippet;
          if (truncateSnippetFlag) {
            baseSnippet = createSnippet(plainText, query);
          } else {
            baseSnippet = plainText.replace(regex, "<mark>$1</mark>");
          }

          const contentSnippet = truncateSnippetFlag
            ? truncateSnippet(baseSnippet, query)
            : baseSnippet;

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
