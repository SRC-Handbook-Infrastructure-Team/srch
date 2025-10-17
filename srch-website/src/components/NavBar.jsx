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
import { GiHamburgerMenu } from "react-icons/gi";
import { getSections, getSubsections, getContent } 
  from "../util/MarkdownRenderer";
import { useLayout } from "../layouts/LayoutContext";

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

function NavBar() {
  const [showButton, setShowButton] = useState(false);
  const { leftSidebar } = useLayout() || {};
  const {
    width: leftWidth = 250,
    collapsed = false,
    startResize = () => {},
    handleKeyDown = () => {},
    isResizing = false,
  } = leftSidebar || {};

  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const pathParts = currentPath.split("/").filter(Boolean);
  const currentSectionId = pathParts[0] || "";
  const currentSubsectionId = pathParts[1] || "";

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  const [sections, setSections] = useState([]);
  const [subsections, setSubsections] = useState({});
  const [expandedSections, setExpandedSections] = useState({});
  const [hasFetchedData, setHasFetchedData] = useState(false);

  useEffect(() => {
    async function loadAllData() {
      try {
        const sectionsData = await getSections();
        const sortedSections = [...sectionsData].sort((a, b) => a.order - b.order);
        setSections(sortedSections);

        const subsectionsMap = {};
        const expandStateMap = {};

        for (const section of sortedSections) {
          const sectionSubsections = await getSubsections(section.id);
          if (sectionSubsections.length > 0) {
            subsectionsMap[section.id] = sectionSubsections.sort((a, b) => a.order - b.order);
            if (section.id === currentSectionId) expandStateMap[section.id] = true;
          }
        }

        setSubsections(subsectionsMap);
        setExpandedSections(expandStateMap);

        if (!currentSectionId && sortedSections.length > 0 && !hasFetchedData) {
          navigate(`/${sortedSections[0].id}`);
        }
        setHasFetchedData(true);
      } catch (error) {
        console.error("Error loading navigation data:", error);
      }
    }
    loadAllData();
  }, [currentSectionId, currentSubsectionId, navigate, hasFetchedData]);

  const toggleSection = (sectionId, event) => {
    if (event.target.tagName === "svg" || event.target.closest("svg")) {
      event.preventDefault();
      setExpandedSections((prev) => ({
        ...prev,
        [sectionId]: !prev[sectionId],
      }));
    }
  };

  const NavContent = () => (
    <VStack align="stretch" spacing={2}>
      <Link to="/">
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          SRC Handbook
        </Text>
      </Link>
      <Divider mb={4} />

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
              bg={isActive && !currentSubsectionId ? "gray.100" : "transparent"}
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
                <Text fontWeight="medium">{section.title}</Text>
                {section.final === false && <BetaTag />}
              </Box>
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
                  const isSubsectionActive = isActive && currentSubsectionId === subsection.id;
                  return (
                    <Box key={subsection.id}>
                      <Link
                        to={`/${section.id}/${subsection.id}`}
                        aria-current={isSubsectionActive ? "page" : undefined}
                      >
                        <Box display="flex" alignItems="center">
                          <Text
                            fontSize="sm"
                            p={1}
                            fontWeight={isSubsectionActive ? "bold" : "normal"}
                            color={isSubsectionActive ? "blue.500" : "inherit"}
                          >
                            {subsection.title}
                          </Text>
                          {subsection.final === false && <BetaTag />}
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

  const visualWidth = collapsed ? 0 : leftWidth;

  return (
    <Box
      as="aside"
      position="fixed"
      left={0}
      top={0}
      width={`${visualWidth}px`}
      height="100vh"
      borderRight="1px solid"
      borderColor="gray.200"
      bg="white"
      overflowY={collapsed ? "hidden" : "auto"}
      overflowX="hidden"
      p={collapsed ? 0 : 4}
      boxShadow="2xl"
      transition="width 0.2s"
      zIndex={10}
      aria-label="Primary navigation"
      aria-expanded={!collapsed}
      onMouseEnter={() => setShowButton(true)}
      onMouseLeave={() => setShowButton(false)}
    >
      <NavContent />

      {/* Left resizer */}
      <Box
        position="absolute"
        right={0}
        top={0}
        bottom={0}
        width={collapsed ? "60px" : "6px"}
        cursor="col-resize"
        bg={isResizing ? "rgba(37,99,235,0.15)" : "transparent"}
        onMouseDown={startResize}
        onTouchStart={startResize}
        onKeyDown={handleKeyDown}
        role="separator"
        aria-orientation="vertical"
        tabIndex={0}
        aria-label="Resize navigation pane"
        aria-hidden={collapsed}
      />
    </Box>
  );
};

export default NavBar;
