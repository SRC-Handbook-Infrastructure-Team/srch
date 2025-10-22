// ContentsSidebar.jsx
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Text,
  VStack,
  Divider,
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
import {
  getSections,
  getSubsections,
  getContent,
} from "../util/MarkdownRenderer";
import { initializeIndex, search } from "../util/SearchEngine";

/**
 * BetaTag
 * ---------------------------------------------------------------------------
 * Small in-line label that communicates a feature/page is still in beta.
 * Visual styling is now handled by the `.beta-tag` CSS class.
 */
const BetaTag = () => (
  <Box className="beta-tag" as="span">
    BETA
  </Box>
);

const EXPANDED_KEY = "contentsbar:expanded";

/**
 * NavBar
 * ---------------------------------------------------------------------------
 * The main left-hand navigation component.
 * Accepts an optional `className` prop to allow external containers (like SidebarLayout)
 * to control CSS transitions such as slide-in/out behavior.
 */
function NavBar({ className = "" }) {
  /**
   * Layout & resizing control pulled from LayoutContext.
   * This determines the left nav's width and exposes handlers
   * for mouse/keyboard resizing.
   */
  const [showButton, setShowButton] = useState(false);
  const { leftSidebar } = useLayout() || {};
  const {
    width: leftWidth = 250,
    collapsed = false,
    startResize = () => {},
    handleKeyDown = () => {},
    isResizing = false,
  } = leftSidebar || {};

  /**
   * URL-driven routing info:
   *   /:sectionId/:subsectionId?
   * We use this to highlight the active section/subsection,
   * and to auto-expand the active section in the tree.
   */
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const pathParts = currentPath.split("/").filter(Boolean);
<<<<<<< HEAD:srch-website/src/components/NavBar.jsx
=======

>>>>>>> edb82ea31f0f38696cbf5a37b2187126ec9fcfb7:srch-website/src/components/ContentsSidebar.jsx
  const currentSectionId = pathParts[0] || "";
  const currentSubsectionId = pathParts[1] || "";

<<<<<<< HEAD:srch-website/src/components/NavBar.jsx
  /**
   * Mobile Drawer control (Chakra) + breakpoint detection.
   */
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  /**
   * Data for sections + subsections.
   * expandedSections is a map of sectionId -> boolean (expanded or not).
   */
=======
>>>>>>> edb82ea31f0f38696cbf5a37b2187126ec9fcfb7:srch-website/src/components/ContentsSidebar.jsx
  const [sections, setSections] = useState([]);
  const [subsections, setSubsections] = useState({});
  const [expandedSections, setExpandedSections] = useState({});
  const [hasFetchedData, setHasFetchedData] = useState(false);
  const seededRef = useRef(false); // prevent reseeding after first load

<<<<<<< HEAD:srch-website/src/components/NavBar.jsx
  /**
   * Load all sections and their metadata
   * ---------------------------------------------------------------------------
   * Lifecycle summary:
   *  - Fetches and sorts all sections from Markdown metadata.
   *  - For each section, preloads its subsections (if any) and stores them
   *    in a map keyed by section ID.
   *  - Automatically expands the section that matches the current route.
   *  - If there is no active section (root path), it navigates to the first one.
   *
   * Behavior notes:
   *  - This ensures navigation data is available before the NavBar renders,
   *    keeping the sidebar responsive and synchronized with the URL.
   *  - Sorting by `order` guarantees consistent ordering across sessions.
   *  - `hasFetchedData` prevents redundant navigation when re-rendered.
   */
=======
>>>>>>> edb82ea31f0f38696cbf5a37b2187126ec9fcfb7:srch-website/src/components/ContentsSidebar.jsx
  useEffect(() => {
    async function loadAllData() {
      try {
        const sectionsData = await getSections();
<<<<<<< HEAD:srch-website/src/components/NavBar.jsx

        // Sort sections by their display order
=======
>>>>>>> edb82ea31f0f38696cbf5a37b2187126ec9fcfb7:srch-website/src/components/ContentsSidebar.jsx
        const sortedSections = [...sectionsData].sort(
          (a, b) => a.order - b.order
        );
        setSections(sortedSections);

<<<<<<< HEAD:srch-website/src/components/NavBar.jsx
        // Preload all subsections and track expanded sections
=======
>>>>>>> edb82ea31f0f38696cbf5a37b2187126ec9fcfb7:srch-website/src/components/ContentsSidebar.jsx
        const subsectionsMap = {};
        const expandStateMap = {};

        for (const section of sortedSections) {
          const sectionSubsections = await getSubsections(section.id);

          if (sectionSubsections.length > 0) {
<<<<<<< HEAD:srch-website/src/components/NavBar.jsx
            // Store sorted subsections under their parent section
            subsectionsMap[section.id] = sectionSubsections.sort(
              (a, b) => a.order - b.order
            );

            // Ensure the current section is open initially
=======
            subsectionsMap[section.id] = sectionSubsections.sort(
              (a, b) => a.order - b.order
            );
>>>>>>> edb82ea31f0f38696cbf5a37b2187126ec9fcfb7:srch-website/src/components/ContentsSidebar.jsx
            if (section.id === currentSectionId) {
              expandStateMap[section.id] = true;
            }
          }
        }

        setSubsections(subsectionsMap);

<<<<<<< HEAD:srch-website/src/components/NavBar.jsx
        // Seed expanded state ONCE: merge persisted prefs with "open current section"
        if (!seededRef.current) {
          let persistedIds = [];
          try {
            const raw = localStorage.getItem(EXPANDED_KEY);
            if (raw) persistedIds = JSON.parse(raw);
          } catch {}
          const persistedMap = {};
          for (const id of persistedIds) persistedMap[id] = true;

          // Persisted preferences win; but ensure current section is opened too
          setExpandedSections({ ...expandStateMap, ...persistedMap });
          seededRef.current = true;
        }

        // Navigate to the first section if none is currently active
        if (!currentSectionId && sortedSections.length > 0 && !hasFetchedData) {
          navigate(`/${sortedSections[0].id}`);
=======
        if (!currentSectionId && sortedSections.length > 0 && !hasFetchedData) {
          navigate(`/${sortedSections[0].id}`);
        }

        if (currentSectionId && currentSubsectionId) {
          const result = await getContent(currentSectionId, currentSubsectionId);
          if (result && result.content) {
            const headings = parseSubsections(result.content);
            setContentHeadings({
              [`${currentSectionId}/${currentSubsectionId}`]: headings,
            });
          }
>>>>>>> edb82ea31f0f38696cbf5a37b2187126ec9fcfb7:srch-website/src/components/ContentsSidebar.jsx
        }

        setHasFetchedData(true);
      } catch (error) {
        console.error("Error loading navigation data:", error);
      }
    }

    loadAllData();
  }, [currentSectionId, currentSubsectionId, navigate, hasFetchedData]);

<<<<<<< HEAD:srch-website/src/components/NavBar.jsx
  /**
   * Persist expanded sections whenever they change (after initial seed).
   */
=======
>>>>>>> edb82ea31f0f38696cbf5a37b2187126ec9fcfb7:srch-website/src/components/ContentsSidebar.jsx
  useEffect(() => {
    if (!seededRef.current) return;
    try {
      const ids = Object.entries(expandedSections)
        .filter(([_, v]) => v)
        .map(([k]) => k);
      localStorage.setItem(EXPANDED_KEY, JSON.stringify(ids));
    } catch {}
  }, [expandedSections]);

<<<<<<< HEAD:srch-website/src/components/NavBar.jsx
  /**
   * toggleSection
   * -------------------------------------------------------------------------
   * Expand/collapse a section node. If the click originated on the chevron
   * (an <svg>), prevent navigation and only toggle expansion state.
   */
=======
>>>>>>> edb82ea31f0f38696cbf5a37b2187126ec9fcfb7:srch-website/src/components/ContentsSidebar.jsx
  const toggleSection = (sectionId, event) => {
    if (event.target.tagName === "svg" || event.target.closest("svg")) {
      event.preventDefault();
      setExpandedSections((prev) => ({
        ...prev,
        [sectionId]: !prev[sectionId],
      }));
    }
  };

<<<<<<< HEAD:srch-website/src/components/NavBar.jsx
  /**
   * Expand/Collapse All
   * -------------------------------------------------------------------------
   * expandAll(): set all sections that have subsections to expanded.
   * collapseAll(): set all sections to collapsed.
   * toggleAllSections(): if any collapsed → expand all; else collapse all.
   */
  const expandAll = () => {
    const next = {};
    for (const s of sections) {
      if (subsections[s.id]?.length > 0) next[s.id] = true;
=======
  const scrollToHeading = (headingId, e) => {
    e.preventDefault();
    const element = document.getElementById(headingId);
    if (element) {
      window.history.pushState(
        null,
        "",
        `/srch-s25/${currentSectionId}/${currentSubsectionId}#${headingId}`
      );
      element.scrollIntoView({ behavior: "smooth" });
>>>>>>> edb82ea31f0f38696cbf5a37b2187126ec9fcfb7:srch-website/src/components/ContentsSidebar.jsx
    }
    setExpandedSections(next);
  };

<<<<<<< HEAD:srch-website/src/components/NavBar.jsx
  const collapseAll = () => {
    const next = {};
    for (const s of sections) next[s.id] = false;
    setExpandedSections(next);
  };

  const toggleAllSections = () => {
    // If any section that has children is collapsed, expand all; otherwise collapse all.
    const anyCollapsed = sections.some(
      (s) => (subsections[s.id]?.length > 0) && !expandedSections[s.id]
    );
    if (anyCollapsed) expandAll();
    else collapseAll();
  };

  /**
   * NavContent
   * -------------------------------------------------------------------------
   * Pure markup for the navigation tree. Reused in both desktop sidebar and
   * mobile drawer. We apply CSS classes for static styling; dynamic states
   * like "active" remain as Chakra props or conditional class toggles.
   */
  const NavContent = () => (
    <VStack align="stretch" spacing={2}>
      {/* Product/home title WITH a global expand/collapse button */}
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Link to="/">
          <Text className="nav-title">SRC Handbook</Text>
=======
  const NavContent = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isIndexInitialized, setIndexInitialized] = useState(false);

    useEffect(() => {
      const doSearch = async () => {
        if (searchQuery.length > 2) {
          if (!isIndexInitialized) {
            await initializeIndex();
            setIndexInitialized(true);
          }
          const results = search(searchQuery);
          setSearchResults(results);
        } else {
          setSearchResults([]);
        }
      };
      doSearch();
    }, [searchQuery]);

    return (
      <VStack align="stretch" spacing={2}>
        {/* Title */}
        <Link to="/">
          <Text fontSize="xl" fontWeight="bold" mb={4} color="#531C00">
            SRC Handbook
          </Text>
>>>>>>> edb82ea31f0f38696cbf5a37b2187126ec9fcfb7:srch-website/src/components/ContentsSidebar.jsx
        </Link>

        {/* Simple arrow button to toggle expand/collapse all */}
        <Button
          size="sm"
          variant="ghost"
          className="nav-expand-all-btn"
          onClick={toggleAllSections}
          aria-pressed={
            // pressed means "expanded state is dominant" (most sections open)
            Object.values(expandedSections).filter(Boolean).length >
            Object.keys(expandedSections).length / 2
          }
          aria-label="Toggle expand or collapse all sections"
          title="Expand/Collapse all"
        >
          ⇵
        </Button>
      </Box>

<<<<<<< HEAD:srch-website/src/components/NavBar.jsx
      <Divider mb={4} />

      {/* Section list */}
      {sections.map((section) => {
        const hasSubsections = subsections[section.id]?.length > 0;
        const isExpanded = !!expandedSections[section.id];
        const isActive = currentSectionId === section.id;

        return (
          <Box key={section.id} mb={2}>
            {/* Section header row */}
            <Box
              className="nav-section"
              bg={isActive && !currentSubsectionId ? "gray.100" : "transparent"}
              onClick={(e) => {
                const sectionSubsections = subsections[section.id];
                if (sectionSubsections && sectionSubsections.length > 0) {
                  navigate(`/${section.id}/${sectionSubsections[0].id}`);
                } else {
                  navigate(`/${section.id}`);
                }
                toggleSection(section.id, e);
              }}
            >
              <Box className="nav-section-title">
                <Text className="nav-section-text">{section.title}</Text>
                {section.final === false && <BetaTag />}
              </Box>
              {hasSubsections && (
                <Icon
                  as={ChevronDownIcon}
                  transform={isExpanded ? "rotate(180deg)" : undefined}
                  transition="transform 0.2s"
                  w={5}
                  h={5}
                />
              )}
            </Box>

            {/* Subsection list */}
            {isExpanded && hasSubsections && (
              <VStack align="stretch" pl={4} mt={1} spacing={0}>
                {subsections[section.id].map((subsection) => {
                  const isSubsectionActive =
                    isActive && currentSubsectionId === subsection.id;
                  return (
                    <Box key={subsection.id}>
                      <Link
                        to={`/${section.id}/${subsection.id}`}
                        aria-current={isSubsectionActive ? "page" : undefined}
                      >
                        <Box className="nav-subsection">
                          <Text
                            className={`nav-subsection-text ${
                              isSubsectionActive ? "nav-subsection-active" : ""
                            }`}
                          >
                            {subsection.title}
                          </Text>
                          {subsection.final === false && <BetaTag />}
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
  );
=======
        <Divider mb={4} />

        {/* Main Navigation */}
        {sections.map((section, idx) => {
          const hasSubsections = subsections[section.id]?.length > 0;
          const isExpanded = expandedSections[section.id];
          const isActiveSection = currentSectionId === section.id;

          return (
            <Box key={section.id} mb={2}>
              {/* Top-level section title */}
              <Box
                p={2}
                cursor="pointer"
                onClick={(e) => {
                  const sectionSubsections = subsections[section.id];
                  if (sectionSubsections && sectionSubsections.length > 0) {
                    navigate(`/${section.id}/${sectionSubsections[0].id}`);
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
                  <Text
                    fontWeight="600"
                    color="#1a1a1a"
                    fontSize="md"
                  >
                    {idx + 1}. {section.title}
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

              {/* Subsections */}
              {isExpanded && hasSubsections && (
                <VStack align="stretch" pl={6} mt={1} spacing={0}>
                  {subsections[section.id].map((subsection) => {
                    const isSubActive =
                      isActiveSection && currentSubsectionId === subsection.id;

                    return (
                      <Box key={subsection.id} mb={1}>
                        <Link to={`/${section.id}/${subsection.id}`}>
                          <Box
                            px={2}
                            py={1}
                            borderRadius="md"
                            bg={isSubActive ? "#531C00" : "transparent"}
                            transition="background-color 0.2s ease"
                            _hover={{
                              bg: isSubActive ? "#531C00" : "rgba(83,28,0,0.1)",
                            }}
                          >
                            <Text
                              fontSize="sm"
                              fontWeight={isSubActive ? "600" : "400"}
                              color={isSubActive ? "white" : "#1a1a1a"}
                            >
                              {subsection.title}
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
    );
  };
>>>>>>> edb82ea31f0f38696cbf5a37b2187126ec9fcfb7:srch-website/src/components/ContentsSidebar.jsx

  // Mobile: render a button that opens the left nav in a Drawer.
  if (isMobile) {
    return (
      <>
        <Button
          variant="ghost"
          leftIcon={<GiHamburgerMenu size="40px" />}
          pl={6}
          onClick={onOpen}
        />
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

  // Desktop: fixed sidebar with resizer.
  const visualWidth = collapsed ? 0 : leftWidth;

  return (
    <Box
      as="aside"
      className={`left-sidebar ${className}`.trim()}
      position="fixed"
      left={0}
      top={0}
      height="100vh"
<<<<<<< HEAD:srch-website/src/components/NavBar.jsx
      borderRight="1px solid"
      borderColor="gray.200"
      bg="white"
      overflowY={collapsed ? "hidden" : "auto"} // dynamic
      overflowX="hidden"
      p={collapsed ? 0 : 4} // dynamic spacing
      boxShadow="2xl"
=======
      borderRight="1px solid #eee"
      bg="#fff"
      overflowY="auto"
      p={4}
>>>>>>> edb82ea31f0f38696cbf5a37b2187126ec9fcfb7:srch-website/src/components/ContentsSidebar.jsx
      zIndex={10}
      aria-label="Primary navigation"
      aria-expanded={!collapsed}
      onMouseEnter={() => setShowButton(true)}
      onMouseLeave={() => setShowButton(false)}
    >
      <NavContent />

      {/* Left resizer (base visuals via CSS; dynamic bits remain) */}
      <Box
        className={`left-resizer ${isResizing ? "is-resizing" : ""}`}
        width={collapsed ? "60px" : "6px"} // dynamic width stays inline
        onMouseDown={startResize}
        onTouchStart={startResize}
        onKeyDown={handleKeyDown}
        role="separator"
        aria-orientation="vertical"
        tabIndex={0}
        aria-label="Resize navigation pane"
        aria-hidden={collapsed}
      />
    </Box>
  );
}

export default NavBar;
