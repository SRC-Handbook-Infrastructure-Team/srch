import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  useToast,
  Box,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerContent,
  DrawerCloseButton,
  DrawerOverlay,
  Divider,
  Text,
} from "@chakra-ui/react";
import { useLayout } from "../layouts/LayoutContext";
import MarkdownRenderer, {
  getSections,
  getContent,
  getSubsections,
  getDrawerFile,
} from "../util/MarkdownRenderer";

function MarkdownPage() {
  // Get parameters from URL and location for hash

  /*

  Hook Explanation: 
  - sectionId: refers to the module name (ex: Privacy, Accessibility, Generative AI)
  - subSectionId: refers to the article name (ex: bias, fairness, whatIsAccessibility)
  - urlTerm: only used for sidebar content to create a unique slug for every sidebar
  (ex:)
  - sidebar and setSidebar: sidebar is the dictionary that maps all of the sidebar terms
  (what the user sees and can click) to the actual content relating to that term
  
  drawerTerm and setDrawerTerm: drawerTerm is used to set the heading for each
  sidebar, if a heading is provided then the drawer term is set to the heading
  if not it is automatically pulled


  */

/**
 * Formats the compact page header that sits above the divider, e.g.:
 * "1.a - What is Privacy?"
 *
 * Rules:
 * - Section numbering is fixed by product spec (Privacy=1, Accessibility=2, ADM=3, GenAI=4).
 * - Subsection letters come from index-based ordering (a, b, c...).
 * - Prefer frontmatter `title` (pageTitle) when present; otherwise prettify the slug.
 *
 * This version reuses the same numbering logic as ContentsSidebar.
 */

// ----------------- Shared Formatting Helpers (same logic as ContentsSidebar) -----------------
const SECTION_NUMBER_MAP = {
  privacy: "1",
  accessibility: "2",
  "automated-decision-making": "3",
  "generative-ai": "4",
};

// convert 0 -> 'a', 1 -> 'b', etc.
function indexToLetter(index) {
  let s = "";
  let i = index;
  do {
    s = String.fromCharCode(97 + (i % 26)) + s;
    i = Math.floor(i / 26) - 1;
  } while (i >= 0);
  return s;
}

// prettify "what-is-privacy" → "What Is Privacy"
function prettifySlug(slug = "") {
  return String(slug)
    .replace(/-/g, " ")
    .replace(/\b\w/g, (m) => m.toUpperCase())
    .trim();
}

/**
 * Build a formatted header string using the loaded subsections array.
 * Accepts subsections so the letter is computed from actual ordering (no hardcoded map).
 *
 * @param {string} sectionId
 * @param {string} subsectionId
 * @param {string} pageTitle
 * @param {Array} subsectionsArr  // array of { id, title, order, ... }
 * @returns {string}
 */
function getFormattedTitle(sectionId, subsectionId, pageTitle, subsectionsArr = []) {
  const sectionNum = SECTION_NUMBER_MAP[sectionId] || "?";

  let letter = "";
  if (subsectionId && Array.isArray(subsectionsArr) && subsectionsArr.length > 0) {
    const idx = subsectionsArr.findIndex((s) => s && s.id === subsectionId);
    if (idx >= 0) letter = indexToLetter(idx);
  }

  const titleText =
    pageTitle && pageTitle.trim()
      ? pageTitle.trim()
      : prettifySlug(subsectionId || sectionId || "");

  return `${sectionNum}${letter ? `.${letter}` : ""} - ${titleText}`;
}

  const { sectionId, subsectionId, term: urlTerm } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const cachedContent = useRef({});
  

  //  Guard against undefined context (edge cases/tests)
  const layout = useLayout() || {};
  const { openRightDrawer, closeRightDrawer } = layout;

  // 🧩 Highlight from URL state
  const highlight = location.state?.highlight || "";

  // 🧩 Drawer & sidebar states
  const [sidebar, setSidebar] = useState({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerTerm, setDrawerTerm] = useState("");

  const [mainContent, setMainContent] = useState("");
  const [previousPath, setPreviousPath] = useState("/");
  const [isLoading, setIsLoading] = useState(false);
  const [contentFinal, setContentFinal] = useState(undefined);
  const [pageTitle, setPageTitle] = useState("");
  const [subsections, setSubsections] = useState([]);

  const [drawerWidth, setDrawerWidth] = useState(() => {
    try {
      const savedWidth = localStorage.getItem("drawerWidth");
      return savedWidth ? parseInt(savedWidth) : 400;
    } catch {
      return 400;
    }
  });

  const [isResizing, setIsResizing] = useState(false);
  const resizeRef = useRef(null);
  const contentRef = useRef(null);

  // compute header once subsections are available to avoid '?' and race conditions
  const formattedTitle = useMemo(
    () => getFormattedTitle(sectionId, subsectionId, pageTitle, subsections),
    [sectionId, subsectionId, pageTitle, subsections]
  );

  // Helper function to generate cache key based on the section and subsection
  function getCacheKey(section, subsection = null) {
    return subsection ? `${section}/${subsection}` : section;
  }

  async function getCachedContent(section, subsection = null) {
    const cacheKey = getCacheKey(section, subsection);

    // if the content is already cached, then we just want to retrieve it
    if (cachedContent.current[cacheKey]) {
      return cachedContent.current[cacheKey];
    }

    // if the content has not been cached, cache it
    const result = await getContent(section, subsection);
    if (result) {
      cachedContent.current[cacheKey] = result;
    }

    return result;
  }

  function getSidebarContent(
    term,
    targetSectionId = sectionId,
    targetSubsectionId = subsectionId
  ) {
    if (sidebar && sidebar[term]) {
      return sidebar[term];
    }

    const cacheKey = getCacheKey(targetSectionId, targetSubsectionId);
    const storedContent = cachedContent.current[cacheKey];

    if (storedContent && storedContent.sidebar && storedContent.sidebar[term]) {
      return storedContent.sidebar[term];
    }

    return null;
  }

  // Store the current valid path whenever content loads successfully
  // --- Store valid previous path ---
  useEffect(() => {
    if (mainContent && !isLoading) setPreviousPath(location.pathname);
  }, [mainContent, location.pathname, isLoading]);

  /** Fetches and loads main markdown content based on current route params. */
  useEffect(() => {
    async function loadContent() {
      setIsLoading(true);

      if (!sectionId) {
        const sections = await getSections();
        if (sections.length > 0) navigate(`/${sections[0].id}`);
        setIsLoading(false);
        return;
      }

      // Load top-level section
      if (sectionId && !subsectionId) {
        const result = await getCachedContent(sectionId);

        if (result) {
          // Strip leading H1 and blank lines to avoid duplicate title below divider
          const raw = result.content || "";
          const cleaned = raw.replace(/^\s*#\s[^\n\r]+(\r?\n)+/, "");
          setMainContent(cleaned);
          setSidebar(result.sidebar || {});
          setContentFinal(result.frontmatter?.final);
          setPageTitle(result.frontmatter?.title || "");

          //  renamed local variable to avoid shadowing
          const subs = await getSubsections(sectionId);

          //  sanitize subsections to remove falsy/drawer entries
          const validSubs = (subs || [])
            .filter((s) => s && s.id && typeof s.id === "string")
            .filter((s) => !s.id.startsWith(".") && s.id.toLowerCase() !== "drawer")
            .map((s) => ({
              ...s,
              title:
                (s.title && String(s.title).trim()) ||
                String(s.id || "")
                  .replace(/[-_]/g, " ")
                  .replace(/\b\w/g, (m) => m.toUpperCase()),
            }))
            .sort(
              (a, b) =>
                (Number.isFinite(a.order) ? a.order : 999) -
                (Number.isFinite(b.order) ? b.order : 999)
            );

          setSubsections(validSubs);

          if (!result.content.trim() || result.content.trim().length < 50) {
            if (validSubs.length > 0) navigate(`/${sectionId}/${validSubs[0].id}`);
          }
        } else {
          toast({
            title: "Section Not Found",
            description: `The section "${sectionId}" could not be found.`,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom-right",
          });

          // Navigate back to the previous valid path instead of changing the URL
          navigate(previousPath, { replace: true });
        }
        setIsLoading(false);
        return;
      }

      // Load subsection
      if (sectionId && subsectionId) {
        const result = await getCachedContent(sectionId, subsectionId);
        if (result) {
          // Strip leading H1 and blank lines to avoid duplicate title below divider
          const raw = result.content || "";
          const cleaned = raw.replace(/^\s*#\s[^\n\r]+(\r?\n)+/, "");
          setMainContent(cleaned);
          setSidebar(result.sidebar || {});
          setContentFinal(result.frontmatter?.final);
          setPageTitle(result.frontmatter?.title || "");
        } else {
          toast({
            title: "Subsection Not Found",
            description: `The subsection "${subsectionId}" in section "${sectionId}" could not be found.`,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom-right",
          });
          navigate(previousPath, { replace: true });
        }
      }
      setIsLoading(false);
    }

    loadContent();
  }, [sectionId, subsectionId, navigate, toast, previousPath]);

  /** Loads and stores the ordered list of subsections for the current section. */
  useEffect(() => {
    if (!sectionId) return;
    let active = true;
    getSubsections(sectionId)
      .then((data) => {
        if (!active) return;
        const validSubs = (data || [])
          .filter((s) => s && s.id && typeof s.id === "string")
          .filter((s) => !s.id.startsWith(".") && s.id.toLowerCase() !== "drawer")
          .map((s) => ({
            ...s,
            title:
              (s.title && String(s.title).trim()) ||
              String(s.id || "")
                .replace(/[-_]/g, " ")
                .replace(/\b\w/g, (m) => m.toUpperCase()),
          }))
          .sort(
            (a, b) =>
              (Number.isFinite(a.order) ? a.order : 999) -
              (Number.isFinite(b.order) ? b.order : 999)
          );
        setSubsections(validSubs);
      })
      .catch((err) => console.error("Failed to load subsections:", err));
    return () => {
      active = false;
    };
  }, [sectionId]);

  /** Reacts when a URL drawer term is provided. */
  useEffect(() => {
    if (!urlTerm) return;

    const sidebarEntry = getSidebarContent(urlTerm);

    if (sidebarEntry) {
    if (urlTerm && sidebar && sidebar[urlTerm]) {
      setDrawerTerm(urlTerm);
      setDrawerContent(
        typeof sidebarEntry === "string"
          ? sidebarEntry
          : sidebarEntry.content || " "
      );
      setIsDrawerOpen(true);
    }
  }
  }, [urlTerm, sidebar]);

  // --- Utility navigation check ---
  const checkAndNavigate = useCallback(
    async (path) => {
      if (isLoading) return;
      const pathParts = path.split("/").filter(Boolean);
      const targetSectionId = pathParts[0];
      const targetSubsectionId = pathParts[1] || null;

      try {
        let contentExists = false;

        if (targetSubsectionId && targetTerm) {
          const result = await getCachedContent(
            targetSectionId,
            targetSubsectionId
          );
          if (result && result.sidebar && result.sidebar[targetTerm]) {
            contentExists = true;
            handleDrawerOpen(targetTerm);
          }
        } else if (targetSubsectionId) {
          // Check if the section and subsection exist
          const result = await getCachedContent(
            targetSectionId,
            targetSubsectionId
          );
          contentExists = result !== null;
        } else {
          // Check if just the section exists
          const result = await getCachedContent(targetSectionId);
          contentExists = result !== null;
        }

        if (contentExists) navigate(`/${path}`);
        else {
          toast({
            title: targetSubsectionId ? "Subsection Not Found" : "Section Not Found",
            description: targetSubsectionId
              ? `The subsection "${targetSubsectionId}" in section "${targetSectionId}" could not be found.`
              : `The section "${targetSectionId}" could not be found.`,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom-right",
          });
        }
      } catch (error) {
        console.error("Error checking content:", error);
        toast({
          title: "Navigation Error",
          description: "An error occurred while trying to navigate.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-right",
        });
      }
    },
    [isLoading, navigate, toast]
  );

  // Handle clicking drawer links
  function handleDrawerOpen(term) {
    // Load drawer content for the current section/subsection
    setDrawerTerm(term);

    if (!sidebar) {
      console.warn("Sidebar not loaded yet");
      return;
    }

    const sidebarContent = sidebar[term];
    if (sidebarContent) {
      setDrawerTerm(urlTerm);
      setDrawerContent(sidebarContent);
      setIsDrawerOpen(true);

      navigate(`/${sectionId}/${subsectionId}/${term}`);
    } else {
      toast({
        title: "Sidebar Entry Not Found",
        description: `The sidebar entry "${term}" could not be found in this subsection.`,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
    }
  }

  function handleNavigation(targetId) {
    closeRightDrawer();
    if (targetId.includes("/")) {
      checkAndNavigate(targetId);
    } else {
      if (sectionId && !subsectionId) {
        checkAndNavigate(`${sectionId}/${targetId}`);
      } else {
        checkAndNavigate(targetId);
      }
    }
  }

  /** Auto scrolls to anchors or top on content load. */
  useEffect(() => {
    if (!mainContent) return;
    const timer = setTimeout(() => {
      if (location.hash) {
        const id = location.hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo(0, 0);
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [mainContent, location.hash]);

  /** Main render */
  return (
    <div className="markdown-page">
      {mainContent && (
        <Box mb={10}>
          <Box mb={6}>
            <Text fontSize="2xl" fontWeight="semibold" color="#4F3629" mb={2}>
              {formattedTitle}
            </Text>
            <Divider borderColor="#4F3629" borderWidth="1.5px" mb={8} />
          </Box>

          <Box ref={contentRef}>
            <MarkdownRenderer
              content={mainContent}
              sidebar={sidebar}
              sectionId={sectionId}
              subsectionId={subsectionId}
              onDrawerOpen={handleDrawerOpen}
              onNavigation={handleNavigation}
              isFinal={contentFinal}
              highlight={highlight}
            />
          </Box>
        </Box>
      )}

      {/* Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        placement="right"
        onClose={() => {
          setIsDrawerOpen(false);
          navigate(`/${sectionId}/${subsectionId}`, { replace: true });
        }}
        blockScrollOnMount={false}
        trapFocus={false}
      >
        {/* Added overlay for accessibility / UX */}
        <DrawerOverlay />
        <DrawerContent
          sx={{ width: `${drawerWidth}px !important` }}
          maxWidth="80vw"
          position="relative"
        >
          <DrawerCloseButton />
          <DrawerHeader
            borderBottomWidth="2px"
            color="var(--color-accent)"
            borderColor="var(--color-accent)"
          >
            {sidebar[drawerTerm]?.heading || drawerTerm}
          </DrawerHeader>
          <DrawerBody>
            <MarkdownRenderer
              content={drawerContent}
              onDrawerOpen={handleDrawerOpen}
              onNavigation={handleNavigation}
              highlight={highlight}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default MarkdownPage;
