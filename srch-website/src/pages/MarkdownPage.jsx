import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useToast, Box } from "@chakra-ui/react";
import MarkdownRenderer, {
  getSections,
  getDrawerFile,
  getContent,
  getSubsections,
} from "../util/MarkdownRenderer";
import { useLayout } from "../layouts/LayoutContext";

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

  /** Track previous route so we can safely navigate back on missing content. */
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
        if (result) {
          setMainContent(result.content);
          setContentFinal(result.frontmatter?.final);

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
          setMainContent(result.content);
          setContentFinal(result.frontmatter?.final);
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
   * Checks whether a given section/subsection path exists before navigating.
   * Prevents broken links and provides user feedback if content is missing.
   */
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
        <MarkdownRenderer
          content={mainContent}
          onDrawerOpen={handleDrawerOpen}
          onNavigation={handleNavigation}
          isFinal={contentFinal}
        />
      )}
    </div>
  );
}

export default MarkdownPage;
