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
  Input,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { parseSubsections } from "../util/MarkdownRenderer";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  getSections,
  getSubsections,
  getContent,
} from "../util/MarkdownRenderer";
import { initializeIndex, search } from "../util/SearchEngine";

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

const NavBar = () => {
  const location = useLocation();
  const currPath = location.pathname;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  const navigate = useNavigate();
  const currentPath = location.pathname;
  const pathParts = currentPath.split("/").filter(Boolean);

  const currentSectionId = pathParts[0] || "";
  const currentSubsectionId = pathParts[1] || "";
  const currentHeadingId = location.hash?.substring(1) || "";

  const [sections, setSections] = useState([]);
  const [subsections, setSubsections] = useState({});
  const [contentHeadings, setContentHeadings] = useState({});
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
      borderRight="1px solid #eee"
      bg="#fff"
      overflowY="auto"
      p={4}
      zIndex={10}
    >
      <NavContent />
    </Box>
  );
};

export default NavBar;
