// NavBar.jsx  
/**
 * NavBar (Left Sidebar Navigation)
 * ---------------------------------------------------------------------------
 * What this is:
 *   - The primary, left-hand navigation used across the SRC Handbook site.
 *   - Desktop: fixed column; Mobile: drawer opened from a hamburger button.
 *
 * What it renders:
 *   - A title link to the homepage
 *   - A list of sections; each may expand to show subsections
 *   - A "BETA" tag on items marked `final === false`
 *   - A resize handle on the right edge (desktop only)
 *
 * Key behaviors (high level):
 *   - Fetches sections + subsections (ordered) from Markdown metadata.
 *   - Automatically expands the currently active section based on the URL.
 *   - Clicking a section navigates to its first subsection (if any) or to the section page.
 *   - On mobile, shows the same content inside a Drawer.
 *   - Exposes an accessible resize handle (keyboard + pointer) via LayoutContext.
 *
 * Safe refactor notes:
 *   - We moved **static, purely visual styles** into index.css via classNames.
 *   - We kept **dynamic styles** (state/theme/props-dependent) in JSX to avoid regressions.
 *   - No logic, API calls, ARIA attributes, or routes were changed.
 *   - Added support for receiving an optional `className` prop (for slide-in transitions
 *     when controlled by SidebarLayout).
 */

import { useState, useEffect, useRef } from "react";
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
import { getSections, getSubsections } from "../util/MarkdownRenderer";
import { useLayout } from "../layouts/LayoutContext";

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
  const currentSectionId = pathParts[0] || "";
  const currentSubsectionId = pathParts[1] || "";

  /**
   * Mobile Drawer control (Chakra) + breakpoint detection.
   */
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  /**
   * Data for sections + subsections.
   * expandedSections is a map of sectionId -> boolean (expanded or not).
   */
  const [sections, setSections] = useState([]);
  const [subsections, setSubsections] = useState({});
  const [expandedSections, setExpandedSections] = useState({});
  const [hasFetchedData, setHasFetchedData] = useState(false);
  const seededRef = useRef(false); // prevent reseeding after first load

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
  useEffect(() => {
    async function loadAllData() {
      try {
        // Load all sections
        const sectionsData = await getSections();

        // Sort sections by their display order
        const sortedSections = [...sectionsData].sort(
          (a, b) => a.order - b.order
        );
        setSections(sortedSections);

        // Preload all subsections and track expanded sections
        const subsectionsMap = {};
        const expandStateMap = {};

        for (const section of sortedSections) {
          const sectionSubsections = await getSubsections(section.id);

          if (sectionSubsections.length > 0) {
            // Store sorted subsections under their parent section
            subsectionsMap[section.id] = sectionSubsections.sort(
              (a, b) => a.order - b.order
            );

            // Ensure the current section is open initially
            if (section.id === currentSectionId) {
              expandStateMap[section.id] = true;
            }
          }
        }

        setSubsections(subsectionsMap);

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
        }

        setHasFetchedData(true);
      } catch (error) {
        console.error("Error loading navigation data:", error);
      }
    }

    loadAllData();
  }, [currentSectionId, currentSubsectionId, navigate, hasFetchedData]);

  /**
   * Persist expanded sections whenever they change (after initial seed).
   */
  useEffect(() => {
    if (!seededRef.current) return;
    try {
      const ids = Object.entries(expandedSections)
        .filter(([_, v]) => v)
        .map(([k]) => k);
      localStorage.setItem(EXPANDED_KEY, JSON.stringify(ids));
    } catch {}
  }, [expandedSections]);

  /**
   * toggleSection
   * -------------------------------------------------------------------------
   * Expand/collapse a section node. If the click originated on the chevron
   * (an <svg>), prevent navigation and only toggle expansion state.
   */
  const toggleSection = (sectionId, event) => {
    if (event.target.tagName === "svg" || event.target.closest("svg")) {
      event.preventDefault();
      setExpandedSections((prev) => ({
        ...prev,
        [sectionId]: !prev[sectionId],
      }));
    }
  };

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
    }
    setExpandedSections(next);
  };

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
      borderRight="1px solid"
      borderColor="gray.200"
      bg="white"
      overflowY={collapsed ? "hidden" : "auto"} // dynamic
      overflowX="hidden"
      p={collapsed ? 0 : 4} // dynamic spacing
      boxShadow="2xl"
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
