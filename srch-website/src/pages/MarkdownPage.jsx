import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import MarkdownRenderer, {
  getSections,
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
  const [sidebar, setSidebar] = useState({});
  const [drawerTerm, setDrawerTerm] = useState("");
  const [contentFinal, setContentFinal] = useState(undefined);

  useEffect(() => {
    if (mainContent && !isLoading) setPreviousPath(location.pathname);
  }, [mainContent, location.pathname, isLoading]);

  useEffect(() => {
    async function loadContent() {
      setIsLoading(true);

      if (!sectionId) {
        const sections = await getSections();
        if (sections.length > 0) navigate(`/${sections[0].id}`);
        setIsLoading(false);
        return;
      }

      if (sectionId && !subsectionId) {
        const result = await getContent(sectionId);
        if (result) {
          setMainContent(result.content);
          setSidebar(result.sidebar || {});
          setContentFinal(result.frontmatter?.final);

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

      if (sectionId && subsectionId) {
        const result = await getContent(sectionId, subsectionId);
        if (result) {
          setMainContent(result.content);
          setSidebar(result.sidebar || {});
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

  const checkAndNavigate = useCallback(
    async (path) => {
      if (isLoading) return;
      const pathParts = path.split("/").filter(Boolean);

      const targetSectionId = pathParts[0];
      const targetSubsectionId = pathParts[1] || null;
      const targetTerm = pathParts[2] || null;

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

  function handleDrawerOpen(targetId) {
    if (sectionId && subsectionId) {
      getDrawerFile(sectionId, subsectionId, targetId).then((result) => {
        if (result) {
          openRightDrawer(
            <MarkdownRenderer
              content={result.content}
              onDrawerOpen={handleDrawerOpen}
              onNavigation={handleNavigation}
            />
          );
        } else {
          toast({
            title: "Drawer Content Not Found",
            description: `The drawer content "${targetId}" could not be found.`,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom-right",
          });
        }
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

  // highlight search results
  useEffect(() => {
    if (highlight && contentRef.current) {
      const regex = new RegExp(`(${highlight})`, "gi");
      const originalHTML = contentRef.current.innerHTML;
      contentRef.current.innerHTML = originalHTML.replace(
        regex,
        "<mark>$1</mark>"
      );
      const firstMark = contentRef.current.querySelector("mark");
      if (firstMark)
        firstMark.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [highlight, mainContent]);

  // retrieves sidebar content based on title
  useEffect(() => {
    if (!urlTerm || !sidebar || Object.keys(sidebar).length === 0) return;
    const entry = sidebar[urlTerm];
    if (entry) {
      setDrawerTerm(urlTerm);
      setDrawerContent(typeof entry === "string" ? entry : entry.content || "");
      setIsDrawerOpen(true);
    } else {
      console.warn(`No sidebar entry found for ${urlTerm}`);
    }
  }, [urlTerm, sidebar]);

  return (
    <div className="markdown-page">
      {mainContent && (
        <MarkdownRenderer
          content={mainContent}
          sidebar={sidebar}
          sectionId={sectionId}
          subsectionId={subsectionId}
          onDrawerOpen={handleDrawerOpen}
          onNavigation={handleNavigation}
          isFinal={contentFinal}
        />
      )}
    </div>
  );
}

export default MarkdownPage;
