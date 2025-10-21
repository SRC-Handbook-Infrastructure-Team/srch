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
  Input,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { parseSubsections } from "../util/MarkdownRenderer";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  getSections,
  getSubsections,
  // parseSubsections,
  getContent,
} from "../util/MarkdownRenderer";

// Beta Tag Component
const BetaTag = () => (
  <Box
    display="inline-flex"
    alignItems="center"
    justifyContent="center"
    bg="blue.100"
    color="blue.700"
    fontWeight="bold"
    fontSize="xs"
    px={2}
    py={0.5}
    borderRadius="md"
    ml={2}
    verticalAlign="middle"
  >
    BETA
  </Box>
);

const ContentsSidebar = () => {
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  const navigate = useNavigate();
  const currentPath = location.pathname;
  const pathParts = currentPath.split("/").filter(Boolean);

  // Current section and subsection IDs from URL
  const currentSectionId = pathParts[0] || "";
  const currentSubsectionId = pathParts[1] || "";

  // State
  const [sections, setSections] = useState([]);
  const [subsections, setSubsections] = useState({});
  const [contentHeadings, setContentHeadings] = useState({});
  const [expandedSections, setExpandedSections] = useState({});
  const [hasFetchedData, setHasFetchedData] = useState(false);

  // Load all sections and their metadata
  useEffect(() => {
    async function loadAllData() {
      try {
        // Load all sections
        const sectionsData = await getSections();

        // Sort sections by order
        const sortedSections = [...sectionsData].sort(
          (a, b) => a.order - b.order
        );
        setSections(sortedSections);

        // Preload all subsections and determine which sections have them
        const subsectionsMap = {};
        const expandStateMap = {};

        for (const section of sortedSections) {
          const sectionSubsections = await getSubsections(section.id);

          if (sectionSubsections.length > 0) {
            // Store sorted subsections
            subsectionsMap[section.id] = sectionSubsections.sort(
              (a, b) => a.order - b.order
            );

            // If this is the current section, expand it
            if (section.id === currentSectionId) {
              expandStateMap[section.id] = true;
            }
          }
        }

        setSubsections(subsectionsMap);
        setExpandedSections(expandStateMap);

        // If we're on the root path, navigate to the first section
        if (!currentSectionId && sortedSections.length > 0 && !hasFetchedData) {
          navigate(`/${sortedSections[0].id}`);
        }

        // If we're viewing a subsection, load its content headings
        if (currentSectionId && currentSubsectionId) {
          const result = await getContent(
            currentSectionId,
            currentSubsectionId
          );
          if (result && result.content) {
            const headings = parseSubsections(result.content);
            setContentHeadings({
              [`${currentSectionId}/${currentSubsectionId}`]: headings,
            });
          }
        }

        setHasFetchedData(true);
      } catch (error) {
        console.error("Error loading navigation data:", error);
      }
    }

    loadAllData();
  }, [currentSectionId, currentSubsectionId, navigate, hasFetchedData]);

  // Auto-redirect from main section to first subsection
  useEffect(() => {
    if (currentSectionId && !currentSubsectionId) {
      const sectionSubsections = subsections[currentSectionId];
      if (sectionSubsections && sectionSubsections.length > 0) {
        navigate(`/${currentSectionId}/${sectionSubsections[0].id}`);
      }
    }
  }, [currentSectionId, currentSubsectionId, subsections, navigate]);

  // Handle expanding/collapsing a section
  const toggleSection = (sectionId, event) => {
    // Only handle the expand/collapse icon click
    if (event.target.tagName === "svg" || event.target.closest("svg")) {
      event.preventDefault();
      setExpandedSections((prev) => ({
        ...prev,
        [sectionId]: !prev[sectionId],
      }));
    }
  };

  // Handle smooth scrolling for headings
  const scrollToHeading = (headingId, e) => {
    e.preventDefault();
    const element = document.getElementById(headingId);
    if (element) {
      // Update URL without navigation
      window.history.pushState(
        null,
        "",
        `/srch-s25/${currentSectionId}/${currentSubsectionId}#${headingId}`
      );
      // Scroll smoothly
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Navigation content with BETA tags
  const NavContent = () => {

    return (
      <VStack align="stretch" justifySelf="" spacing={2}>
        <Link to="/">
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            SRC Handbook
          </Text>
        </Link>
        {/* Full sections navigation always visible */}
        {sections.map((section) => {
          const hasSubsections = subsections[section.id]?.length > 0;
          const isExpanded = expandedSections[section.id];
          const isActive = currentSectionId === section.id;

          return (
            <Box key={section.id} mb={2}>
              {/* Section header */}
              <Box
                p={2}
                borderRadius="md"
                bg={
                  isActive && !currentSubsectionId ? "gray.100" : "transparent"
                }
                cursor="pointer"
                onClick={(e) => {
                  // When clicking on section header, navigate to first subsection
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
                  <Text fontWeight="medium">{section.title}</Text>
                  {section.final === false && <BetaTag />}
                </Box>
                {/* Only show expand/collapse icon if section has subsections */}
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
              {/* Subsections */}
              {isExpanded && hasSubsections && (
                <VStack align="stretch" pl={4} mt={1} spacing={0}>
                  {subsections[section.id].map((subsection) => {
                    const isSubsectionActive =
                      isActive && currentSubsectionId === subsection.id;
                    const contentKey = `${section.id}/${subsection.id}`;
                    const hasHeadings = contentHeadings[contentKey]?.length > 0;

                    return (
                      <Box key={subsection.id}>
                        <Link to={`/${section.id}/${subsection.id}`}>
                          <Box display="flex" alignItems="center">
                            <Text
                              fontSize="sm"
                              p={1}
                              fontWeight={
                                isSubsectionActive ? "bold" : "normal"
                              }
                              color={
                                isSubsectionActive ? "blue.500" : "inherit"
                              }
                            >
                              {subsection.title}
                            </Text>
                            {subsection.final === false && <BetaTag />}
                          </Box>
                        </Link>
                        {/* Content headings - COMMENTED OUT TO HIDE SUBSECTION HEADINGS */}
                        {/* {isSubsectionActive && hasHeadings && (
                        <VStack align="stretch" pl={4} mt={1} spacing={0}>
                          {contentHeadings[contentKey].map((heading) => (
                            <Link
                              key={heading.id}
                              to={`/${section.id}/${subsection.id}#${heading.id}`}
                              onClick={(e) => scrollToHeading(heading.id, e)}
                            >
                              <Text
                                fontSize="xs"
                                p={1}
                                fontWeight={
                                  currentHeadingId === heading.id
                                    ? "bold"
                                    : "normal"
                                }
                                color={
                                  currentHeadingId === heading.id
                                    ? "blue.500"
                                    : "gray.600"
                                }
                              >
                                {heading.title}
                              </Text>
                            </Link>
                          ))}
                        </VStack>
                      )} */}
                      </Box>
                    );
                  })}
                </VStack>
              )}
            </Box>
          );
        })}

        <Box mb={2}>
          {/* TODO: only make the sub menus show if it is selected*/}
          <Link to="/acknowledgements">
            <Text p={2}>Acknowledgements</Text>
          </Link>
          {currentPath.includes("acknowledgements") && (
            <VStack align="stretch" pl={4} mt={1} spacing={0}>
              <Link to="/acknowledgements/leadership">
                <Text fontSize="sm" p={1}>
                  Leadership Team
                </Text>
              </Link>
              <Link to="/acknowledgements/ai">
                <Text fontSize="sm" p={1}>
                  AI Team
                </Text>
              </Link>
              <Link to="/acknowledgements/privacy">
                <Text fontSize="sm" p={1}>
                  Privacy Team
                </Text>
              </Link>
              <Link to="/acknowledgements/accessibility">
                <Text fontSize="sm" p={1}>
                  Accessibility Team
                </Text>
              </Link>
              <Link to="/acknowledgements/product">
                <Text fontSize="sm" p={1}>
                  Product Team
                </Text>
              </Link>
              <Link to="/acknowledgements/additional">
                <Text fontSize="sm" p={1}>
                  Additional Contributors
                </Text>
              </Link>
            </VStack>
          )}
        </Box>
      </VStack>
    );
  };

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

  return (
    <Box
      position="fixed"
      left={0}
      top={0}
      width="250px"
      height="100vh"
      borderRight="1px solid"
      borderColor="gray.200"
      bg="white"
      overflowY="auto"
      p={4}
      zIndex={10}
    >
      <NavContent />
    </Box>
  );
};

export default ContentsSidebar;
