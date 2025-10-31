// ...existing code...
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Text,
  VStack,
  Icon,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  useMediaQuery,
  Button,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { GiHamburgerMenu } from "react-icons/gi";
import { getSections, getSubsections, getContent } from "../util/MarkdownRenderer";
import { useLayout } from "../layouts/LayoutContext";
import "../index.css";
/* ----------------------------- File Overview --------------------------------
ContentsSidebar
- Renders the left-hand "Contents" navigation.
- Numbers top-level sections per SECTION_NUMBER_MAP (fallback to frontmatter order or index).
- Shows subsections with lettered labels (a, b, c, ...).
- Optionally shows third-level headings (i, ii, iii) under subsections — lazily loaded.
- Persists expand state and merges initial "open current section" without overwriting user toggles.
----------------------------------------------------------------------------*/

/* ----------------------------- Helpers ------------------------------------ */
// Fixed mapping for top-level section numbers (customize as needed)
const SECTION_NUMBER_MAP = {
  privacy: 1,
  accessibility: 2,
  "automated-decision-making": 3,
  "generative-ai": 4,
};

// convert 0 -> 'a', 1 -> 'b', ... 25 -> 'z', 26 -> 'aa'
function indexToLetter(index) {
  let s = "";
  let i = index;
  do {
    s = String.fromCharCode(97 + (i % 26)) + s;
    i = Math.floor(i / 26) - 1;
  } while (i >= 0);
  return s;
}

// convert 0 -> 'i', 1 -> 'ii', 2 -> 'iii', ...
function indexToRoman(index) {
  const n = index + 1;
  const romans = [
    ["M", 1000],
    ["CM", 900],
    ["D", 500],
    ["CD", 400],
    ["C", 100],
    ["XC", 90],
    ["L", 50],
    ["XL", 40],
    ["X", 10],
    ["IX", 9],
    ["V", 5],
    ["IV", 4],
    ["I", 1],
  ];
  let num = n;
  let res = "";
  for (const [r, val] of romans) {
    while (num >= val) {
      res += r;
      num -= val;
    }
  }
  return res.toLowerCase();
}

