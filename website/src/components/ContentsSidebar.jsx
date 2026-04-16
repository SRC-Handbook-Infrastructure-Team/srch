import "../styles/MarkdownPage.css";
import { useState, useEffect, useMemo, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Box, Text, VStack, Icon } from "@chakra-ui/react";
import { LuChevronDown } from "react-icons/lu";
import {
  getSections,
  getSubsections,
  getContent,
  warmMarkdownContent,
  getPreloadedNavigationData,
} from "../util/MarkdownRenderer";

/* =============================================================================
   ContentsSidebar

   PURPOSE
   - Renders the left-hand "Contents" navigation for the documentation site.
   - Prioritizes fast perceived performance (titles first, content/headings lazy).
   - Enforces clear separation between navigation state (URL) and UI state
     (expand/collapse), to reduce bugs and maintain a predictable UX.

   KEY UX DECISIONS
   - Two click targets:
      • Title row → NAVIGATE
      • Chevron icon → EXPAND/COLLAPSE (does not navigate)
   - "Expand All" expands everything and fetches headings lazily per section.
   - "Collapse All" collapses everything except the ACTIVE section (route-based).
   - Toggling a section via chevron: Expanding one collapses others. Collapsing
     that section collapses all.

   PERFORMANCE NOTES
   - Sections and subsections metadata load up-front (lightweight).
   - Markdown content is fetched on-demand (when expanding) to compute headings.
   - Subsection metadata fetching is parallelized for faster initial load.

   ACCESSIBILITY
   - Keyboard focus is preserved (navigation vs. toggling are distinct actions).
   - "aria-pressed" is used on expand/collapse button for state disclosure.

   API CONTRACTS (util/MarkdownRenderer)
  - getSections()       -> [{ id, title?, order? }, ...]
   - getSubsections(id)  -> [{ id, title?, order? }, ...]
   - getContent(sectionId, subId) -> { content: string }

   ========================================================================== */

/* ----------------------------- Helpers ------------------------------------ */
// WHY: Stable section number ordering for labels. If not found, fallback to order or index.
const SECTION_NUMBER_MAP = {
  privacy: 1,
  accessibility: 2,
  "automated-decision-making": 3,
  "generative-ai": 4,
};

// WHY: Produce a, b, c... aa, ab... for subsection labels.
function indexToLetter(index) {
  let s = "";
  let i = index;
  do {
    s = String.fromCharCode(97 + (i % 26)) + s;
    i = Math.floor(i / 26) - 1;
  } while (i >= 0);
  return s;
}

