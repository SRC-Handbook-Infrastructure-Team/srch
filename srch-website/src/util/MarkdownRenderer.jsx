/**
 * MarkdownRenderer.jsx
 *
 * Renders Markdown content with Chakra UI components.
 * Handles headings, paragraphs, links, lists, tables, and embedded drawers.
 * Includes support for highlighting search terms.
 */

import React from "react";
import { useMemo, useRef, useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Link as RouterLink } from "react-router-dom";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { remarkSidebarRef } from "./remarkSidebarRef";
import { remarkHighlight } from "./remarkHighlight";
import { Text, Link, Box, HStack, Icon } from "@chakra-ui/react";
import { InfoIcon, ExternalLinkIcon, LinkIcon } from "@chakra-ui/icons";
import { BsFileEarmarkText } from "react-icons/bs";

/* ----------------------------- Highlight Utility ----------------------------- */

export function highlightText(node, highlight) {
  if (!highlight || (!node && node !== 0)) return node;
  if (typeof node === "string") {
    const regex = new RegExp(`(${highlight})`, "gi");
    const parts = node.split(regex);
    return parts.map((part, idx) =>
      regex.test(part) ? <mark key={idx}>{part}</mark> : part,
    );
  }
  if (Array.isArray(node)) {
    return node.map((child) => highlightText(child, highlight));
  }
  if (React.isValidElement(node)) {
    return React.cloneElement(
      node,
      node.props,
      highlightText(node.props.children, highlight),
    );
  }
  return node;
}

/* ----------------------------- Footnote Renumbering ----------------------------- */

export function renumberFootnotes(markdown) {
  if (!markdown || typeof markdown !== "string") return markdown;

  // Match footnote references but not definitions (avoid trailing colon)
  const refRegex = /\[\^([^\]]+)\](?!:)/g;
  // Match footnote definitions at line start
  const defRegex = /^\[\^([^\]]+)\]:/gm;

  const map = new Map();
  let counter = 0;
  let match;

  while ((match = refRegex.exec(markdown)) !== null) {
    const key = match[1];
    if (!map.has(key)) {
      counter += 1;
      map.set(key, String(counter));
    }
  }

  if (map.size === 0) return markdown;

  let updated = markdown.replace(refRegex, (_, key) => {
    const mapped = map.get(key);
    return mapped ? `[^${mapped}]` : `[^${key}]`;
  });

  updated = updated.replace(defRegex, (full, key) => {
    const mapped = map.get(key);
    return mapped ? `[^${mapped}]:` : full;
  });

  return updated;
}

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

/* ----------------------------- Markdown Imports ----------------------------- */

export const allMarkdownFiles = import.meta.glob("../markdown/**/*.md", {
  query: "?raw",
  import: "default",
});

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

/* ----------------------------- Content Loader ----------------------------- */

/**
 * Extracts footnote definitions from a markdown string.
 *
 * FIX: Replaced broken lookahead regex (?=^\[\^|\n\n|\Z) — \Z is not valid
 * in JavaScript RegExp. The old regex silently failed to capture the LAST
 * footnote definition in a block (no trailing \n\n after it), so e.g. [^9]
 * was always dropped. The new regex uses a negative lookahead on each
 * continuation line instead, which correctly captures every definition
 * including the last one.
 *
 * FIX: The stripped output now also removes the ## References and
 * ## Footnotes section headings (and all content under ## References), which
 * previously leaked into the rendered page as visible headings and plain text.
 *
 * Returns { stripped, footnotes } where:
 *   - stripped: markdown with footnote definitions AND reference/footnotes
 *               section headings removed
 *   - footnotes: array of { key, content } in order of first reference
 */
