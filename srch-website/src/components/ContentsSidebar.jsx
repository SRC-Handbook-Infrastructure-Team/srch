// ...existing imports...
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
import "../index.css";

/* ----------------------------- File Overview --------------------------------
ContentsSidebar
- Renders the left-hand "Contents" navigation.
- Updated to accept explicit props: width, collapsed, isResizing, onToggleSidebar,
  onStartResize, onHandleKeyDown.
- Keeps expand/collapse logic unchanged.
- Prevents text jitter & reflows during sidebar resizing.
----------------------------------------------------------------------------*/

/* ----------------------------- Helpers ------------------------------------ */
const SECTION_NUMBER_MAP = {
  privacy: 1,
  accessibility: 2,
  "automated-decision-making": 3,
  "generative-ai": 4,
};

function indexToLetter(index) {
  let s = "";
  let i = index;
  do {
    s = String.fromCharCode(97 + (i % 26)) + s;
    i = Math.floor(i / 26) - 1;
  } while (i >= 0);
  return s;
}

function indexToRoman(index) {
  const n = index + 1;
  const romans = [
    ["M", 1000], ["CM", 900], ["D", 500], ["CD", 400],
    ["C", 100], ["XC", 90], ["L", 50], ["XL", 40],
    ["X", 10], ["IX", 9], ["V", 5], ["IV", 4], ["I", 1],
  ];
  let num = n, res = "";
  for (const [r, val] of romans) while (num >= val) { res += r; num -= val; }
  return res.toLowerCase();
}

