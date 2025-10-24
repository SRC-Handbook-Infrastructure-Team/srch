import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  useToast,
  Box,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerContent,
  DrawerCloseButton,
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
 * - Subsection letters come from a small slug→letter map.
 * - Prefer frontmatter `title` (pageTitle) when present; otherwise prettify the slug.
 *
 * @param {string} sectionId - URL slug for the section (e.g., "privacy")
 * @param {string} subsectionId - URL slug for the subsection (e.g., "what-is-privacy")
 * @param {string} pageTitle - Optional human title from markdown frontmatter
 * @returns {string} The formatted header like "1.a - What is Privacy?"
 */
function getFormattedTitle(sectionId, subsectionId, pageTitle) {
  const sectionMap = {
    privacy: "1",
    accessibility: "2",
    "automated-decision-making": "3",
    "generative-ai": "4",
  };

  const subsectionLetters = {
    "what-is-privacy": "a",
    "value-of-privacy": "b",
    "what-is-accessibility": "a",
  };

  const sectionNum = sectionMap[sectionId] || "?";
  const letter = subsectionLetters[subsectionId] || "";

  const titleText = pageTitle && pageTitle.trim()
    ? pageTitle.trim()
    : (subsectionId || sectionId || "")
        .replace(/-/g, " ")
        .replace(/\b\w/g, (m) => m.toUpperCase());

  return `${sectionNum}${letter ? `.${letter}` : ""} - ${titleText}`;
}

function MarkdownPage() {
  const { sectionId, subsectionId, term: urlTerm } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  const cachedContent = useRef({}); // used to store content to prevent multiple getContent calls

  // State for content
  const [mainContent, setMainContent] = useState("");
  const [drawerContent, setDrawerContent] = useState("");
  const { openRightDrawer, closeRightDrawer } = useLayout();

  // 🧩 Drawer & sidebar states
  const [sidebar, setSidebar] = useState({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerTerm, setDrawerTerm] = useState("");
  const [drawerContent, setDrawerContent] = useState("");

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
          const cleaned = result.content.replace(/^# .*\n+/, "");
          setMainContent(cleaned);
          setSidebar(result.sidebar || {});
          setContentFinal(result.frontmatter?.final);
          setPageTitle(result.frontmatter?.title || "");

          const subsections = await getSubsections(sectionId);
          if (!result.content.trim() || result.content.trim().length < 50) {
            if (subsections.length > 0) navigate(`/${sectionId}/${subsections[0].id}`);
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
          const cleaned = result.content.replace(/^# .*\n+/, "");
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
        if (active) setSubsections(data);
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
              {getFormattedTitle(sectionId, subsectionId, pageTitle)}
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
        <DrawerContent sx={{ width: `${drawerWidth}px !important` }} maxWidth="80vw" position="relative">
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="2px" color="var(--color-accent)" borderColor="var(--color-accent)">
            {sidebar[drawerTerm]?.heading || drawerTerm}
          </DrawerHeader>
          <DrawerBody>
            <MarkdownRenderer
              content={drawerContent}
              onDrawerOpen={handleDrawerOpen}
              onNavigation={handleNavigation}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default MarkdownPage;
