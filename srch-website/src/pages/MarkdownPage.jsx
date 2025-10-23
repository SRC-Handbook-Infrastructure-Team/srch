import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useToast, Box } from "@chakra-ui/react";
import MarkdownRenderer, {
  getSections,
  getDrawerFile,
  getContent,
  getSubsections,
} from "../util/MarkdownRenderer";
import { BsSignIntersectionSideFill } from "react-icons/bs";
import { Divider, Text } from "@chakra-ui/react"; // already imported, just confirming

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
  // Product-specified numbering
  const sectionMap = {
    privacy: "1",
    accessibility: "2",
    "automated-decision-making": "3",
    "generative-ai": "4",
    // (About intentionally omitted from the numbered sequence)
  };

  // Known subsection letters (add to this as you add new subsections)
  const subsectionLetters = {
    // Privacy
    "what-is-privacy": "a",
    "value-of-privacy": "b",
    // Accessibility
    "what-is-accessibility": "a",
  };

  const sectionNum = sectionMap[sectionId] || "?";
  const letter = subsectionLetters[subsectionId] || "";

  // Prefer frontmatter title if available
  const titleText = pageTitle && pageTitle.trim()
    ? pageTitle.trim()
    : (subsectionId || sectionId || "")
        .replace(/-/g, " ")
        .replace(/\b\w/g, (m) => m.toUpperCase());

  return `${sectionNum}${letter ? `.${letter}` : ""} - ${titleText}`;
}




function MarkdownPage() {
  const { sectionId, subsectionId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const { openRightDrawer, closeRightDrawer } = useLayout();

  const [mainContent, setMainContent] = useState("");
  const [previousPath, setPreviousPath] = useState("/");
  const [isLoading, setIsLoading] = useState(false);
  const [contentFinal, setContentFinal] = useState(undefined);
  const [pageTitle, setPageTitle] = useState("");
  const [subsections, setSubsections] = useState([]);



  // Drawer resize state
  const [drawerWidth, setDrawerWidth] = useState(() => {
    try {
      const savedWidth = localStorage.getItem("drawerWidth");
      return savedWidth ? parseInt(savedWidth) : 400; // Default width if not found
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return 400; // Default width on error
    }
  });
  const [isResizing, setIsResizing] = useState(false);
  const resizeRef = useRef(null);

  // Store the current valid path whenever content loads successfully
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
        const result = await getContent(sectionId);
        setPageTitle(result.frontmatter?.title || "");


        if (result) {
          const cleaned = result.content.replace(/^# .*\n+/, "");
          setMainContent(cleaned);
          setSidebar(result.sidebar || {});
          setContentFinal(result.frontmatter?.final);
          setPageTitle(result.frontmatter?.title || "");


          // Redirect to first subsection if section content is minimal
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
          navigate(previousPath, { replace: true });
        }
        setIsLoading(false);
        return;
      }

      // Load subsection content
      if (sectionId && subsectionId) {
        const result = await getContent(sectionId, subsectionId);
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

    /**
   * Loads and stores the ordered list of subsections for the current section.
   *
   * This effect runs whenever `sectionId` changes.
   * It fetches all subsections via `getSubsections(sectionId)` and updates local state.
   *
   * Why:
   *  - Needed to determine the subsection letter ("a", "b", "c", etc.)
   *    for formatted page headers like "1.a - What is Privacy?"
   *  - Enables consistent numbering even if user navigates directly
   *    to a subsection route or between sections.
   *
   * Notes:
   *  - Uses an `active` flag to prevent stale state updates if the user
   *    navigates quickly between sections (avoids race conditions).
   *  - `getSubsections()` already sorts by `order` and defaults to `999` for missing order values.
   */
  useEffect(() => {
    if (!sectionId) return; // No section selected yet

    let active = true; // Guard against async race condition

    getSubsections(sectionId)
      .then((data) => {
        if (active) {
          setSubsections(data);
        }
      })
      .catch((err) => {
        console.error("Failed to load subsections for section:", sectionId, err);
      });

    // Cleanup: mark inactive if component unmounts or section changes
    return () => {
      active = false;
    };
  }, [sectionId]);


  useEffect(() => {
    if (sidebar && sidebar[urlTerm]) {
      setDrawerTerm(urlTerm);
      setDrawerContent(sidebar[urlTerm].content);
      setIsDrawerOpen(true);
    }
  }, [urlTerm, sidebar]);

  // Pre-check if content exists before navigating
  const checkAndNavigate = useCallback(
    async (path) => {
      if (isLoading) return;
      const pathParts = path.split("/").filter(Boolean);
      const targetSectionId = pathParts[0];
      const targetSubsectionId = pathParts[1] || null;

      try {
        let contentExists = false;

        if (targetSubsectionId) {
          const result = await getContent(targetSectionId, targetSubsectionId);
          contentExists = result !== null;
        } else {
          const result = await getContent(targetSectionId);
          contentExists = result !== null;
        }

        if (contentExists) {
          navigate(`/${path}`);
        } else {
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

  /**
   * Opens the right-hand drawer and displays its markdown content.
   * Includes its own scrollable container to handle long content.
   */
  function handleDrawerOpen(targetId) {
    if (sectionId && subsectionId) {
      getDrawerFile(sectionId, subsectionId, targetId).then((result) => {
        if (result) {
          openRightDrawer(
            <Box
              height="100%"
              maxH="100vh"
              overflowY="auto"
              p={4}
              flex="1"
              sx={{
                display: "flex",
                flexDirection: "column",
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(0,0,0,0.3) transparent",
              }}
            >
              <MarkdownRenderer
                content={result.content}
                onDrawerOpen={handleDrawerOpen}
                onNavigation={handleNavigation}
              />
            </Box>
          );
        } else {
          toast({
            title: "Drawer Content Not Found",
            description: `The drawer content "${targetId}" could not be found in /src/markdown/${sectionId}/${subsectionId}/drawer/.`,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom-right",
          });
        }
      });
    }
  }

  /**
   * Handles internal navigation links (nav-link) and closes drawer when moving between sections.
   */
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

  /** Automatically scrolls to hash anchors or top when new content loads. */
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

  /** Main page render: displays the markdown for the current section/subsection. */
  return (
    <div className="markdown-page">
      {mainContent && (
        <Box mb={10}>
          {/* PAGE HEADER */}
          <Box mb={6}>
            <Text
              fontSize="2xl"
              fontWeight="semibold"
              color="#4F3629"
              mv={3}
              mb={2}
          >
            {getFormattedTitle(sectionId, subsectionId, pageTitle)}

          </Text>
          <Divider borderColor="#4F3629" borderWidth="1.5px" mb={8} />
        </Box>

        {/* MAIN CONTENT */}
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


      {/* Drawer for additional content */}
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

          {/* Resize handle */}
          <Box
            position="absolute"
            left="0"
            top="0"
            bottom="0"
            width="6px"
            cursor="ew-resize"
            bgColor={isResizing ? "blue.400" : "transparent"}
            _hover={{ bgColor: "blue.200" }}
            onMouseDown={handleMouseDown}
            zIndex="999"
          />

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