// WHY: Stable in-app slug generation for headings.
function slugify(text = "") {
  return text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// WHY: Extract only H3–H6 from markdown content to form a contextual TOC per subsection.
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
/* =============================================================================
   Component: ContentsSidebar
   ---------------------------------------------------------------------------
   Props:
   - className, width, collapsed, isResizing
   - onToggleSidebar, onStartResize, onHandleKeyDown
   ---------------------------------------------------------------------------
   High-level data flow:

   [URL] -> currentSectionId/currentSubsectionId  (NAVIGATION state, read-only)
      |
      V
   sections (array) & subsections (map)           (DATA state)
      |
      V
   expandedSections (map), allExpanded (bool)     (UI state)

   IMPORTANT: Toggling does not navigate; navigating does not toggle.

   ========================================================================== */
export default function ContentsSidebar({
  className = "",
  sidebarRef = null,
  focusTabIndex = -1,
  onSidebarContainerKeyDown = () => {},
  width,
  collapsed,
  isResizing = false,
  onStartResize = () => {},
  onHandleKeyDown = () => {},
  onToggleSidebar = () => {},
}) {
  const [isAnimatingClose, setIsAnimatingClose] = useState(false);

  /* ----------------------------- Environment ------------------------------ */

  const location = useLocation();
  const navigate = useNavigate();

  /* ---------------------------- URL Derivations --------------------------- */
  const currentPath = location.pathname;
  const pathParts = useMemo(
    () => currentPath.split("/").filter(Boolean),
    [currentPath],
  );
  const currentSectionId = pathParts[0] || "";
  const currentSubsectionId = pathParts[1] || "";

  useEffect(() => {
    if (collapsed) {
      setIsAnimatingClose(true);
      const t = setTimeout(() => setIsAnimatingClose(false), 350);
      return () => clearTimeout(t);
    }
  }, [collapsed]);

  /* ----------------------------- Data State ------------------------------- */
  const [sections, setSections] = useState([]);
  const [subsections, setSubsections] = useState({});
  const [hasFetchedData, setHasFetchedData] = useState(false);

  /* ----------------------------- UI State --------------------------------- */
  const [expandedSections, setExpandedSections] = useState({});
  const [allExpanded, setAllExpanded] = useState(false);

  /* =========================================================================
     Data Loading: Sections and Subsections
     -------------------------------------------------------------------------
     Strategy:
     1) Load sections (lightweight metadata).
     2) Load subsections for each section in PARALLEL (faster than serial).
     3) Auto-expand the route's current section, if present.
     4) If no current section in URL, redirect to the first allowed section.
     5) Lazy-load headings later on expansion (see fetchHeadingsForSection).
     ========================================================================= */
  useEffect(() => {
    let isAlive = true;

    async function loadAllData() {
      try {
        const preloaded = getPreloadedNavigationData();
        if (preloaded && !hasFetchedData) {
          const filteredSections = preloaded.sections || [];
          const subsectionsMap = preloaded.subsections || {};

          if (!isAlive) return;
          setSections(filteredSections);
          setSubsections(subsectionsMap);

          if (currentSectionId && subsectionsMap[currentSectionId]) {
            setExpandedSections((prev) => ({
              ...prev,
              [currentSectionId]: true,
            }));
          }

          if (
            !currentSectionId &&
            filteredSections.length > 0 &&
            !hasFetchedData
          ) {
            navigate(`/${filteredSections[0].id}`, { replace: true });
          }

          setHasFetchedData(true);
          return;
        }

        // 1) Fetch sections
        const sectionsData = await getSections();
        const sortedSections = Array.isArray(sectionsData)
          ? [...sectionsData].sort(
              (a, b) => (a.order || 999) - (b.order || 999),
            )
          : [];

        // 2) Filter allowed sections (defensive)
        const ALLOWED_SECTION_IDS = new Set([
          "privacy",
          "accessibility",
          "automatedDecisionMaking",
          "generativeAI",
        ]);
        const filteredSections = sortedSections.filter(
          (s) => s && ALLOWED_SECTION_IDS.has(s.id),
        );

        if (!isAlive) return;
        setSections(filteredSections);

        // 3) Fetch subsections in PARALLEL for speed
        const subFetches = filteredSections.map((section) =>
          getSubsections(section.id),
        );
        const subResults = await Promise.all(subFetches);

        if (!isAlive) return;

        // 4) Sanitize + normalize subsections per section
        const subsectionsMap = {};
        const expandStateMap = {};

        filteredSections.forEach((section, idx) => {
          const rawSubsections = subResults[idx];

          if (rawSubsections && rawSubsections.length > 0) {
            const sanitized = rawSubsections
              .filter((s) => s && typeof s.id === "string" && s.id.trim())
              .filter((s) => {
                const id = (s.id || "").toLowerCase();
                return (
                  !id.startsWith(".") && id !== "drawer" && id !== "_drawer"
                );
              })
              .map((s) => ({
                ...s,
                title:
                  (s.title && String(s.title).trim()) ||
                  String(s.id || "")
                    .replace(/([A-Z])/g, " $1")
                    .replace(/[-_]/g, " ")
                    .replace(/\b\w/g, (m) => m.toUpperCase()),
                // WHY: headings are lazy; null signals "not loaded yet".
                headings: null,
                order: typeof s.order === "number" ? s.order : 999,
              }))
              .sort((a, b) => (a.order || 999) - (b.order || 999));

            if (sanitized.length > 0) {
              subsectionsMap[section.id] = sanitized;
              // WHY: auto-expand current route's section on initial load for a better UX.
              if (section.id === currentSectionId)
                expandStateMap[section.id] = true;
            }
          }
        });

        setSubsections(subsectionsMap);
        setExpandedSections((prev) => ({ ...prev, ...expandStateMap }));

        // Metadata-first title: Cache subsection metadata globally
        window.__SRCH_SUBSECTIONS_CACHE__ =
          window.__SRCH_SUBSECTIONS_CACHE__ || {};

        for (const [sec, subs] of Object.entries(subsectionsMap)) {
          window.__SRCH_SUBSECTIONS_CACHE__[sec] = subs.map((s) => ({
            id: s.id,
            title: s.title,
          }));
        }

        // 5) If no section in URL, navigate to the first allowed section.
        if (
          !currentSectionId &&
          filteredSections.length > 0 &&
          !hasFetchedData
        ) {
          navigate(`/${filteredSections[0].id}`, { replace: true });
        }

        if (!isAlive) return;
        setHasFetchedData(true);
      } catch (err) {
        console.error("Error loading table of contents:", err);
      }
    }

    loadAllData();
    return () => {
      isAlive = false;
    };
    // WHY: currentSectionId can change with URL; we re-run to ensure auto-expansion sync.
  }, [currentSectionId, navigate, hasFetchedData]);

  /* =========================================================================
     Lazy Headings: fetch on expand only (per section)
     -------------------------------------------------------------------------
     Only pull and parse heavy markdown when necessary. Skips already-loaded
     subsections (headings !== null).
     ========================================================================= */
  const fetchHeadingsForSection = useCallback(
    async (sectionId) => {
      const sectionSubs = subsections[sectionId];
      if (!sectionSubs) return;

      const needFetch = sectionSubs.some((s) => s.headings === null);
      if (!needFetch) return;

      try {
        const updated = await Promise.all(
          sectionSubs.map(async (sub) => {
            if (sub.headings !== null) return sub;
            const result = await getContent(sectionId, sub.id);
            const content = result?.content || "";
            const headings = parseSubsections(content);
            return { ...sub, headings };
          }),
        );
        setSubsections((prev) => ({ ...prev, [sectionId]: updated }));
      } catch (err) {
        console.error("Error fetching subsection headings:", err);
      }
    },
    [subsections],
  );

  /* =========================================================================
   Expand/Collapse: pure UI behaviors (no navigation side effects)
   -------------------------------------------------------------------------
   - Chevron click toggles expansion.
   - Expanding a section leaves other sections as-is (multi-open allowed).
   - Collapsing a section closes only that section.
   - Expand All → open every section.
   - Collapse All → close all except the active route-based section.
   ========================================================================= */

  const toggleSection = useCallback(
    (sectionId) => {
      setExpandedSections((prev) => {
        const nextOpen = !prev[sectionId];

        // When expanding: do NOT close other sections
        if (nextOpen) {
          fetchHeadingsForSection(sectionId);
          return { ...prev, [sectionId]: true };
        }

        // When collpasing: collapse only this section
        const copy = { ...prev };
        delete copy[sectionId];
        return copy;
      });
    },
    [fetchHeadingsForSection],
  );

  const expandAllSections = useCallback(() => {
    // Expand all sections at once; lazily load headings for each.
    const next = Object.fromEntries(sections.map((s) => [s.id, true]));
    setExpandedSections(next);
    sections.forEach((s) => fetchHeadingsForSection(s.id));
    setAllExpanded(true);
  }, [sections, fetchHeadingsForSection]);

  const collapseAllSections = useCallback(() => {
    // Keep ONLY the active (route) section open, if any.
    if (currentSectionId) {
      setExpandedSections({ [currentSectionId]: true });
    } else {
      setExpandedSections({});
    }
    setAllExpanded(false);
  }, [currentSectionId]);

  const toggleExpandCollapse = useCallback(() => {
    if (allExpanded) collapseAllSections();
    else expandAllSections();
  }, [allExpanded, collapseAllSections, expandAllSections]);

  // WHY: Keep `allExpanded` derived in sync with the actual map and sections.
  useEffect(() => {
    const ids = sections.map((s) => s.id);
    const allAreExpanded =
      ids.length > 0 && ids.every((id) => !!expandedSections[id]);
    if (allAreExpanded !== allExpanded) setAllExpanded(allAreExpanded);
  }, [sections, expandedSections, allExpanded]);

  /**
   * Navigate to a section landing page.
   *
   * IMPORTANT:
   * - This function is *purely* about navigation.
   * - It does NOT expand UI state anymore.
   * - UI state is synced from the URL instead (see useEffect below).
   */
  const navigateToSection = useCallback(
    (sectionId) => {
      navigate(`/${sectionId}`);
    },
    [navigate],
  );

  /**
   * Sync UI-expanded section state to match the current URL.
   *
   * Rules:
   * - When the current route specifies a sectionId,
   *   ensure that section is expanded.
   * - If it's already expanded, do nothing.
   * - This guarantees UI always reflects the route,
   *   even if navigation occurred elsewhere.
   */
  useEffect(() => {
    if (!currentSectionId) return;

    setExpandedSections((prev) => {
      if (prev[currentSectionId]) return prev;

      // Expand section lazily when reached via navigation
      fetchHeadingsForSection(currentSectionId);

      return { ...prev, [currentSectionId]: true };
    });
  }, [currentSectionId, fetchHeadingsForSection]);

  // WHY: Resolve display number once (prefers explicit mapping).
  const resolveDisplayNumber = useCallback((section, idx) => {
    return (
      SECTION_NUMBER_MAP[section.id] ??
      (typeof section.order === "number" ? section.order + 1 : idx + 1)
    );
  }, []);

  /* =========================================================================
     NavContent: Renders the vertical nav list. Pure-presentational except for
     event handlers, which call into the pure UI methods or navigation.
     ========================================================================= */
  const NavContent = useCallback(
    () => (
      <VStack align="stretch">
        {sections.map((section, idx) => {
          const sectionSubs = subsections[section.id] || [];
          const hasSubsections = sectionSubs.length > 0;
          const isExpanded = !!expandedSections[section.id];
          const isActiveSection = currentSectionId === section.id; // route-aware
          const isLandingPage = isActiveSection && !currentSubsectionId;
          const displayNumber = resolveDisplayNumber(section, idx);

          return (
            <Box key={section.id} className={`sidebar-section`}>
              <Box
                className={`sidebar-section-header ${isActiveSection ? "is-active" : ""}`}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box
                  display="flex"
                  alignItems="center"
                  gap="6px"
                  cursor="pointer"
                  role="button"
                  tabIndex={0}
                  onClick={() => navigateToSection(section.id)}
                  onMouseEnter={() => warmMarkdownContent(section.id)}
                  onFocus={() => warmMarkdownContent(section.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      navigateToSection(section.id);
                    }
                  }}
                  aria-label={`Open ${section.title || section.id} landing page`}
                >
                  <Text
                    className={`sidebar-section-title ${isLandingPage ? "is-active" : ""}`}
                  >
                    {displayNumber}. {section.title}
                  </Text>
                </Box>

                <Icon
                  as={LuChevronDown}
                  transform={isExpanded ? "rotate(180deg)" : undefined}
                  transition="transform 0.2s"
                  w={5}
                  h={5}
                  color="currentColor"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSection(section.id);
                  }}
                  role="button"
                  aria-label={
                    isExpanded ? "Collapse section" : "Expand section"
                  }
                />
              </Box>

              {isExpanded && hasSubsections && (
                <VStack
                  className="sidebar-subsection-container"
                  align="stretch"
                  mt={1}
                >
                  {sectionSubs.map((sub, subIdx) => {
                    const isSubActive =
                      isActiveSection && currentSubsectionId === sub.id;
                    const subLetter = indexToLetter(subIdx);
                    const subPrefix = `${displayNumber}.${subLetter}.`;

                    return (
                      <Box key={sub.id}>
                        <Link
                          className="sidebar-subsection-link"
                          to={`/${section.id}/${sub.id}`}
                          onMouseEnter={() =>
                            warmMarkdownContent(section.id, sub.id)
                          }
                          onFocus={() =>
                            warmMarkdownContent(section.id, sub.id)
                          }
                        >
                          {" "}
                          <Box className={`sidebar-sub-row`}>
                            <Text
                              className={`sidebar-subsection ${isSubActive ? "is-active" : ""}`}
                            >
                              {subPrefix} {sub.title}
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
    ),
    [
      sections,
      subsections,
      expandedSections,
      currentSectionId,
      currentSubsectionId,
      resolveDisplayNumber,
      navigateToSection,
      toggleSection,
    ],
  );

  /* =========================================================================
     Desktop Sidebar
     ========================================================================= */

  return (
    <Box
      as="aside"
      ref={sidebarRef}
      className={`left-sidebar ${!collapsed ? "open" : ""} ${collapsed && isAnimatingClose ? "closing" : ""} ${className}`.trim()}
      position="fixed"
      left={0}
      style={{
        width: width,
      }}
      overflowY="auto"
      overflowX="hidden"
      p={0}
      zIndex={10}
      aria-label="Primary navigation"
      aria-expanded={!collapsed}
      tabIndex={focusTabIndex}
      onKeyDown={onSidebarContainerKeyDown}
    >
      <div className="sidebar-header-controls">
        <div>
          <button
            className="sidebar-expand-toggle"
            onClick={toggleExpandCollapse}
            aria-pressed={allExpanded}
          >
            {allExpanded ? "Collapse all" : "Expand all"}
            <span
              className="icon-double-chevron"
              aria-hidden="true"
              style={{
                marginLeft: 6,
                transform: allExpanded ? "rotate(180deg)" : "none",
              }}
            >
              <svg viewBox="0 0 10 6">
                <path d="M1 5l4-4 4 4" />
              </svg>
              <svg viewBox="0 0 10 6" style={{ transform: "translateY(-2px)" }}>
                <path d="M1 5l4-4 4 4" />
              </svg>
            </span>
          </button>
        </div>
      </div>
      <Box p={4}>
        <NavContent />
      </Box>
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
        onDoubleClick={onToggleSidebar}
      />
    </Box>
  );
}
