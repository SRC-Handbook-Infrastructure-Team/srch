/**
 * Lightweight markdown data loader utilities.
 *
 * Keeps data/index loading separate from `MarkdownRenderer.jsx` so non-rendering
 * pages/components don't pull markdown rendering libraries into the startup bundle.
 */

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
    let parsedValue = value;
    if (
      (parsedValue.startsWith('"') && parsedValue.endsWith('"')) ||
      (parsedValue.startsWith("'") && parsedValue.endsWith("'"))
    ) {
      parsedValue = parsedValue.slice(1, -1);
    }

    if (parsedValue === "true") frontmatter[key.trim()] = true;
    else if (parsedValue === "false") frontmatter[key.trim()] = false;
    else if (!isNaN(Number(parsedValue)))
      frontmatter[key.trim()] = Number(parsedValue);
    else frontmatter[key.trim()] = parsedValue;
  });

  return { content: cleanContent, frontmatter };
}

export const allMarkdownFiles = import.meta.glob("../markdown/**/*.md", {
  query: "?raw",
  import: "default",
});

let preloadedNavigationData = null;
let preloadNavigationPromise = null;
let preloadedContentData = null;
let preloadContentPromise = null;
const contentCache = new Map();
let precomputedMarkdownData = null;
let precomputedMarkdownDataPromise = null;

async function loadBundledPrecomputedData() {
  try {
    const mod = await import("./precomputed-markdown-data.json");
    return mod?.default || mod || null;
  } catch {
    return null;
  }
}

