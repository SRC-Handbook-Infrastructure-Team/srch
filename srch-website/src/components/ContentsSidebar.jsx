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

  const currentSectionId = pathParts[0] || "";
  const currentSubsectionId = pathParts[1] || "";
  const currentHeadingId = location.hash?.substring(1) || "";

  const [sections, setSections] = useState([]);
  const [subsections, setSubsections] = useState({});
  const [expandedSections, setExpandedSections] = useState({});
  const [hasFetchedData, setHasFetchedData] = useState(false);

  useEffect(() => {
    async function loadAllData() {
      try {
        const sectionsData = await getSections();
        const sortedSections = [...sectionsData].sort(
          (a, b) => a.order - b.order
        );
        setSections(sortedSections);

        const subsectionsMap = {};
        const expandStateMap = {};

        for (const section of sortedSections) {
          const sectionSubsections = await getSubsections(section.id);

          if (sectionSubsections.length > 0) {
            subsectionsMap[section.id] = sectionSubsections.sort(
              (a, b) => a.order - b.order
            );
            if (section.id === currentSectionId) {
              expandStateMap[section.id] = true;
            }
          }
        }

        setSubsections(subsectionsMap);
        setExpandedSections(expandStateMap);

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

  useEffect(() => {
    if (currentSectionId && !currentSubsectionId) {
      const sectionSubsections = subsections[currentSectionId];
      if (sectionSubsections && sectionSubsections.length > 0) {
        navigate(`/${currentSectionId}/${sectionSubsections[0].id}`);
      }
    }
  }, [currentSectionId, currentSubsectionId, subsections, navigate]);

  const toggleSection = (sectionId, event) => {
    if (event.target.tagName === "svg" || event.target.closest("svg")) {
      event.preventDefault();
      setExpandedSections((prev) => ({
        ...prev,
        [sectionId]: !prev[sectionId],
      }));
    }
  };

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
    }
  };

  const NavContent = () => {

    return (
      <VStack align="stretch" spacing={2}>

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
                  <Text fontWeight="600" color="#1a1a1a" fontSize="md">
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