// simple slugify for headings -> id (fallback if MarkdownRenderer doesn't provide IDs)
function slugify(text = "") {
  return text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// parse markdown content for headings; returns level-3+ headings (### and deeper)
function parseSubsections(content) {
  const headings = [];
  if (!content) return headings;
  const re = /^(#{3,6})\s+(.*)$/gm; // only capture h3+ here for third-level items
  let match;
  while ((match = re.exec(content)) !== null) {
    const level = match[1].length; // 3 => h3, etc.
    const text = match[2].trim();
    if (text) {
      headings.push({
        id: slugify(text),
        text,
        level,
      });
    }
  }
  return headings;
}

/* ----------------------------- UI Helpers --------------------------------- */
const BetaTag = () => (
  <Box className="beta-tag"
  >
    BETA
  </Box>
);

/* -------------------------------------------------------------------------- */
export default function ContentsSidebar({ className = "" }) {
  /**
   * Layout / sidebar hooks
   */
  const { leftSidebar } = useLayout() || {};
  const {
    width: leftWidth = 250,
    collapsed = false,
    startResize = () => {},
    handleKeyDown = () => {},
    isResizing = false,
  } = leftSidebar || {};

  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const pathParts = currentPath.split("/").filter(Boolean);
  const currentSectionId = pathParts[0] || "";
  const currentSubsectionId = pathParts[1] || "";
  // hash for third-level anchors

  /**
   * Local nav state
   */
  const [sections, setSections] = useState([]);
  // subsections shape: { [sectionId]: [{ id, title, order, headings: null|[] }] }
  const [subsections, setSubsections] = useState({});
  const [expandedSections, setExpandedSections] = useState({});
  const [hasFetchedData, setHasFetchedData] = useState(false);

  /**
   * Load all sections and subsections metadata (minimal), sanitize results,
   * and merge expand state so we don't overwrite user interactions on navigation.
   */
  useEffect(() => {
    let active = true;
    async function loadAllData() {
      try {
        const sectionsData = await getSections();
        const sortedSections = Array.isArray(sectionsData)
          ? [...sectionsData].sort((a, b) => (a.order || 999) - (b.order || 999))
          : [];
        if (!active) return;
        setSections(sortedSections);

        const subsectionsMap = {};
        const expandStateMap = {};

        for (const section of sortedSections) {
          const rawSubsections = await getSubsections(section.id);
          if (!active) return;

          if (rawSubsections && rawSubsections.length > 0) {
            // sanitize the list:
            // - remove falsy entries
            // - require an id string
            // - ignore internal dirs like "drawer" or dotfiles
            // - provide title fallback, set headings:null for lazy-load
            const sanitized = rawSubsections
              .filter((s) => s && typeof s.id === "string" && s.id.trim().length > 0)
              .filter((s) => {
                const id = (s.id || "").toLowerCase();
                return !id.startsWith(".") && id !== "drawer" && id !== "_drawer";
              })
              .map((s) => ({
                ...s,
                title:
                  (s.title && String(s.title).trim()) ||
                  String(s.id || "")
                    .replace(/[-_]/g, " ")
                    .replace(/\b\w/g, (m) => m.toUpperCase()),
                headings: null,
                order: typeof s.order === "number" ? s.order : 999,
              }))
              .sort((a, b) => (a.order || 999) - (b.order || 999));

            if (sanitized.length > 0) {
              subsectionsMap[section.id] = sanitized;
              if (section.id === currentSectionId) expandStateMap[section.id] = true;
            }
          }
        }

        if (!active) return;
        setSubsections(subsectionsMap);

        // Merge expand state so we don't clobber user toggles on navigation
        setExpandedSections((prev) => ({ ...prev, ...expandStateMap }));

        // navigate to first section if none selected (only on first load)
        if (!currentSectionId && sortedSections.length > 0 && !hasFetchedData) {
          navigate(`/${sortedSections[0].id}`, { replace: true });
        }
        if (!active) return;
        setHasFetchedData(true);
      } catch (err) {
        console.error("Error loading table of contents:", err);
      }
    }

    loadAllData();
    return () => {
      active = false;
    };
    // intentionally depend on currentSectionId/currentSubsectionId so that the current section opens
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSectionId, currentSubsectionId, navigate]);

  /**
   * If a section is selected but no subsection provided, redirect to first subsection.
   * This mirrors previous UX.
   */
  useEffect(() => {
    if (currentSectionId && !currentSubsectionId) {
      const sectionSubsections = subsections[currentSectionId];
      if (sectionSubsections && sectionSubsections.length > 0) {
        navigate(`/${currentSectionId}/${sectionSubsections[0].id}`, { replace: true });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSectionId, currentSubsectionId, subsections, navigate]);

  /**
   * Lazy load headings (third-level) for all subsections of a section when it is expanded.
   */
  const fetchHeadingsForSection = async (sectionId) => {
    const sectionSubsections = subsections[sectionId];
    if (!sectionSubsections) return;

    const needFetch = sectionSubsections.some((s) => s.headings === null);
    if (!needFetch) return;

    try {
      const updated = await Promise.all(
        sectionSubsections.map(async (sub) => {
          if (sub.headings !== null) return sub;
          const result = await getContent(sectionId, sub.id);
          const content = result?.content || "";
          const headings = parseSubsections(content);
          return { ...sub, headings };
        })
      );
      setSubsections((prev) => ({ ...prev, [sectionId]: updated }));
    } catch (err) {
      console.error("Error fetching subsection headings:", err);
    }
  };

  /**
   * Toggle a section open/closed. When expanding, trigger lazy fetch of headings.
   */
  const toggleSection = (sectionId, event) => {
    // allow icon clicks only to act as toggles (preserve navigation for main click)
    if (event && (event.target.tagName === "svg" || event.target.closest("svg"))) {
      event.preventDefault();
      setExpandedSections((prev) => {
        const willExpand = !prev[sectionId];
        const next = { ...prev, [sectionId]: willExpand };
        if (willExpand) {
          // fire and forget lazy load
          fetchHeadingsForSection(sectionId);
        }
        return next;
      });
    }
  };

  /**
   * UI for the nav content
   */
  const NavContent = () => (
    <VStack align="stretch" spacing={2}>
      {sections.map((section, idx) => {
        const sectionSubs = subsections[section.id] || [];
        const hasSubsections = sectionSubs.length > 0;
        const isExpanded = !!expandedSections[section.id];
        const isActiveSection = currentSectionId === section.id;

        // determine display number: priority -> fixed map -> frontmatter order -> index fallback
        const displayNumber =
          SECTION_NUMBER_MAP[section.id] ??
          (typeof section.order === "number" ? section.order + 1 : idx + 1);

        return (
          <Box key={section.id} mb={2}>
            <Box
              p={2}
              cursor="pointer"
              onClick={(e) => {
                if (hasSubsections) {
                  navigate(`/${section.id}/${sectionSubs[0].id}`);
                } else {
                  navigate(`/${section.id}`);
                }
                toggleSection(section.id, e);
              }}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box display="flex" alignItems="center">
                <Text fontWeight="600" color="#1a1a1a" fontSize="md">
                  {displayNumber}. {section.title}
                </Text>
                {section.final === false && <BetaTag />}
              </Box>

              {hasSubsections && (
                <Icon
                  as={ChevronDownIcon}
                  transform={isExpanded ? "rotate(180deg)" : undefined}
                  transition="transform 0.2s"
                  w={5}
                  h={5}
                  color={isActiveSection ? "#531C00" : "inherit"}
                />
              )}
            </Box>

            {/* Subsections (letters) */}
            {isExpanded && hasSubsections && (
              <VStack align="stretch" pl={6} mt={1} spacing={0}>
                {sectionSubs.map((sub, subIdx) => {
                  const isSubActive = isActiveSection && currentSubsectionId === sub.id;
                  const subLetter = indexToLetter(subIdx);
                  const subDisplay = `${displayNumber}.${subLetter}`;

                  return (
                    <Box key={sub.id} mb={1}>
                      <Link to={`/${section.id}/${sub.id}`}>
                        <Box
                          px={2}
                          py={1}
                          borderRadius="md"
                          bg={isSubActive ? "#531C00" : "transparent"}
                          transition="background-color 0.2s ease"
                          _hover={{
                            bg: isSubActive ? "#531C00" : "rgba(83,28,0,0.06)",
                          }}
                        >
                          <Text
                            fontSize="sm"
                            fontWeight={isSubActive ? "600" : "400"}
                            color={isSubActive ? "white" : "#1a1a1a"}
                          >
                            {subDisplay} - {sub.title}
                          </Text>
                        </Box>
                      </Link>

                      {/* Third-level headings (i, ii, iii) */}
                      {sub.headings && sub.headings.length > 0 && (
                        <VStack align="stretch" pl={6} mt={1} spacing={0}>
                          {sub.headings.map((h, hIdx) => {
                            const roman = indexToRoman(hIdx);
                            const thirdDisplay = `${subDisplay}.${roman}`;
                            const anchor = h.id || slugify(h.text);
                            return (
                              <Box key={anchor} mb={0}>
                                <Link to={`/${section.id}/${sub.id}#${anchor}`}>
                                  <Box
                                    px={2}
                                    py={0.5}
                                    borderRadius="md"
                                    _hover={{ bg: "rgba(0,0,0,0.04)" }}
                                  >
                                    <Text fontSize="xs" color="#333">
                                      {thirdDisplay} - {h.text}
                                    </Text>
                                  </Box>
                                </Link>
                              </Box>
                            );
                          })}
                        </VStack>
                      )}
                    </Box>
                  );
                })}
              </VStack>
            )}
          </Box>
        );
      })}
    </VStack>
  );

  // Mobile Drawer: show same content in drawer
  if (isMobile) {
    return (
      <>
        <Button variant="ghost" leftIcon={<GiHamburgerMenu size="20px" />} onClick={onOpen}>
          Contents
        </Button>
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerBody>
              <NavContent />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    );
  }

  // Desktop sidebar
  const visualWidth = collapsed ? 0 : leftWidth;

  return (
    <Box
      as="aside"
      className={`left-sidebar ${className}`.trim()}
      position="fixed"
      left={0}
      top={0}
      height="100vh"
      borderRight="1px solid #eee"
      bg="#fff"
      overflowY="auto"
      overflowX="hidden"
      p={4}
      zIndex={10}
      aria-label="Primary navigation"
      aria-expanded={!collapsed}
      style={{ width: visualWidth }}
    >
      <NavContent />

      {/* Left resizer */}
      <Box
        className={`left-resizer ${isResizing ? "is-resizing" : ""}`}
        width={collapsed ? "60px" : "6px"}
        onMouseDown={startResize}
        onTouchStart={startResize}
        onKeyDown={handleKeyDown}
        role="separator"
        tabIndex={0}
        aria-orientation="vertical"
        aria-label="Resize navigation pane"
        aria-hidden={collapsed}
      />
    </Box>
  );
}
// ...existing code...