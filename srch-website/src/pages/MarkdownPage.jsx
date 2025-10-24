import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerContent,
  DrawerCloseButton,
  useMediaQuery,
  useToast,
  Box,
} from "@chakra-ui/react";
import MarkdownRenderer, {
  getSections,
  getContent,
  getSubsections,
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
  const { sectionId, subsectionId, term: urlTerm } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  // State for content
  const [mainContent, setMainContent] = useState("");
  const [drawerContent, setDrawerContent] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [previousPath, setPreviousPath] = useState("/");
  const [isLoading, setIsLoading] = useState(false);
  const [sidebar, setSidebar] = useState({});
  const [drawerTerm, setDrawerTerm] = useState("");
  const [contentFinal, setContentFinal] = useState(undefined);

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
    if (mainContent && !isLoading) {
      setPreviousPath(location.pathname);
    }
  }, [mainContent, location.pathname, isLoading]);

  // Load content based on URL parameters
  useEffect(() => {
    async function loadContent() {
      setIsLoading(true);

      // If no section specified, load the main index or redirect to first section
      if (!sectionId) {
        const sections = await getSections();
        if (sections.length > 0) {
          navigate(`/${sections[0].id}`);
        }
        setIsLoading(false);
        return;
      }

      // If section but no subsection specified
      if (sectionId && !subsectionId) {
        const result = await getContent(sectionId);

        if (result) {
          setMainContent(result.content);
          setSidebar(result.sidebar || {});
          setContentFinal(result.frontmatter?.final);

          // Preload subsections in case we need them
          const subsections = await getSubsections(sectionId);

          // If no specific section content or it's very minimal, redirect to first subsection
          if (!result.content.trim() || result.content.trim().length < 50) {
            if (subsections.length > 0) {
              navigate(`/${sectionId}/${subsections[0].id}`);
            }
          }
        } else {
          // If section not found, show toast error and stay on the current page
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

      // If both section and subsection specified
      if (sectionId && subsectionId) {
        const result = await getContent(sectionId, subsectionId);
        if (result) {
          setMainContent(result.content);
          setSidebar(result.sidebar || {});
          setContentFinal(result.frontmatter?.final);
        } else {
          // If subsection not found, show toast error and stay on the current page
          toast({
            title: "Subsection Not Found",
            description: `The subsection "${subsectionId}" in section "${sectionId}" could not be found.`,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom-right",
          });

          // Navigate back to the previous valid path instead of changing the URL
          navigate(previousPath, { replace: true });
        }
      }
      setIsLoading(false);
    }

    loadContent();
  }, [sectionId, subsectionId, navigate, toast, previousPath]);

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
      // Don't do anything if we're already loading content
      if (isLoading) return;

      // Parse the path
      const pathParts = path.split("/").filter(Boolean);
      const targetSectionId = pathParts[0];
      const targetSubsectionId = pathParts[1] || null;
      const targetTerm = pathParts[2] || null;

      // Check if the content exists before navigating
      try {
        let contentExists = false;

        if (targetSubsectionId && targetTerm) {
          const result = await getContent(targetSectionId, targetSubsectionId);
          if (result && result.sidebar && result.sidebar[targetTerm]) {
            contentExists = true;
            handleDrawerOpen(targetTerm);
          }
        } 
        else if (targetSubsectionId) {
          // Check if the section and subsection exist
          const result = await getContent(targetSectionId, targetSubsectionId);
          contentExists = result !== null;
        } else {
          // Check if just the section exists
          const result = await getContent(targetSectionId);
          contentExists = result !== null;
        }

        if (contentExists) {
          // Content exists, navigate to it
          navigate(`/${path}`);
        } else {
          // Content doesn't exist, show error
          let errorTitle, errorDescription;

          if (targetSubsectionId && targetTerm) {
            errorTitle = `Sidebar Entry Not Found`;
            errorDescription = `The sidebar entry "${targetTerm}" in subsection "${targetSubsectionId}" not found.`;
          } else if (targetSubsectionId && !targetTerm) {
            errorTitle = "Subsection Not Found";
            errorDescription = `The subsection "${targetSubsectionId}" in section "${targetSectionId}" could not be found.`;
          } else {
            errorTitle = "Section Not Found";
            errorDescription = `The section "${targetSectionId}" could not be found.`;
          }

          toast({
            title: errorTitle,
            description: errorDescription,
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

    const content = sidebar[term];
    if (content) {
      setDrawerContent(content);
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

  // Handle clicking navigation links
  function handleNavigation(targetId) {
    // Close drawer if open
    setIsDrawerOpen(false);

    // Check if this is a path with section/subsection or just a section
    if (targetId.includes("/")) {
      // Full path format: "section/subsection"
      checkAndNavigate(targetId);
    } else {
      // Simple path - could be a subsection in current section or a different section

      // If we're already in a section, assume it's a subsection of current section
      if (sectionId && !subsectionId) {
        checkAndNavigate(`${sectionId}/${targetId}`);
      } else {
        // Otherwise treat it as a section
        checkAndNavigate(targetId);
      }
    }
  }

  // Handle hash links (anchor scrolling)
  useEffect(() => {
    if (!mainContent) return; // Don't try to scroll if content isn't loaded

    // Use a timeout to ensure DOM has updated with the new content
    const timer = setTimeout(() => {
      // Get hash from the location object (more reliable than window.location)
      if (location.hash) {
        // Remove the # symbol
        const id = location.hash.replace("#", "");

        // Find element and scroll to it
        const element = document.getElementById(id);
        if (element) {
          // Scroll with a slight delay to ensure rendering is complete
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // If no hash, scroll to top
        window.scrollTo(0, 0);
      }
    }, 200); // Slightly longer timeout to ensure content is rendered

    return () => clearTimeout(timer);
  }, [mainContent, location.hash]); // Respond to both content changes and hash changes

  // Handle drawer resize functionality
  const handleMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);

    // Record initial mouse position and drawer width
    resizeRef.current = {
      startX: e.clientX,
      startWidth: drawerWidth,
    };

    // Add cursor styling to entire document during resize
    document.body.style.cursor = "ew-resize";
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing || !resizeRef.current) return;

      // Calculate new width based on mouse movement
      // For a right drawer, dragging left (negative delta) should increase width
      const deltaX = e.clientX - resizeRef.current.startX;
      // Since the drawer is on the right, moving mouse left (negative deltaX) makes drawer wider
      const newWidth = Math.max(
        300,
        Math.min(800, resizeRef.current.startWidth - deltaX)
      );

      setDrawerWidth(newWidth);
    };

    const handleMouseUp = () => {
      if (isResizing) {
        setIsResizing(false);
        document.body.style.cursor = "";

        // Save width to localStorage when done resizing
        try {
          localStorage.setItem("drawerWidth", drawerWidth.toString());
        } catch (error) {
          console.error("Error saving to localStorage:", error);
        }
      }
    };

    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
    };
  }, [isResizing, drawerWidth]);

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
    <div style={{ padding: "20px", marginLeft: isMobile ? "0" : "250px" }}>
      {/* Main content */}
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
          <DrawerHeader borderBottomWidth="1px">
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
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default MarkdownPage;