export function extractFootnotes(markdown) {
  if (!markdown || typeof markdown !== "string") {
    return { stripped: markdown, footnotes: [] };
  }

  // FIX: New definition regex — continuation lines are any line that does NOT
  // start a new [^key]: definition and is not a blank line.
  // This correctly captures the last definition in a block.
  const defRegex = /^\[\^([^\]]+)\]:\s*(.*(?:\n(?!\[\^|\s*$).*)*)/gm;
  const definitions = {};
  let match;
  while ((match = defRegex.exec(markdown)) !== null) {
    definitions[match[1]] = match[2].trim();
  }

  // Order footnotes by first reference appearance in the text
  const refRegex = /\[\^([^\]]+)\](?!:)/g;
  const ordered = [];
  const seen = new Set();
  while ((match = refRegex.exec(markdown)) !== null) {
    const key = match[1];
    if (!seen.has(key) && definitions[key] !== undefined) {
      seen.add(key);
      ordered.push({ key, content: definitions[key] });
    }
  }

  // FIX: Strip ## References and ## Footnotes section headings + their content.
  // These sections always appear at the tail of the document (before ## Sidebar),
  // so stripping to end-of-string is safe and removes stray citation text too.
  // Also strip any remaining bare [^key]: definition lines.
  const stripped = markdown
    .replace(/^##\s+References\b[\s\S]*/m, "")
    .replace(/^##\s+Footnotes\b[\s\S]*/m, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return { stripped, footnotes: ordered, definitions };
}

/**
 * Merges footnotes from main content and multiple sidebar entries.
 * Re-numbers all references consistently and returns:
 *   - updatedMain: main markdown with refs renumbered
 *   - updatedSidebarMap: { [termKey]: markdown with defs stripped + refs renumbered }
 *   - mergedFootnotes: array of { number, content } for the unified section
 */
export function mergeFootnotes(mainMarkdown, sidebarMap, allDefinitions = {}) {
  const { stripped: mainStripped, definitions: mainOnlyDefs } =
    extractFootnotes(mainMarkdown);

  const allDefs = { ...allDefinitions, ...mainOnlyDefs };

  let counter = 0;
  const keyToNumber = new Map();
  const mergedFootnotes = [];

  function assignNumber(key) {
    if (keyToNumber.has(key)) return keyToNumber.get(key);
    const def = allDefs[key];
    if (def === undefined) return null;
    counter += 1;
    keyToNumber.set(key, counter);
    mergedFootnotes.push({ number: counter, content: def, key });
    return counter;
  }

  function renumberText(text) {
    return text.replace(/\[\^([^\]]+)\](?!:)/g, (_, key) => {
      const num = assignNumber(key);
      return num !== null ? `[^${num}]` : `[^${key}]`;
    });
  }

  // 1. Walk main body first — assigns numbers in reading order
  const updatedMain = renumberText(mainStripped);

  // 2. Walk every sidebar entry — assigns numbers to sidebar-only refs
  const updatedSidebarMap = {};
  for (const [termKey, entry] of Object.entries(sidebarMap || {})) {
    const { stripped: sidebarStripped } = extractFootnotes(entry.content);
    const renumbered = renumberText(sidebarStripped);
    updatedSidebarMap[termKey] = { ...entry, content: renumbered };
  }

  // 3. Any definition in allDefs not yet referenced gets appended at the end
  //    so all 9 footnotes always appear in the main footnote list.
  for (const key of Object.keys(allDefs)) {
    assignNumber(key); // no-op if already assigned
  }

  return { updatedMain, updatedSidebarMap, mergedFootnotes };
}

