/**
 * MarkdownRenderer.jsx
 *
 * Renders Markdown content with Chakra UI components.
 * Handles headings, paragraphs, links, lists, tables, and embedded drawers.
 * Includes support for highlighting search terms.
 */

import React from "react";
import { useMemo, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link as RouterLink } from "react-router-dom";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { remarkSidebarRef } from "./remarkSidebarRef";
import { remarkHighlight } from "./remarkHighlight";
import {
  Text,
  Heading,
  Link,
  UnorderedList,
  OrderedList,
  ListItem,
  Box,
  Code,
  Image,
  Table,
  Th,
  Thead,
  Tr,
  Tbody,
  Td,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { InfoIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { BsFileEarmarkText } from "react-icons/bs";

/* ----------------------------- Highlight Utility ----------------------------- */

export function highlightText(node, highlight) {
  if (!highlight || (!node && node !== 0)) return node;
  if (typeof node === "string") {
    const regex = new RegExp(`(${highlight})`, "gi");
    const parts = node.split(regex);
    return parts.map((part, idx) =>
      regex.test(part) ? <mark key={idx}>{part}</mark> : part
    );
  }
  if (Array.isArray(node)) {
    return node.map((child) => highlightText(child, highlight));
  }
  if (React.isValidElement(node)) {
    return React.cloneElement(
      node,
      node.props,
      highlightText(node.props.children, highlight)
    );
  }
  return node;
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
            dividerMatch.index + dividerMatch[0].length
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
}) {
  const processedContent = useMemo(() => {
    if (!content) return "";
    let processed =
      typeof content === "string" ? content : content.content || "";
    if (typeof processed === "string") {
      processed = processed.replace(/\{([^}]+)\}/g, (match, term) => {        return `<sidebar-ref term="${term}"></sidebar-ref>`;
      });
      
    }
    return processed;
  }, [content]);

  /* ------------------------------------------------------------------------
   * Styling tokens used inside the components map
   * --------------------------------------------------------------------- */
  const RED = "#9D0013";
  const RED_DARK = "#7a000f"; // hover shade (kept for compatibility; not used on chips)
  const BLACK = "#000000";

  /* ------------------------------------------------------------------------
   * Active drawer link state handling (no external integration required)
   *
   *  - We add 'srch-drawer-link-active' to the clicked <sidebar-ref>.
   *  - A MutationObserver watches '.right-sidebar' for '.open'.
   *    When it closes, we remove the active class from all sidebar-ref pills.
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
      // Safety cleanup on unmount
      document
        .querySelectorAll(".srch-drawer-link-active")
        .forEach((el) => el.classList.remove("srch-drawer-link-active"));
      setActiveDrawerLinkState(null);
    };
  }, []);




  const setActiveDrawerLink = (el) => {
    try {
      document
        .querySelectorAll(".srch-drawer-link-active")
        .forEach((n) => n.classList.remove("srch-drawer-link-active"));
      if (el) {
        el.classList.add("srch-drawer-link-active");
        const term = el.dataset?.term || el.getAttribute?.("data-term") || null;
        setActiveDrawerLinkState(term);
      } else {
        setActiveDrawerLinkState(null);
      }
    } catch (e) {
      /* no-op */
    }
  };

  // Smooth, one-time focus for drawer chip when opening/closing