async function loadPrecomputedMarkdownData() {
  if (precomputedMarkdownData) return precomputedMarkdownData;
  if (precomputedMarkdownDataPromise) return precomputedMarkdownDataPromise;

  precomputedMarkdownDataPromise = (async () => {
    try {
      const bundled = await loadBundledPrecomputedData();
      if (bundled && typeof bundled === "object") {
        precomputedMarkdownData = bundled;
        return bundled;
      }
    } catch {
      // fall through to fetch fallback
    }

    try {
      const base = import.meta.env?.BASE_URL ?? "/";
      const url = `${base}markdown-data.json`.replace(/\/\//g, "/");
      const response = await fetch(url, {
        cache: import.meta.env.DEV ? "no-store" : "default",
      });
      if (!response.ok) return null;

      const data = await response.json();
      if (!data || typeof data !== "object") return null;

      precomputedMarkdownData = data;
      return data;
    } catch {
      return null;
    }
  })();

  return precomputedMarkdownDataPromise;
}

function getAllowedNavigationSections(sections = [], allSubsectionsMap = {}) {
  return sections.filter(
    (s) =>
      s &&
      Array.isArray(allSubsectionsMap[s.id]) &&
      allSubsectionsMap[s.id].length > 0,
  );
}

function sanitizeSubsections(rawSubsections = []) {
  return rawSubsections
    .filter((s) => s && typeof s.id === "string" && s.id.trim())
    .filter((s) => {
      const id = (s.id || "").toLowerCase();
      return !id.startsWith(".") && id !== "drawer" && id !== "_drawer";
    })
    .map((s) => ({
      ...s,
      title:
        (s.title && String(s.title).trim()) ||
        String(s.id || "")
          .replace(/([A-Z])/g, " $1")
          .replace(/[-_]/g, " ")
          .replace(/\b\w/g, (m) => m.toUpperCase()),
      headings: null,
      order: typeof s.order === "number" ? s.order : 999,
    }))
    .sort((a, b) => (a.order || 999) - (b.order || 999));
}

export const getSections = async () => {
  try {
    const precomputed = await loadPrecomputedMarkdownData();
    if (Array.isArray(precomputed?.sections)) {
      return [...precomputed.sections].sort(
        (a, b) => (a.order || 999) - (b.order || 999),
      );
    }

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
          let content;
          try {
            content = await allMarkdownFiles[path]();
          } catch (error) {
            console.warn(`Skipping unreadable markdown file: ${path}`, error);
            continue;
          }
          const { content: cleanContent, frontmatter } =
            parseFrontmatter(content);

          sections.push({
            id: sectionId,
            title:
              frontmatter.title ||
              cleanContent.split("\n")[0].replace("# ", ""),
            order: frontmatter.order || 999,
            content: cleanContent,
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
    const precomputed = await loadPrecomputedMarkdownData();
    const precomputedSubsections =
      precomputed?.subsectionsBySection?.[sectionId];
    if (Array.isArray(precomputedSubsections)) {
      return [...precomputedSubsections].sort(
        (a, b) => (a.order || 999) - (b.order || 999),
      );
    }

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
          let content;
          try {
            content = await allMarkdownFiles[path]();
          } catch (error) {
            console.warn(`Skipping unreadable markdown file: ${path}`, error);
            continue;
          }
          const { content: cleanContent, frontmatter } =
            parseFrontmatter(content);

          subsections.push({
            id: subsectionId,
            title:
              frontmatter.title ||
              cleanContent.split("\n")[0].replace("# ", ""),
            order: frontmatter.order || 999,
            content: cleanContent,
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

export async function preloadNavigationData() {
  if (preloadedNavigationData) return preloadedNavigationData;
  if (preloadNavigationPromise) return preloadNavigationPromise;

  preloadNavigationPromise = (async () => {
    const sectionsData = await getSections();
    const sortedSections = Array.isArray(sectionsData)
      ? [...sectionsData].sort((a, b) => (a.order || 999) - (b.order || 999))
      : [];

    const subFetches = sortedSections.map((section) =>
      getSubsections(section.id),
    );
    const subResults = await Promise.all(subFetches);

    const allSubsectionsMap = {};
    sortedSections.forEach((section, idx) => {
      const sanitized = sanitizeSubsections(subResults[idx] || []);
      if (sanitized.length > 0) {
        allSubsectionsMap[section.id] = sanitized;
      }
    });

    const filteredSections = getAllowedNavigationSections(
      sortedSections,
      allSubsectionsMap,
    );
    const subsectionsMap = {};
    filteredSections.forEach((section) => {
      if (allSubsectionsMap[section.id]) {
        subsectionsMap[section.id] = allSubsectionsMap[section.id];
      }
    });

    if (typeof window !== "undefined") {
      window.__SRCH_SUBSECTIONS_CACHE__ =
        window.__SRCH_SUBSECTIONS_CACHE__ || {};

      for (const [sec, subs] of Object.entries(subsectionsMap)) {
        window.__SRCH_SUBSECTIONS_CACHE__[sec] = subs.map((s) => ({
          id: s.id,
          title: s.title,
        }));
      }
    }

    preloadedNavigationData = {
      sections: filteredSections,
      subsections: subsectionsMap,
      navSections: sortedSections,
      navSubsections: allSubsectionsMap,
    };

    return preloadedNavigationData;
  })();

  return preloadNavigationPromise;
}

export function getPreloadedNavigationData() {
  return preloadedNavigationData;
}

export function getPreloadedMarkdownContent(sectionId, subsectionId) {
  const cacheKey = subsectionId ? `${sectionId}/${subsectionId}` : sectionId;
  if (!cacheKey) return null;
  return contentCache.get(cacheKey) || null;
}

export async function preloadAllMarkdownContent() {
  if (preloadedContentData) return preloadedContentData;
  if (preloadContentPromise) return preloadContentPromise;

  preloadContentPromise = (async () => {
    const sections = await getSections();

    await Promise.all(
      sections.map(async (section) => {
        await getContent(section.id);

        const subsections = await getSubsections(section.id).catch(() => []);
        await Promise.all(
          subsections.map((subsection) =>
            getContent(section.id, subsection.id),
          ),
        );
      }),
    );

    preloadedContentData = {
      loadedAt: Date.now(),
      size: contentCache.size,
    };

    return preloadedContentData;
  })();

  return preloadContentPromise;
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

  const refRegex = /\[\^([^\]]+)\](?!:)/g;
  const ordered = [];
  const seen = new Set();
  while ((match = refRegex.exec(withoutFurtherReading)) !== null) {
    const key = match[1];
    if (!seen.has(key) && definitions[key] !== undefined) {
      seen.add(key);
      ordered.push({ key, content: definitions[key] });
    }
  }

  const stripped = withoutFurtherReading
    .replace(/^##\s+Footnotes\b[\s\S]*/m, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return { stripped, footnotes: ordered, definitions, furtherReadingBlock };
}

export const getContent = async (sectionId, subsectionId) => {
  try {
    const cacheKey = subsectionId ? `${sectionId}/${subsectionId}` : sectionId;
    if (cacheKey && contentCache.has(cacheKey)) {
      return contentCache.get(cacheKey);
    }

    if (cacheKey) {
      const precomputed = await loadPrecomputedMarkdownData();
      const precomputedContent = precomputed?.contentByKey?.[cacheKey];

      if (precomputedContent && typeof precomputedContent === "object") {
        const result = {
          content: precomputedContent.content || "",
          sidebar: precomputedContent.sidebar || {},
          allDefinitions: precomputedContent.allDefinitions || {},
          furtherReadingBlock: precomputedContent.furtherReadingBlock || null,
          objectives: precomputedContent.objectives || [],
          frontmatter: precomputedContent.frontmatter || {},
        };

        contentCache.set(cacheKey, result);
        return result;
      }
    }

    let path;
    if (sectionId && !subsectionId) {
      path = `../markdown/${sectionId}/${sectionId}.md`;
    } else if (sectionId && subsectionId) {
      path = `../markdown/${sectionId}/${subsectionId}/${subsectionId}.md`;
    } else {
      return null;
    }

    for (const filePath in allMarkdownFiles) {
      if (filePath.endsWith(path.slice(2))) {
        let content;
        try {
          content = await allMarkdownFiles[filePath]();
        } catch (error) {
          console.warn(`Failed to load markdown file: ${filePath}`, error);
          return null;
        }
        const { content: cleanContent, frontmatter } =
          parseFrontmatter(content);

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

        const sidebar = {};
        if (sidebarRaw) {
          const lines = sidebarRaw.split("\n");
          let currentKey = null;
          let currentHeading = null;
          let currentValue = [];

          lines.forEach((line) => {
            const normalizedLine = line.trimStart();
            const keyMatch = normalizedLine.match(/^([A-Za-z0-9-_]+):\s*$/);
            if (keyMatch) {
              if (currentKey) {
                sidebar[currentKey.toLowerCase()] = {
                  heading: currentHeading || currentKey.replace(/-/g, " "),
                  content: currentValue.join("\n").trim(),
                };
              }

              currentKey = keyMatch[1].trim();
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
        }

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

        const result = {
          content: parsedContent,
          sidebar,
          allDefinitions,
          furtherReadingBlock,
          frontmatter: { ...frontmatter, lastUpdated },
        };

        if (cacheKey) {
          contentCache.set(cacheKey, result);
        }

        return result;
      }
    }

    return null;
  } catch (error) {
    console.error("Failed to load content:", sectionId, subsectionId, error);
    return null;
  }
};

export async function warmMarkdownContent(sectionId, subsectionId = null) {
  if (!sectionId) return null;

  const tasks = [getContent(sectionId, subsectionId)];
  tasks.push(getSubsections(sectionId).catch(() => []));

  const [content] = await Promise.all(tasks);
  return content;
}
