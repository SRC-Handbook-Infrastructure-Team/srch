/**
 * SRC Handbook Markdown System
 *
 * This file handles rendering markdown content with special features:
 * - Loading content from hierarchical section/subsection structure in /markdown/
 * - Loading drawer content from drawer folders in each subsection
 * - Rendering special [drawer:text](target) and [nav:text](target) links as buttons
 * - Supporting image references using ![Alt text](/src/assets/imagename.jpg)
 * - Parsing YAML frontmatter for title and order
 * - Generating sidebar navigation from markdown files and headers
 *
 */

import { useMemo } from "react";
import ReactMarkdown from "react-markdown";
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
  Button,
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

function highlightText(text, highlight) {
  if (!highlight) return text;

  const regex = new RegExp(`(${highlight})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, index) =>
    regex.test(part) ? <mark key={index}>{part}</mark> : part
  );
}

// Helper function to create consistent ID from heading text
export function createIdFromHeading(text) {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special chars except spaces and hyphens
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-"); // Replace multiple hyphens with single hyphen
}

// Helper to parse YAML frontmatter from markdown content
export function parseFrontmatter(content) {
  // Checks for --- CONTENT --- at the beginning of MD files, cross compatible w/ Windows chars
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return {
      content,
      frontmatter: {},
    };
  }

  const frontmatterBlock = match[1];
  const cleanContent = content.replace(frontmatterRegex, "");
  const frontmatter = {};

  // Parse the YAML lines
  frontmatterBlock.split("\n").forEach((line) => {
    if (line.trim() === "") return;

    const [key, ...valueParts] = line.split(":");
    const value = valueParts.join(":").trim();

    // Convert to appropriate type
    if (value === "true") frontmatter[key.trim()] = true;
    else if (value === "false") frontmatter[key.trim()] = false;
    else if (!isNaN(Number(value))) frontmatter[key.trim()] = Number(value);
    else frontmatter[key.trim()] = value;
  });

  return {
    content: cleanContent,
    frontmatter,
  };
}

// Import all markdown files at build time
export const allMarkdownFiles = import.meta.glob("../markdown/**/*.md", {
  query: "?raw",
  import: "default",
});

// Get all sections (top-level folders)
export const getSections = async () => {
  try {
    const sections = [];
    const paths = Object.keys(allMarkdownFiles);
    const processedSections = new Set();
    // Find all top-level sections with their markdown files
    for (const path of paths) {
      const segments = path.split("/");

      // Skip the primers directory
      if (segments[2] === "primers") continue;

      // Only process files directly in a section folder (not in subfolders)
      if (segments.length === 4 && segments[3].endsWith(".md")) {
        const sectionId = segments[2];
        const fileName = segments[3];

        // Only include the main section file (same name as folder)
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

    // Sort by order
    return sections.sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error("Error loading sections:", error);
    return [];
  }
};

// Get all subsections for a specific section
export const getSubsections = async (sectionId) => {
  try {
    const subsections = [];
    const paths = Object.keys(allMarkdownFiles);
    const processedSubsections = new Set();

    // Find all subsection markdown files for this section
    for (const path of paths) {
      const segments = path.split("/");

      // Look for files in subfolders of the specified section
      if (
        segments.length === 5 &&
        segments[2] === sectionId &&
        segments[3] !== "drawer" &&
        segments[4].endsWith(".md")
      ) {
        const subsectionId = segments[3];
        const fileName = segments[4];

        // Only include files with the same name as their parent folder
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

    // Sort by order
    return subsections.sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error(`Error loading subsections for ${sectionId}:`, error);
    return [];
  }
};
// Get specific content by section and subsection

export const getContent = async (sectionId, subsectionId) => {
  try {
    // If only section is provided, get section content
    if (sectionId && !subsectionId) {
      const path = `../markdown/${sectionId}/${sectionId}.md`;

      for (const filePath in allMarkdownFiles) {
        // Remove the leading ..
        if (filePath.endsWith(path.slice(2))) {
          const content = await allMarkdownFiles[filePath]();
          const { content: cleanContent, frontmatter } =
            parseFrontmatter(content);
          return {
            content: cleanContent,
            frontmatter,
          };
        }
      }
    }
    // If both section and subsection are provided, get subsection content
    if (sectionId && subsectionId) {
      const path = `../markdown/${sectionId}/${subsectionId}/${subsectionId}.md`;

      for (const filePath in allMarkdownFiles) {
        if (filePath.endsWith(path.slice(2))) {
          const content = await allMarkdownFiles[filePath]();
          const { content: cleanContent, frontmatter } =
            parseFrontmatter(content);

          return {
            content: cleanContent,
            frontmatter,
          };
        }
      }
    }

    return null;
  } catch (error) {
    console.error(
      `Failed to load content: ${sectionId}/${subsectionId}`,
      error
    );
    return null;
  }
};

// Get a specific drawer markdown file
export const getDrawerFile = async (sectionId, subsectionId, fileId) => {
  try {
    // Find the matching drawer file
    const drawerPath = `../markdown/${sectionId}/${subsectionId}/drawer/${fileId}.md`;

    for (const path in allMarkdownFiles) {
      if (path.endsWith(drawerPath.slice(2))) {
        // Remove the leading ..
        const content = await allMarkdownFiles[path]();
        const { content: cleanContent, frontmatter } =
          parseFrontmatter(content);
        return { content: cleanContent, frontmatter };
      }
    }

    return null;
  } catch (error) {
    console.error(
      `Failed to load drawer file: ${sectionId}/${subsectionId}/drawer/${fileId}`,
      error
    );
    return null;
  }
};

// Parse subsections (h2 headings) from markdown content
export const parseSubsections = (content) => {
  if (!content) return [];

  // Handle case where content might be an object with content property
  const contentStr = typeof content === "string" ? content : content.content;

  if (!contentStr) return [];

  // Get rid of Windows return character (\r)
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

// Process markdown content and render it
function MarkdownRenderer({
  content,
  onDrawerOpen,
  onNavigation,
  isFinal,
  highlight,
}) {
  // Process special links in the content
  const processedContent = useMemo(() => {
    if (!content) return "";

    // Replace drawer links with custom elements
    let processed = content.replace(
      /\[drawer:([^\]]+)\]\(([^)]+)\)/g,
      (match, text, target) => {
        return `<drawer-link text="${text}" target="${target}"></drawer-link>`;
      }
    );

    // Replace navigation links with custom elements
    processed = processed.replace(
      /\[nav:([^\]]+)\]\(([^)]+)\)/g,
      (match, text, target) => {
        return `<nav-link text="${text}" target="${target}"></nav-link>`;
      }
    );

    return processed;
  }, [content]);

  // Beta Tag Component
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

  // Define component rendering for Markdown elements
  const components = useMemo(
    () => ({
      // Headings
      h1: (props) => (
        <Heading as="h1" size="xl" mt={5} mb={3} {...props}>
          {props.children}
          {isFinal === false && <BetaTag />}
        </Heading>
      ),
      h2: ({ children, ...props }) => {
        // Create an ID from the heading for anchor links - use the same ID generation
        // as in parseSubsections to ensure they match exactly
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
            scrollMarginTop="20px" // Adds margin at top when scrolled to
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
      h3: (props) => (
        <Heading as="h3" size="sm" mt={3} mb={2} lineHeight="1.3" {...props} />
      ),
      h4: (props) => (
        <Heading as="h4" size="sm" mt={2} mb={1} lineHeight="1.3" {...props} />
      ),

      // Text elements
      p: ({ children, ...props }) => {
        const childrenArray = Array.isArray(children) ? children : [children];
        return (
          <Text mb={3} lineHeight="1.6" {...props}>
            {childrenArray.map((child) =>
              typeof child === "string"
                ? highlightText(child, highlight)
                : child
            )}
          </Text>
        );
      },
      a: (props) => {
        const isExternal =
          props.href.startsWith("http://") || props.href.startsWith("https://");
        return (
          <Link
            color="blue.400"
            href={props.href}
            isExternal={isExternal}
            target={isExternal ? "_blank" : undefined}
            {...props}
          >
            {props.children}
            {isExternal && (
              <Icon as={ExternalLinkIcon} ml={1} boxSize="0.8em" />
            )}
          </Link>
        );
      },

      // Lists
      ul: (props) => <UnorderedList pl={4} mb={3} {...props} />,
      ol: (props) => <OrderedList pl={4} mb={3} {...props} />,
      li: (props) => <ListItem {...props} />,

      // Code
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
      thead: (props) => <Thead {...props} />,
      tbody: (props) => <Tbody {...props} />,
      tr: (props) => <Tr {...props} />,
      th: (props) => (
        <Th border="1px solid" borderColor="gray.300" {...props} />
      ),
      td: (props) => (
        <Td border="1px solid" borderColor="gray.300" {...props} />
      ),

      // Images
      img: (props) => {
        return (
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
        );
      },

      // Custom components for interactive elements
      "drawer-link": ({ node }) => {
        const text = node.properties?.text;
        const target = node.properties?.target;
        return (
          <HStack
            as="span"
            spacing={1}
            display="inline-flex"
            alignItems="center"
            _hover={{ color: "purple.500", cursor: "pointer" }}
            onClick={() => onDrawerOpen && onDrawerOpen(target)}
            color="blue.400"
          >
            <Link _hover={{ textDecoration: "underline" }}>{text}</Link>
            <Icon
              as={InfoIcon}
              boxSize="0.8em"
              style={{ fill: "currentColor" }}
            />
          </HStack>
        );
      },
      "nav-link": ({ node }) => {
        const text = node.properties?.text;
        const target = node.properties?.target;
        return (
          <HStack
            as="span"
            spacing={1}
            display="inline-flex"
            alignItems="center"
            _hover={{ color: "purple.500", cursor: "pointer" }}
            onClick={() => onNavigation && onNavigation(target)}
            color="blue.400"
          >
            <Link _hover={{ textDecoration: "underline" }}>{text}</Link>
            <Icon
              as={BsFileEarmarkText}
              boxSize="0.8em"
              style={{ fill: "currentColor" }}
            />
          </HStack>
        );
      },
    }),
    [onDrawerOpen, onNavigation, isFinal]
  );

  // Return ReactMarkdown component as specified.
  // rehypeRaw helps handle HTML parsing
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

export default MarkdownRenderer;
