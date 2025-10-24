/**
 * MarkdownRenderer.jsx
 *
 * Renders Markdown content with Chakra UI components.
 * Handles headings, paragraphs, links, lists, tables, and embedded drawers.
 * Includes support for highlighting search terms.
 */

import { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import { Link as RouterLink } from "react-router-dom";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
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

function highlightText(text, highlight) {
  if (!highlight) return text;
  const regex = new RegExp(`(${highlight})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, index) =>
    regex.test(part) ? <mark key={index}>{part}</mark> : part
  );
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

        if (fileName === `${sectionId}.md` && !processedSections.has(sectionId)) {
          processedSections.add(sectionId);
          const content = await allMarkdownFiles[path]();
          const { content: cleanContent, frontmatter } = parseFrontmatter(content);

          sections.push({
            id: sectionId,
            title: frontmatter.title || cleanContent.split("\n")[0].replace("# ", ""),
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

        if (fileName === `${subsectionId}.md` && !processedSubsections.has(subsectionId)) {
          processedSubsections.add(subsectionId);
          const content = await allMarkdownFiles[path]();
          const { content: cleanContent, frontmatter } = parseFrontmatter(content);

          subsections.push({
            id: subsectionId,
            title: frontmatter.title || cleanContent.split("\n")[0].replace("# ", ""),
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

    for (const filePath in allMarkdownFiles) {
      if (filePath.endsWith(path.slice(2))) {
        const content = await allMarkdownFiles[filePath]();
        const { content: cleanContent, frontmatter } = parseFrontmatter(content);

        const [mainRaw, sidebarRaw] = cleanContent.split("## Sidebar");
        const mainContent = mainRaw?.trim() || "";

        const sidebar = {};
        if (sidebarRaw) {
          const lines = sidebarRaw.trim().split("\n");
          let currentKey = null;
          let currentHeading = null;
          let currentValue = [];

          lines.forEach((line) => {
            const match = line.match(/^([A-Za-z0-9-_]+):\s*$/);
            if (match) {
              if (currentKey) {
                sidebar[currentKey] = {
                  heading: currentHeading || currentKey.replace(/-/g, " "),
                  content: currentValue.join("\n").trim(),
                };
              }
              currentKey = match[1].trim();
              currentHeading = null;
              currentValue = [];
            } else if (line.startsWith("Heading:")) {
              currentHeading = line.replace("Heading:", "").trim();
            } else if (currentKey) {
              currentValue.push(line);
            }
          });

          if (currentKey) {
            sidebar[currentKey] = {
              heading: currentHeading || currentKey.replace(/-/g, " "),
              content: currentValue.join("\n").trim(),
            };
          }
        }

        const parsedContent = mainContent.replace(/\{([^}]+)\}/g, (_, term) => {
          return `<sidebar-ref term="${term}"></sidebar-ref>`;
        });

        return { content: parsedContent, sidebar, frontmatter };
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
}) {
  const processedContent = useMemo(() => {
    if (!content) return "";
    let processed =
      typeof content === "string" ? content : content.content || "";
    if (typeof processed === "string") {
      processed = processed.replace(/\{([^}]+)\}/g, (match, term) => {
        return `<sidebar-ref term="${term}"></sidebar-ref>`;
      });
    }
    return processed;
  }, [content]);

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
            {childrenArray.map((child) =>
              typeof child === "string"
                ? highlightText(child, highlight)
                : child
            )}
          </Heading>
        );
      },
      p: ({ children, ...props }) => (
        <Text mb={3} lineHeight="1.6" {...props}>
          {Array.isArray(children)
            ? children.map((child) =>
                typeof child === "string"
                  ? highlightText(child, highlight)
                  : child
              )
            : children}
        </Text>
      ),
      a: (props) => {
        const isExternal =
          props.href.startsWith("http://") || props.href.startsWith("https://");
        const childrenArray = Array.isArray(props.children)
          ? props.children
          : [props.children];
        return (
          <Link
            color="#9D0013"
            fontWeight="500"
            textDecoration="none"
            _hover={{
              textDecoration: "underline",
              color: "#7A0010",
            }}
            href={props.href}
            isExternal={isExternal}
            target={isExternal ? "_blank" : undefined}
            {...props}
          >
            {childrenArray.map((child) =>
              typeof child === "string"
                ? highlightText(child, highlight)
                : child
            )}
            {isExternal && <Icon as={ExternalLinkIcon} ml={1} boxSize="0.8em" />}
          </Link>
        );
      },
      li: (props) => {
        const childrenArray = Array.isArray(props.children)
          ? props.children
          : [props.children];
        return (
          <ListItem {...props}>
            {childrenArray.map((child) =>
              typeof child === "string"
                ? highlightText(child, highlight)
                : child
            )}
          </ListItem>
        );
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
      th: (props) => <Th border="1px solid" borderColor="gray.300" {...props} />,
      td: (props) => <Td border="1px solid" borderColor="gray.300" {...props} />,
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
      "sidebar-ref": ({ node }) => {
        const term = node.properties?.["term"];
        const value = sidebar?.[term];
        return (
          <Box
            as={RouterLink}
            to={`/${sectionId}/${subsectionId}/${term}`}
            onClick={(e) => {
              e.preventDefault();
              onDrawerOpen(term);
            }}
            display="inline-flex"
            alignItems="center"
            px="0.3em"
            py="0.15em"
            mx="0.1em"
            borderRadius="md"
            bg="#7b4b24"
            color="white"
            _hover={{
              bg: "#633c1d",
              color: "white",
              textDecoration: "none",
            }}
            cursor="pointer"
            whiteSpace="nowrap"
            transition="background-color 0.2s ease"
          >
            <Text as="span" fontWeight="medium" fontSize="inherit" lineHeight="1.4">
              {value
                ? term
                    .replace(/-/g, " ")
                    .replace(/Case Study(?!:)/g, "Case Study:")
                : `Missing: ${term}`}
            </Text>
            <Icon as={InfoIcon} boxSize="0.8em" ml={1} />
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
            _hover={{ color: "purple.500", textDecoration: "underline" }}
          >
            <Link>{text}</Link>
            <Icon as={BsFileEarmarkText} boxSize="0.8em" />
          </HStack>
        );
      },
    }),
    [onDrawerOpen, onNavigation, isFinal, sectionId, subsectionId, sidebar, highlight]
  );

  return (
    <div>
      <ReactMarkdown
        components={components}
        rehypePlugins={[rehypeRaw]}
        remarkPlugins={[remarkGfm]}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  );
}

/**
 * Loads a Markdown file from the "drawer" subfolder.
 * Used for right-hand side drawer panels.
 *
 * @param {string} sectionId - The section slug (e.g. "privacy")
 * @param {string} subsectionId - The subsection slug (e.g. "what-is-privacy")
 * @param {string} term - The sidebar reference key (e.g. "case-study-1")
 * @returns {Promise<{content: string, frontmatter: object} | null>}
 */
export const getDrawerFile = async (sectionId, subsectionId, term) => {
  try {
    const expectedPath = `../markdown/${sectionId}/${subsectionId}/drawer/${term}.md`;

    for (const filePath in allMarkdownFiles) {
      if (filePath.endsWith(expectedPath.slice(2))) {
        const content = await allMarkdownFiles[filePath]();
        const { content: cleanContent, frontmatter } = parseFrontmatter(content);
        return { content: cleanContent, frontmatter };
      }
    }

    console.warn(`Drawer file not found for ${sectionId}/${subsectionId}/${term}`);
    return null;
  } catch (error) {
    console.error("Error loading drawer file:", sectionId, subsectionId, term, error);
    return null;
  }
};

export default MarkdownRenderer;