function focusDrawerChip(term) {
  if (!term) return;

  window.requestAnimationFrame(() => {
    const el = document.querySelector(
      `.srch-drawer-link[data-term="${term}"]`
    );
    if (!el) return;

    // Find nearest scroll container
    let container = el.parentElement;
    while (container && container !== document.body) {
      const style = window.getComputedStyle(container);
      if (style.overflowY === "auto" || style.overflowY === "scroll") break;
      container = container.parentElement;
    }

    // Default to window scroll
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

    if (!isAbove && !isBelow) return; // already visible → no movement

    const delta = isAbove
      ? eRect.top - cRect.top - margin
      : eRect.bottom - cRect.bottom + margin;

    container.scrollTo({
      top: container.scrollTop + delta,
      behavior: "smooth",
    });
  });
}

  // After drawer link becomes active, wait for the drawer animation
  // to finish and then gently scroll it into view.
  useEffect(() => {
    if (!activeDrawerLink) return;

    const drawer = document.querySelector(".right-sidebar");
    if (!drawer) return;

    // Match the CSS transition on .right-sidebar (0.35s)
    const timeout = setTimeout(() => {
      focusDrawerChip(activeDrawerLink);
    }, 350);

    return () => clearTimeout(timeout);
  }, [activeDrawerLink]);



  const BetaTag = () => (
    <Box
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      bg="blue.100"
      color="blue.700"
      fontWeight="bold"
      fontSize="xs"
      px={2}
      py={0.5}
      borderRadius="md"
      ml={2}
      verticalAlign="middle"
    >
      BETA
    </Box>
  );

  /**
   * Safely removes ONLY whitespace-only text nodes inside <p> tags.
   * This avoids ReactMarkdown inserting empty "" or " " nodes
   * that create visual gaps between text + <sidebar-ref> chips.
   *
   * Critically:
   * - Does NOT remove spaces inside real text ("a dog" stays intact)
   * - Only affects direct children of <p>
   */
  function cleanParagraphChildren(children) {
    return React.Children.toArray(children).filter((child) => {
      if (typeof child === "string") {
        return child.trim() !== ""; // keep text that has ANY non-space chars
      }
      return child; // keep React elements unchanged
    });
  }

  function tightenAroundSidebarRefs(children) {
  const arr = React.Children.toArray(children);
  for (let i = 0; i < arr.length; i++) {
    const cur = arr[i];
    const isChip =
      React.isValidElement(cur) &&
      (cur.type === 'sidebar-ref' || cur.props?.className?.includes('srch-drawer-link'));
    if (!isChip) continue;

    const prev = arr[i - 1];
    const next = arr[i + 1];
    if (typeof prev === 'string') arr[i - 1] = prev.replace(/\s+$/, ''); // trim end
    if (typeof next === 'string') arr[i + 1] = next.replace(/^\s+/, ''); // trim start
  }
  return arr;
}


  const components = useMemo(
    () => ({
      h1: (props) => (
        <Heading as="h1" size="xl" mt={10} mb={3} {...props}>
          {Array.isArray(props.children)
            ? props.children.map((child) =>
                typeof child === "string"
                  ? highlightText(child, highlight)
                  : child
              )
            : props.children}
          {isFinal === false && <BetaTag />}
        </Heading>
      ),
      h2: ({ children, ...props }) => {
        const id = createIdFromHeading(children);
        const childrenArray = Array.isArray(children) ? children : [children];
        return (
          <Heading
            as="h2"
            id={id}
            size="md"
            mt={4}
            mb={2}
            lineHeight="1.3"
            scrollMarginTop="20px"
            color="var(--color-accent)"
            {...props}
          >
            {highlightText(childrenArray, highlight)}
          </Heading>
        );
      },
      p: ({children}) => {
        return (
          <Text mb={3} lineHeight="1.6" color={BLACK}>
            {highlightText(children, highlight)}
          </Text>
        );
      },

      /* ------------------------------------------------------------------
       * Standard Markdown links (NOT sidebar-ref chips)
       * ---------------------------------------------------------------- */
      a: (props) => {
        if ("data-footnote-backref" in props) return null;

        const isFootnoteRef = "data-footnote-ref" in props;
        const isExternal =
          props.href.startsWith("http://") || props.href.startsWith("https://");
        const childrenArray = Array.isArray(props.children)
          ? props.children
          : [props.children];

        return (
          <Link
            color={RED}
            fontWeight="500"
            textDecoration={isFootnoteRef ? "none" : "underline"}
            _hover={{
              color: RED_DARK,
              textDecoration: isFootnoteRef ? "none" : "underline",
            }}
            href={props.href}
            isExternal={isExternal}
            target={isExternal ? "_blank" : undefined}
            {...props}
          >
            {childrenArray.map((child, index) =>
              typeof child === "string" ? (
                highlightText(child, highlight)
              ) : (
                <span key={index}>{child}</span>
              )
            )}
            {isExternal && (
              <Icon as={ExternalLinkIcon} ml={1} boxSize="0.8em" />
            )}
          </Link>
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

        return (
          <ListItem
            color={BLACK}
            id={id}
            {...rest}
            style={{
              listStyle: "none",
              paddingLeft: "1.5em",
              position: "relative",
            }}
          >
            {number && (
              <Link
                href={`#user-content-fnref-${number}`}
                as="a"
                position="absolute"
                left={0}
                top="50%"
                transform="translateY(-50%)"
                color={RED}
                fontWeight="bold"
                textDecoration="none"
                aria-label={`Back to reference ${number}`}
              >
                {number}.
              </Link>
            )}
            {highlightText(childrenArray, highlight)}
          </ListItem>
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
              <Link
                as="a"
                href={`#user-content-fnref-${number}`}
                color="#9D0013"
                fontWeight="bold"
                textDecoration="none"
                aria-label={`Back to reference ${number}`}
              >
                {number}
              </Link>
            </sup>
          );
        }

        return <sup {...props}>{props.children}</sup>;
      },

      ul: (props) => <UnorderedList pl={4} mb={3} {...props} />,
      ol: (props) => <OrderedList pl={4} mb={3} {...props} />,
      code: ({ inline, ...props }) =>
        inline ? (
          <Code {...props} />
        ) : (
          <Box
            as="pre"
            p={2}
            bg="gray.100"
            borderRadius="md"
            overflowX="auto"
            {...props}
          />
        ),
      table: (props) => (
        <Box overflowX="auto" my={4}>
          <Table variant="simple" {...props}>
            {props.children}
          </Table>
        </Box>
      ),
      th: (props) => (
        <Th border="1px solid" borderColor="gray.300" {...props} />
      ),
      td: (props) => (
        <Td border="1px solid" borderColor="gray.300" {...props} />
      ),
      img: (props) => (
        <Image
          src={props.src}
          alt={props.alt || ""}
          maxW="80%"
          maxH="500px"
          objectFit="contain"
          borderRadius="md"
          mx="auto"
          my={6}
          display="block"
        />
      ),

      /**
       * sidebar-ref chip (inserted by {term} syntax in Markdown)
       * Visual spec:
       * - Base: red text (#9D0013), NO underline, transparent bg
       * - Hover: red 1px border appears + scale up slightly; color stays #9D0013
       * - Active: white text on filled red pill, red border; Info icon inherits white
       * - Shape: radius 17px, height 32px, variable width
       */
      "sidebar-ref": ({ node }) => {
        let raw = node.properties?.["term"] || "";
        let term = raw;
        let label = null;

        //  Support alias syntax {term|Custom Label}
        if (raw.includes("|")) {
          const [keyPart, labelPart] = raw.split("|");
          term = keyPart.trim();
          label = labelPart.trim();
        }

        const termKey = term.toLowerCase();
        const value = sidebar?.[termKey];

        const toShow = value
          ? label ||
            term.replace(/-/g, " ").replace(/Case Study(?!:)/g, "Case Study:")
          : `⚠️ Missing: ${term}`;


        return (
          <Box
            as={RouterLink}
            to={`/${sectionId}/${subsectionId}/${term}`}
            onClick={(e) => {
              e.preventDefault();
              if (activeDrawerLink === term) {
                setActiveDrawerLink(null);
                onDrawerOpen && onDrawerOpen(null);
                return;
              }

              if (value) {
                setActiveDrawerLink(e.currentTarget);
                onDrawerOpen && onDrawerOpen(term);
              }
            }}
            className={`srch-drawer-link ${
              activeDrawerLink === term ? "srch-drawer-link-active" : ""
            }`}
            data-term={term}
            display="inline-flex"
            verticalAlign="baseline"
            alignItems="center"
                      
            gap="6px"
            px="10px"
            py="4px"
            mx="0"
            my="2px"
            
            borderRadius="999px"
            color={RED}
            textDecoration="none"
            border="1px solid transparent"
            whiteSpace="normal"
            flexShrink={1}
            maxW="100%"               // don’t exceed container
            minW={0}                  // allow shrink in tight columns
          >
            <Text
              as="span"
              fontWeight="700"
              fontSize="inherit"
              lineHeight="inherit"
              sx={{ overflowWrap: "anywhere", wordBreak: "break-word", minWidth: 0}}
            >
              {highlightText(toShow, highlight)}
            </Text>
            <Icon as={InfoIcon} boxSize="0.9em" flexShrink={0} />
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
    ]
  );

  // Add near the top of your component (inside the component)
return (
  <ReactMarkdown
    components={components}
    remarkPlugins={[remarkGfm, [remarkHighlight, highlight], remarkSidebarRef]}
    rehypePlugins={[rehypeRaw]}
  >
    {processedContent}
  </ReactMarkdown>
);


}export default MarkdownRenderer;