export const getContent = async (sectionId, subsectionId) => {
  try {
    let path;
    if (sectionId && !subsectionId) {
      path = `../markdown/${sectionId}/${sectionId}.md`;
    } else if (sectionId && subsectionId) {
      path = `../markdown/${sectionId}/${subsectionId}/${subsectionId}.md`;
    } else {
      return null;
    }

    /**
     * This code looks into all of the filepath and does the following:
     * looks for the ## All Sidebar Content Below divider (or "## Sidebar")
     * creates the sidebar dictionary to pull from later (keys stored lowercase)
     * extracts the Key (identical to the clickable term)
     * extracts the Value (the paragraphical content)
     * extracts the Heading (if provided used as the title heading for the sidbar)
     */
    for (const filePath in allMarkdownFiles) {
      if (filePath.endsWith(path.slice(2))) {
        const content = await allMarkdownFiles[filePath]();
        const { content: cleanContent, frontmatter } =
          parseFrontmatter(content);

        const { definitions: allDefinitions } = extractFootnotes(cleanContent);

        // allow either of these headings as the sidebar divider
        const dividerRegex = /^##\s*(All Sidebar Content Below|Sidebar)\s*$/m;
        const dividerMatch = dividerRegex.exec(cleanContent);

        let mainContent = cleanContent;
        let sidebarRaw = null;

        if (dividerMatch) {
          // split at the divider line; keep everything after it as sidebar raw
          const splitIndex = dividerMatch.index;
          mainContent = cleanContent.slice(0, splitIndex).trim();
          // the remainder after the matched divider heading line
          const afterDivider = cleanContent.slice(
            dividerMatch.index + dividerMatch[0].length,
          );
          sidebarRaw = afterDivider.trim();
        }

        const sidebar = {};
        if (sidebarRaw) {
          const lines = sidebarRaw.split("\n");
          let currentKey = null;
          let currentHeading = null;
          let currentValue = [];

          lines.forEach((line) => {
            const keyMatch = line.match(/^([A-Za-z0-9-_]+):\s*$/);
            if (keyMatch) {
              if (currentKey) {
                // store with lowercase key for case-insensitive lookup
                sidebar[currentKey.toLowerCase()] = {
                  heading: currentHeading || currentKey.replace(/-/g, " "),
                  content: currentValue.join("\n").trim(),
                };
              }

              currentKey = keyMatch[1].trim();
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
        }

        const parsedContent = mainContent.replace(/\{([^}]+)\}/g, (_, term) => {
          return `<sidebar-ref term="${term}"></sidebar-ref>`;
        });

        // Extract lastUpdated from frontmatter if available
        let lastUpdated = null;

        // fontMatter lastUpdated takes precedence
        if (frontmatter.lastUpdated) {
          lastUpdated = frontmatter.lastUpdated;
        } else {
          // Fallback: look for a line like "_Last updated Month Day Year._" at the end
          const footerMatch = mainContent.match(/_Last updated\s+(.+?)\._/i);
          if (footerMatch) {
            lastUpdated = footerMatch[1].trim();
          }
        }
        return {
          content: parsedContent,
          sidebar,
          allDefinitions,
          frontmatter: { ...frontmatter, lastUpdated },
        };
      }
    }

    return null;
  } catch (error) {
    console.error("Failed to load content:", sectionId, subsectionId, error);
    return null;
  }
};

/* ----------------------------- Subsection Parser ----------------------------- */

export const parseSubsections = (content) => {
  if (!content) return [];
  const contentStr = typeof content === "string" ? content : content.content;
  if (!contentStr) return [];

  const normalizedContent = contentStr.replace(/\r/g, "");
  const lines = normalizedContent.split("\n");
  const subsections = [];

  for (const line of lines) {
    if (line.startsWith("## ")) {
      const title = line.replace("## ", "");
      subsections.push({
        title,
        id: createIdFromHeading(title),
      });
    }
  }

  return subsections;
};

/* ----------------------------- Markdown Renderer ----------------------------- */

function MarkdownRenderer({
  content,
  sidebar,
  sectionId,
  subsectionId,
  onDrawerOpen,
  onNavigation,
  isFinal,
  highlight,
  urlTerm,
  mergedSidebar,
  onFootnotesReady,
  extraFootnotes = [],
  allDefinitions = {},
  // ── NEW prop ──────────────────────────────────────────────────────────────
  // Pre-computed map of footnoteKey → "main" | sidebarSlug.
  // Built by buildFootnoteOriginMap() in MarkdownPage and passed down.
  // When provided it replaces the internal re-derivation that only saw the
  // raw content string and missed sidebar-only definitions.
  // Falls back to {} so the renderer stays self-contained when used standalone
  // (e.g. inside a drawer where footnotes are always local).
  footnoteOriginMap: externalOriginMap = {},
}) {
  const processed = useMemo(() => {
    if (!content)
      return { main: "", sidebar: {}, footnotes: [], footnoteOriginMap: {} };

    let raw = typeof content === "string" ? content : content.content || "";

    const sidebarRegex = /^##\s+Sidebar\s*$/im;
    const sidebarMatch = raw.match(sidebarRegex);
    let mainContent = raw;
    let sidebarContent = "";
    if (sidebarMatch) {
      mainContent = raw.slice(0, sidebarMatch.index).trim();
      sidebarContent = raw
        .slice(sidebarMatch.index + sidebarMatch[0].length)
        .trim();
    }

    const footnoteDefRegex = /^\[\^([0-9]+)\]:\s*(.*(?:\n(?!\[\^|\s*$).*)*)/gm;
    const footnotesMap = new Map();
    const localOriginMap = {};
    let match;

    while ((match = footnoteDefRegex.exec(mainContent)) !== null) {
      footnotesMap.set(match[1], {
        num: match[1],
        content: match[2].trim(),
        from: "main",
      });
      localOriginMap[match[1]] = "main";
    }

    if (sidebarContent) {
      const lines = sidebarContent.split(/\r?\n/);
      let currentSlug = null;
      for (let i = 0; i < lines.length; ++i) {
        const line = lines[i];
        const slugMatch = line.match(/^(\w[\w-]*):\s*$/);
        if (slugMatch) {
          currentSlug = slugMatch[1];
          continue;
        }
        const refMatch = line.match(/\[\^([0-9]+)\]/);
        if (refMatch && currentSlug) {
          if (!footnotesMap.has(refMatch[1])) {
            localOriginMap[refMatch[1]] = currentSlug;
          }
        }
        let m;
        while ((m = footnoteDefRegex.exec(line)) !== null) {
          footnotesMap.set(m[1], {
            num: m[1],
            content: m[2].trim(),
            from: currentSlug || "main",
          });
          localOriginMap[m[1]] = currentSlug || "main";
        }
      }
    }

    const mergedOriginMap = { ...localOriginMap, ...externalOriginMap };

    const footnotes = Array.from(footnotesMap.values()).sort(
      (a, b) => Number(a.num) - Number(b.num),
    );

    let contentWithoutDefs = mainContent;
    contentWithoutDefs = contentWithoutDefs.replace(footnoteDefRegex, "");
    if (sidebarContent) {
      contentWithoutDefs += "\n" + sidebarContent.replace(footnoteDefRegex, "");
    }

    const footnotesSectionRegex = /^##\s+Footnotes[\s\S]*?(?=^##\s|\n*$)/gim;
    let replaced = contentWithoutDefs.replace(
      footnotesSectionRegex,
      () => "[[CUSTOM_FOOTNOTES_SECTION]]",
    );
    const refRegex = /\[\^([0-9]+)\]/g;
    replaced = replaced.replace(refRegex, (m, n) => {
      const origin = mergedOriginMap[n];
      let href = `#user-content-fn-${n}`;
      if (origin && origin !== "main" && sectionId && subsectionId) {
        href = `/${sectionId}/${subsectionId}/${origin}#user-content-fn-${n}`;
      }
      return `<sup id=\"user-content-fnref-${n}\"><a href=\"${href}\" style=\"color: var(--color-text-hover); font-weight: bold; text-decoration: none;\">${n}</a></sup>`;
    });

    return {
      main: replaced,
      sidebar: {},
      footnotes,
      footnoteOriginMap: mergedOriginMap,
    };
  }, [content, externalOriginMap, sectionId, subsectionId]);

  /* ------------------------------------------------------------------------
   * Styling tokens used inside the components map
   * --------------------------------------------------------------------- */
  const RED = "var(--color-text-hover)";
  const BLACK = "var(--color-text)";

  /* ------------------------------------------------------------------------
   * Active drawer link state handling
   * --------------------------------------------------------------------- */
  const observerRef = useRef(null);
  const [activeDrawerLink, setActiveDrawerLinkState] = useState(null);

  useEffect(() => {
    const drawer = document.querySelector(".right-sidebar");
    if (!drawer) return;

    const cleanupAllActive = () => {
      document
        .querySelectorAll(".srch-drawer-link-active")
        .forEach((el) => el.classList.remove("srch-drawer-link-active"));
      setActiveDrawerLinkState(null);
    };

    const obs = new MutationObserver(() => {
      const isOpen = drawer.classList.contains("open");
      if (!isOpen) {
        cleanupAllActive();
      }
    });

    obs.observe(drawer, { attributes: true, attributeFilter: ["class"] });
    observerRef.current = obs;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      document
        .querySelectorAll(".srch-drawer-link-active")
        .forEach((el) => el.classList.remove("srch-drawer-link-active"));
      setActiveDrawerLinkState(null);
    };
  }, []);

  function focusDrawerChip(term) {
    if (!term) return;

    window.requestAnimationFrame(() => {
      const el = document.querySelector(
        `.srch-drawer-link[data-term="${term}"]`,
      );
      if (!el) return;

      let container = el.parentElement;
      while (container && container !== document.body) {
        const style = window.getComputedStyle(container);
        if (style.overflowY === "auto" || style.overflowY === "scroll") break;
        container = container.parentElement;
      }

      if (!container || container === document.body) {
        el.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "nearest",
        });
        return;
      }

      const cRect = container.getBoundingClientRect();
      const eRect = el.getBoundingClientRect();
      const margin = 24;

      const isAbove = eRect.top < cRect.top + margin;
      const isBelow = eRect.bottom > cRect.bottom - margin;

      if (!isAbove && !isBelow) return;

      const delta = isAbove
        ? eRect.top - cRect.top - margin
        : eRect.bottom - cRect.bottom + margin;

      container.scrollTo({
        top: container.scrollTop + delta,
        behavior: "smooth",
      });
    });
  }

  useEffect(() => {
    if (!activeDrawerLink) return;

    const drawer = document.querySelector(".right-sidebar");
    if (!drawer) return;

    const timeout = setTimeout(() => {
      focusDrawerChip(activeDrawerLink);
    }, 350);

    return () => clearTimeout(timeout);
  }, [activeDrawerLink]);

  const footnoteSourceMap = useMemo(() => {
    const map = new Map();
    for (const f of processed.footnotes) {
      map.set(f.num, f.from);
    }
    return map;
  }, [processed.footnotes]);

  const components = useMemo(
    () => ({
      h1: (props) => (
        <h1
          style={{
            marginTop: "2.5rem",
            marginBottom: "1rem",
            color: "var(--color-header)",
            fontFamily: "Funnel Sans, sans-serif",
            fontWeight: 700,
          }}
          {...props}
        >
          {Array.isArray(props.children)
            ? props.children.map((child) =>
                typeof child === "string"
                  ? highlightText(child, highlight)
                  : child,
              )
            : props.children}
          {isFinal === false && <span className="beta-tag">BETA</span>}
        </h1>
      ),
      h2: ({ children, ...props }) => {
        const id = createIdFromHeading(children);
        const childrenArray = Array.isArray(children) ? children : [children];
        return (
          <h2
            id={id}
            style={{
              marginTop: "1.5rem",
              marginBottom: "1.5rem",
              fontSize: "1.5em",
              color: "var(--color-header)",
              fontFamily: "Be Vietnam Pro, sans-serif",
              fontWeight: 600,
            }}
            {...props}
          >
            {highlightText(childrenArray, highlight)}
          </h2>
        );
      },
      h3: ({ children, ...props }) => {
        const id = createIdFromHeading(children);
        const childrenArray = Array.isArray(children) ? children : [children];
        return (
          <h3
            id={id}
            style={{
              marginBottom: ".5rem",
              fontSize: "1em",
              color: "var(--color-header)",
              fontFamily: "Be Vietnam Pro, sans-serif",
              fontWeight: 600,
            }}
            {...props}
          >
            {highlightText(childrenArray, highlight)}
          </h3>
        );
      },
      p: ({ children }) => {
        return (
          <p
            style={{
              color: BLACK,
              fontFamily: "Be Vietnam Pro, sans-serif",
              lineHeight: "1.6",
              marginBottom: ".5em",
            }}
          >
            {highlightText(children, highlight)}
          </p>
        );
      },

      a: (props) => {
        if ("data-footnote-backref" in props) return null;
        const isFootnoteLink =
          props.href?.startsWith("#user-content-fn") ||
          props.href?.includes("#user-content-fn");
        const isExternal =
          props.href &&
          (props.href.startsWith("http://") ||
            props.href.startsWith("https://"));
        const childrenArray = Array.isArray(props.children)
          ? props.children
          : [props.children];
        return (
          <a
            {...props}
            style={{
              textDecoration: isFootnoteLink ? "none" : "underline",
              color: "var(--color-text-hover)",
            }}
            href={props.href}
            target={isExternal ? "_blank" : undefined}
          >
            {childrenArray.map((child, index) =>
              typeof child === "string" ? (
                highlightText(child, highlight)
              ) : (
                <span key={index}>{child}</span>
              ),
            )}
            {isExternal && (
              <span style={{ marginLeft: "0.2em" }}>
                <ExternalLinkIcon></ExternalLinkIcon>
              </span>
            )}
          </a>
        );
      },
      li: (props) => {
        const { id, children, ...rest } = props;
        const childrenArray = Array.isArray(children) ? children : [children];
        let number = null;
        if (id && id.startsWith("user-content-fn-")) {
          const match = id.match(/\d+/);
          if (match) number = match[0];
        }
        let backHref = number ? `#user-content-fnref-${number}` : null;
        if (number) {
          const origin = processed.footnoteOriginMap[number];
          if (origin && origin !== "main" && sectionId && subsectionId) {
            backHref = `/${sectionId}/${subsectionId}/${origin}#user-content-fnref-${number}`;
          }
        }
        return (
          <li
            id={id}
            style={{
              color: BLACK,
              fontFamily: "Be Vietnam Pro, sans-serif",
              position: "relative",
              paddingLeft: number ? "1.5rem" : "0",
              listStyleType: number ? "none" : undefined,
            }}
            {...rest}
          >
            {number && (
              <a
                href={backHref}
                style={{
                  position: "absolute",
                  left: 0,
                  color: RED,
                  fontWeight: "bold",
                  textDecoration: "none",
                }}
                aria-label={`Back to reference ${number}`}
              >
                {number}.
              </a>
            )}
            {highlightText(childrenArray, highlight)}
          </li>
        );
      },
      sup: (props) => {
        const child = props.children;
        const number =
          typeof child === "string"
            ? child
            : Array.isArray(child) && typeof child[0] === "string"
              ? child[0]
              : null;
        if (number && /^\d+$/.test(number)) {
          return (
            <sup>
              <a
                href={`#user-content-fnref-${number}`}
                style={{
                  color: RED,
                  fontWeight: "bold",
                  textDecoration: "none",
                }}
                aria-label={`Back to reference ${number}`}
              >
                {number}
              </a>
            </sup>
          );
        }
        return <sup {...props}>{props.children}</sup>;
      },

      ul: (props) => (
        <ul
          style={{
            paddingLeft: "1.5em",
            marginBottom: "1em",
            color: BLACK,
            fontFamily: "Be Vietnam Pro, sans-serif",
          }}
          {...props}
        />
      ),
      ol: (props) => (
        <ol
          style={{
            paddingLeft: "1.5em",
            marginBottom: "1em",
            color: BLACK,
            fontFamily: "Be Vietnam Pro, sans-serif",
          }}
          {...props}
        />
      ),
      code: ({ inline, ...props }) =>
        inline ? (
          <code
            style={{
              background: "#f3ece6",
              color: BLACK,
              fontFamily: "Funnel Sans, sans-serif",
              borderRadius: "3px",
              padding: "2px 4px",
            }}
            {...props}
          />
        ) : (
          <pre
            style={{
              background: "#f3ece6",
              color: BLACK,
              fontFamily: "Funnel Sans, sans-serif",
              borderRadius: "6px",
              padding: "1em",
              overflowX: "auto",
            }}
            {...props}
          />
        ),
      table: (props) => (
        <div style={{ overflowX: "auto", margin: "1em 0" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              color: BLACK,
              fontFamily: "Be Vietnam Pro, sans-serif",
            }}
            {...props}
          >
            {props.children}
          </table>
        </div>
      ),
      th: (props) => (
        <th
          style={{
            border: "1px solid #e0d7ce",
            color: BLACK,
            fontFamily: "Be Vietnam Pro, sans-serif",
            padding: "0.5em",
          }}
          {...props}
        />
      ),
      td: (props) => (
        <td
          style={{
            border: "1px solid #e0d7ce",
            color: BLACK,
            fontFamily: "Be Vietnam Pro, sans-serif",
            padding: "0.5em",
          }}
          {...props}
        />
      ),
      img: (props) => (
        <img
          src={props.src}
          alt={props.alt || ""}
          style={{
            maxWidth: "80%",
            maxHeight: "500px",
            objectFit: "contain",
            borderRadius: "6px",
            margin: "1.5em auto",
            display: "block",
          }}
        />
      ),

      "sidebar-ref": ({ node }) => {
        let raw = node.properties?.["term"] || "";
        let term = raw;
        let label = null;

        if (raw.includes("|")) {
          const [keyPart, labelPart] = raw.split("|");
          term = keyPart.trim();
          label = labelPart.trim();
        }

        const termKey = term.toLowerCase();
        const value = sidebar?.[termKey];

        const isActive = urlTerm && urlTerm.toLowerCase() === termKey;

        const toShow = value
          ? label ||
            term.replace(/-/g, " ").replace(/Case Study(?!:)/g, "Case Study:")
          : `⚠️ Missing: ${term}`;

        const handleClick = (e) => {
          e.preventDefault();
          if (!value) return;

          if (isActive) {
            onDrawerOpen && onDrawerOpen(null);
          } else {
            onDrawerOpen && onDrawerOpen(termKey);
          }
        };

        return (
          <Box
            as={RouterLink}
            to={`/${sectionId}/${subsectionId}/${termKey}`}
            onClick={handleClick}
            className={`srch-drawer-link ${
              isActive ? "srch-drawer-link-active" : ""
            }`}
            data-term={termKey}
            display="inline-flex"
            verticalAlign="baseline"
            alignItems="center"
            whiteSpace="normal"
            flexShrink={1}
            maxW="100%"
            minW={0}
          >
            <Text
              as="span"
              fontSize="inherit"
              lineHeight="inherit"
              sx={{
                overflowWrap: "anywhere",
                wordBreak: "break-word",
                minWidth: 0,
              }}
            >
              {highlightText(toShow, highlight)}
            </Text>
            <Icon as={InfoIcon} flexShrink={0} />
          </Box>
        );
      },

      "nav-link": ({ node }) => {
        const text = node.properties?.text;
        const target = node.properties?.target;
        return (
          <HStack
            as="button"
            type="button"
            spacing={1}
            display="inline-flex"
            alignItems="center"
            onClick={() => onNavigation && onNavigation(target)}
            color="blue.400"
            cursor="pointer"
            _hover={{ color: "purple.500", textDecoration: "none" }}
          >
            <Link>{highlightText(text, highlight)}</Link>
            <Icon as={BsFileEarmarkText} boxSize="0.8em" />
          </HStack>
        );
      },
      section: ({ node, children, ...props }) => {
        const isDrawerMode = sidebar && Object.keys(sidebar).length === 0;
        if (isDrawerMode && node?.properties?.dataFootnotes != null) {
          return null;
        }
        return <section {...props}>{children}</section>;
      },
    }),
    [
      onDrawerOpen,
      onNavigation,
      isFinal,
      sectionId,
      subsectionId,
      sidebar,
      highlight,
      urlTerm,
      footnoteSourceMap,
      processed.footnoteOriginMap,
    ],
  );

  useEffect(() => {
    const handler = (e) => {
      const a = e.target.closest("a[data-sidebar]");
      if (a) {
        e.preventDefault();
        const sidebarKey = a.getAttribute("data-sidebar");
        if (onDrawerOpen && sidebarKey) {
          const href = a.getAttribute("href") || "";
          const hashIndex = href.lastIndexOf("#");
          const hash = hashIndex !== -1 ? href.slice(hashIndex) : "";
          onDrawerOpen(sidebarKey, hash);
        }
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [onDrawerOpen]);

  /* ─────────────────────────────────────────────────────────────────────────
   * CustomFootnotesSection
   *
   * Renders the unified footnote list at the bottom of the page.
   *
   * For each footnote, it looks up the origin in processed.footnoteOriginMap
   * (which already merges the external map from MarkdownPage with the locally
   * derived map):
   *   - origin === "main"  → back-link is a local anchor (#user-content-fnref-N)
   *   - origin === slug    → back-link navigates to the drawer URL and includes
   *                          a data-sidebar attribute so the click handler above
   *                          can intercept it and open the drawer directly.
   * ───────────────────────────────────────────────────────────────────────── */
  function CustomFootnotesSection() {
    const [showFootnotes, setShowFootnotes] = useState(false);
    useEffect(() => {
      function handleFootnoteClick(e) {
        const a = e.target.closest('a[href^="#user-content-fn-"]');
        if (a) {
          const href = a.getAttribute("href");
          if (href && href.startsWith("#user-content-fn-")) {
            setShowFootnotes(true);
            setTimeout(() => {
              const id = href.slice(1);
              const el = document.getElementById(id);
              if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "center" });
                el.classList.add("footnote-highlight");
                setTimeout(
                  () => el.classList.remove("footnote-highlight"),
                  1200,
                );
              }
            }, 100);
          }
        }
      }
      document.addEventListener("click", handleFootnoteClick);
      return () => document.removeEventListener("click", handleFootnoteClick);
    }, []);
    if (!processed.footnotes.length) return null;
    return (
      <section data-footnotes className="footnotes">
        <button
          type="button"
          className="footnotes-toggle"
          onClick={() => setShowFootnotes((prev) => !prev)}
          aria-expanded={showFootnotes}
          aria-controls="footnotes-list"
          style={{
            display: "flex",
            alignItems: "center",
            background: "none",
            border: "none",
            color: "var(--color-header)",
            fontFamily: "Be Vietnam Pro, sans-serif",
            fontWeight: 600,
            fontSize: "1.1em",
            cursor: "pointer",
            marginTop: "1.5rem",
            marginBottom: "1.5rem",
          }}
        >
          <span
            className={`footnotes-caret${showFootnotes ? " open" : ""}`}
            style={{ marginRight: 8 }}
          >
            ▸
          </span>
          {showFootnotes ? "Hide footnotes" : "Show footnotes"}
        </button>
        {showFootnotes && (
          <ol
            id="footnotes-list"
            style={{
              paddingLeft: "1.5em",
              marginBottom: "1em",
              color: "var(--color-text)",
              fontFamily: "Be Vietnam Pro, sans-serif",
            }}
          >
            {processed.footnotes.map((f) => {
              const origin = processed.footnoteOriginMap[f.num];
              const isSidebarLinked =
                origin && origin !== "main" && sectionId && subsectionId;
              const backHref = isSidebarLinked
                ? `/${sectionId}/${subsectionId}/${origin}#user-content-fnref-${f.num}`
                : `#user-content-fnref-${f.num}`;
              const localAnchor = `user-content-fnref-${f.num}`;
              return (
                <li
                  key={f.num}
                  id={`user-content-fn-${f.num}`}
                  style={{
                    color: "var(--color-text)",
                    fontFamily: "Be Vietnam Pro, sans-serif",
                    position: "relative",
                    paddingBottom: "0.5rem",
                    display: "flex",
                    alignItems: "flex-start",
                    paddingLeft: "1.5rem",
                    listStyleType: "none",
                  }}
                >
                  <a
                    href={backHref}
                    id={isSidebarLinked ? localAnchor : undefined}
                    aria-label={`Back to reference ${f.num}`}
                    style={{
                      position: "absolute",
                      left: 0,
                      color: "var(--color-text-hover)",
                      fontWeight: "bold",
                      textDecoration: "none",
                    }}
                    {...(isSidebarLinked ? { "data-sidebar": origin } : {})}
                  >
                    {f.num}
                  </a>
                  <span
                    style={{
                      marginLeft: 8,
                      verticalAlign: "top",
                      paddingTop: 1.5,
                    }}
                  >
                    <ReactMarkdown
                      components={components}
                      remarkPlugins={[
                        remarkGfm,
                        [remarkHighlight, highlight],
                        remarkSidebarRef,
                      ]}
                      rehypePlugins={[rehypeRaw]}
                    >
                      {f.content}
                    </ReactMarkdown>
                  </span>
                </li>
              );
            })}
          </ol>
        )}
      </section>
    );
  }

  // Render markdown, replacing placeholder with custom footnotes section
  function renderWithFootnotes(main) {
    const parts = main.split("[[CUSTOM_FOOTNOTES_SECTION]]");
    if (parts.length === 1) {
      return (
        <ReactMarkdown
          components={components}
          remarkPlugins={[
            remarkGfm,
            [remarkHighlight, highlight],
            remarkSidebarRef,
          ]}
          rehypePlugins={[rehypeRaw]}
        >
          {main}
        </ReactMarkdown>
      );
    }
    return (
      <>
        <ReactMarkdown
          components={components}
          remarkPlugins={[
            remarkGfm,
            [remarkHighlight, highlight],
            remarkSidebarRef,
          ]}
          rehypePlugins={[rehypeRaw]}
        >
          {parts[0]}
        </ReactMarkdown>
        <CustomFootnotesSection />
        <ReactMarkdown
          components={components}
          remarkPlugins={[
            remarkGfm,
            [remarkHighlight, highlight],
            remarkSidebarRef,
          ]}
          rehypePlugins={[rehypeRaw]}
        >
          {parts[1]}
        </ReactMarkdown>
      </>
    );
  }

  return <div>{renderWithFootnotes(processed.main)}</div>;
}

export default MarkdownRenderer;