function slugify(text = "") {
  return text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function parseSubsections(content) {
  const headings = [];
  if (!content) return headings;
  const re = /^(#{3,6})\s+(.*)$/gm;
  let match;
  while ((match = re.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    if (text) headings.push({ id: slugify(text), text, level });
  }
  return headings;
}

const BetaTag = () => <Box className="beta-tag">BETA</Box>;

/* -------------------------------------------------------------------------- */
export default function ContentsSidebar({
  className = "",
  width = 250,
  collapsed = false,
  isResizing = false,
  onToggleSidebar = () => {},
  onStartResize = () => {},
  onHandleKeyDown = () => {},
}) {
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location.pathname;
  const pathParts = currentPath.split("/").filter(Boolean);
  const currentSectionId = pathParts[0] || "";
  const currentSubsectionId = pathParts[1] || "";

  const [sections, setSections] = useState([]);
  const [subsections, setSubsections] = useState({});
  const [expandedSections, setExpandedSections] = useState({});
  const [hasFetchedData, setHasFetchedData] = useState(false);

  /* ---------------------- Fetch table of contents ---------------------- */
  useEffect(() => {
    let active = true;
    async function loadAllData() {
      try {
        const sectionsData = await getSections();
        const sortedSections = Array.isArray(sectionsData)
          ? [...sectionsData].sort((a, b) => (a.order || 999) - (b.order || 999))
          : [];

        const ALLOWED_SECTION_IDS = new Set([
          "privacy",
          "accessibility",
          "automatedDecisionMaking",
          "generativeAI",
        ]);
        const filteredSections = sortedSections.filter(
          (s) => s && ALLOWED_SECTION_IDS.has(s.id)
        );
        if (!active) return;
        setSections(filteredSections);

        const subsectionsMap = {};
        const expandStateMap = {};

        for (const section of sortedSections) {
          const rawSubsections = await getSubsections(section.id);
          if (!active) return;
          if (rawSubsections && rawSubsections.length > 0) {
            const sanitized = rawSubsections
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

            if (sanitized.length > 0) {
              subsectionsMap[section.id] = sanitized;
              if (section.id === currentSectionId) expandStateMap[section.id] = true;
            }
          }
        }

        if (!active) return;
        setSubsections(subsectionsMap);
        setExpandedSections((prev) => ({ ...prev, ...expandStateMap }));

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
  }, [currentSectionId, currentSubsectionId, navigate]);

  useEffect(() => {
    if (currentSectionId && !currentSubsectionId) {
      const sectionSubsections = subsections[currentSectionId];
      if (sectionSubsections && sectionSubsections.length > 0) {
        navigate(`/${currentSectionId}/${sectionSubsections[0].id}`, { replace: true });
      }
    }
  }, [currentSectionId, currentSubsectionId, subsections, navigate]);

  /* ---------------------- Expand/Collapse logic ---------------------- */
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

  const toggleSection = (sectionId, event) => {
    if (event && (event.target.tagName === "svg" || event.target.closest("svg"))) {
      event.preventDefault();
      setExpandedSections((prev) => {
        const willExpand = !prev[sectionId];
        const next = { ...prev, [sectionId]: willExpand };
        if (willExpand) fetchHeadingsForSection(sectionId);
        return next;
      });
    }
  };

  const [allExpanded, setAllExpanded] = useState(false);
  const expandAllSections = () => {
    const next = Object.fromEntries(sections.map((s) => [s.id, true]));
    setExpandedSections(next);
    sections.forEach((s) => fetchHeadingsForSection(s.id));
    setAllExpanded(true);
  };
  const collapseAllSections = () => {
    setExpandedSections({});
    setAllExpanded(false);
  };
  const toggleExpandCollapse = () => {
    if (allExpanded) collapseAllSections();
    else expandAllSections();
  };

  useEffect(() => {
    const ids = sections.map((s) => s.id);
    const allAreExpanded = ids.length > 0 && ids.every((id) => !!expandedSections[id]);
    if (allAreExpanded !== allExpanded) setAllExpanded(allAreExpanded);
  }, [sections, expandedSections, allExpanded]);

  /* ---------------------- Nav Rendering ---------------------- */
  const NavContent = () => (
    <VStack align="stretch" spacing={2}>
      {sections.map((section, idx) => {
        const sectionSubs = subsections[section.id] || [];
        const hasSubsections = sectionSubs.length > 0;
        const isExpanded = !!expandedSections[section.id];
        const isActiveSection = currentSectionId === section.id;
        const displayNumber =
          SECTION_NUMBER_MAP[section.id] ??
          (typeof section.order === "number" ? section.order + 1 : idx + 1);

        return (
          <Box key={section.id} mb={2} className={`sidebar-section`}>
            {/* ✅ Modified parent row */}
            <Box
              className={`sidebar-section-header ${isActiveSection ? "is-active" : ""}`}
              p={2}
              cursor="pointer"
              onClick={(e) => {
                if (hasSubsections) navigate(`/${section.id}/${sectionSubs[0].id}`);
                else navigate(`/${section.id}`);
                toggleSection(section.id, e);
              }}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box display="flex" alignItems="center" gap="6px">
                <Text className="sidebar-section-title">
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

            {isExpanded && hasSubsections && (
              <VStack className="sidebar-subsection-container" align="stretch" pl={6} mt={1} spacing={0}>
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
                            className="sidebar-subsection"
                            fontWeight={isSubActive ? "600" : "400"}
                            color={isSubActive ? "white" : "#1a1a1a"}
                          >
                            {subDisplay} - {sub.title}
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

  /* ---------------------- Mobile Drawer ---------------------- */
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
              <div className="sidebar-header-controls">
                <button
                  className="sidebar-btn"
                  onClick={toggleExpandCollapse}
                  aria-pressed={allExpanded}
                >
                  {allExpanded ? "Collapse all" : "Expand all"}
                </button>
              </div>
              <NavContent />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    );
  }

  /* ---------------------- Desktop Sidebar ---------------------- */
  const visualWidth = collapsed ? 0 : width;

  return (
    <Box
      as="aside"
      className={`left-sidebar ${className}`.trim()}
      position="fixed"
      left={0}
      top={0}
      height="100vh"
      bg="#fff"
      overflowY="auto"
      overflowX="hidden"
      p={0}
      zIndex={10}
      aria-label="Primary navigation"
      aria-expanded={!collapsed}
      style={{
        width: visualWidth,
        transition: isResizing ? "none" : "width 0.25s ease",
      }}
    >
      <div className="sidebar-header-controls">
        <button
          className="sidebar-btn"
          onClick={toggleExpandCollapse}
          aria-pressed={allExpanded}
          style={{ marginLeft: "auto" }}
        >
          {allExpanded ? "Collapse all" : "Expand all"}
        </button>
      </div>

      <Box p={4}>
        <NavContent />
      </Box>

      {/* Resize handle */}
      <Box
        className={`left-resizer ${isResizing ? "is-resizing" : ""}`}
        width={collapsed ? "60px" : "6px"}
        onMouseDown={onStartResize}
        onTouchStart={onStartResize}
        onKeyDown={onHandleKeyDown}
        role="separator"
        tabIndex={0}
        aria-orientation="vertical"
        aria-label="Resize navigation pane"
        aria-hidden={collapsed}
      />
    </Box>
  );
}
