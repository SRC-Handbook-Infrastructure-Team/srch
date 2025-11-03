import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  HStack,
  VStack,
  IconButton,
  Image,
  Text,
  Icon,
  Collapse,
} from "@chakra-ui/react";
import { HamburgerIcon, ChevronDownIcon, MoonIcon } from "@chakra-ui/icons";
import { getSections, getSubsections } from "../util/MarkdownRenderer";
import { SearchBar } from "./SearchBar";
import logo from "../assets/logo.png";

/**
 * NavBar
 * -----------------------------------------------------------------------------
 * The global top navigation bar of the site.
 * Handles navigation across sections and modules,
 * as well as the site search input and static navigation links.
 * -----------------------------------------------------------------------------
 */
function NavBar({ className = "" }) {
  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location.pathname;
  const pathParts = currentPath.split("/").filter(Boolean);
  const currentSectionId = pathParts[0] || "";
  const currentSubsectionId = pathParts[1] || "";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModulesExpanded, setIsModulesExpanded] = useState(false);

  /**
   * Data for sections + subsections.
   * expandedSections is a map of sectionId -> boolean (expanded or not).
   */
  const [sections, setSections] = useState([]);
  const [subsections, setSubsections] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const hasLoadedData = useRef(false);
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (sectionKey, e) => {
    e?.stopPropagation();
    setOpenSection((prev) => (prev === sectionKey ? null : sectionKey));
  };

  useEffect(() => {
    if (hasLoadedData.current) return; // prevent multiple fetches

    async function loadAllData() {
      try {
        const sectionsData = await getSections();
        const sortedSections = [...sectionsData].sort(
          (a, b) => a.order - b.order
        );
        setSections(sortedSections);

        const subsectionsMap = {};
        // Fix: expandStateMap was missing declaration before use
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

        if (
          !currentSectionId &&
          currentPath !== "/" &&
          sortedSections.length > 0
        ) {
          navigate(`/${sortedSections[0].id}`, { replace: true });
        }

        hasLoadedData.current = true;
      } catch (error) {
        console.error("Error loading navigation data:", error);
      }
    }

    loadAllData();
  }, []);

  // Redirect from main section to first subsection
  useEffect(() => {
    if (
      currentSectionId &&
      !currentSubsectionId &&
      subsections[currentSectionId]
    ) {
      const sectionSubsections = subsections[currentSectionId];
      if (sectionSubsections.length > 0) {
        navigate(`/${currentSectionId}/${sectionSubsections[0].id}`, {
          replace: true,
        });
      }
    }
  }, [subsections, navigate]);

  const NavDropdown = ({ title, items, isExpanded, onToggle }) => {
    const handleClick = (e) => {
      onToggle(e);
    };
    return (
      <Box position="relative" cursor="pointer" pointerEvents="auto">
        <Box
          p={2}
          borderRadius="md"
          cursor="pointer"
          display="flex"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          onClick={handleClick}
          _hover={{ color: "#9D0013" }}
        >
          <Text
            cursor="pointer"
            pointerEvents="auto"
            color={isExpanded ? "#9D0013" : "inherit"}
          >
            {title}
          </Text>
          <Icon
            as={ChevronDownIcon}
            transform={isExpanded ? "rotate(180deg)" : undefined}
            transition="transform 0.2s"
            w={5}
            h={5}
          />
        </Box>

        {isExpanded && (
          <Box
            position="absolute"
            top="100%"
            left={0}
            mt={1}
            bg="white"
            shadow="md"
            borderRadius="md"
            zIndex={10}
            justifyContent="center"
            width="max-content"
          >
            <VStack align="stretch" spacing={0}>
              {items.map((item) => (
                <Box
                  key={item.id}
                  paddingLeft={2}
                  paddingRight={2}
                  paddingTop={1}
                  paddingBottom={1}
                  cursor="pointer"
                  onClick={item.onClick}
                  _hover={{ color: "#9D0013" }}
                >
                  <Text fontWeight="medium" whiteSpace="nowrap">
                    {item.title}
                  </Text>
                </Box>
              ))}
            </VStack>
          </Box>
        )}
      </Box>
    );
  };

  return (
    <Box
      as="header"
      className={`top-navbar ${className}`.trim()}
      position="fixed"
      top={0}
      left={0}
      width="100vw"
      px={4}
      margin={0}
      height={"min-content"}
      alignContent={"center"}
      borderBottom="1px solid"
      borderColor="gray.200"
      bg="white"
      boxShadow="2px 2px 5px rgba(0, 0, 0, 0.1)"
      zIndex={20}
      sx={{
        "& a:hover": { color: "#9D0013" },
        "& a:button": { color: "#9D0013" },
      }}
    >
      <Box>
        <HStack
          align="center"
          justify="space-between"
          spacing={2}
          overflow="visible"
          width="100%"
          height={"60px"}
        >
          <Box
            cursor="pointer"
            onClick={() => navigate("/")}
            whiteSpace="nowrap"
            flexShrink={0}
          >
            <HStack alignItems={"center"}>
              <Image
                src={logo}
                alt="Socially Responsible Computing Handbook"
                height={"30px"}
                objectFit="contain"
              />
            </HStack>
          </Box>

          <HStack ml="auto">
            <Box display={{ base: "none", md: "flex" }}>
              <NavDropdown
                title="Modules"
                items={sections.slice(1).map((section) => ({
                  id: section.id,
                  title: section.title,
                  onClick: (e) => {
                    const sectionSubsections = subsections[section.id];
                    if (sectionSubsections && sectionSubsections.length > 0) {
                      navigate(`/${section.id}/${sectionSubsections[0].id}`);
                    } else {
                      navigate(`/${section.id}`);
                    }
                    toggleSection(section.id, e);
                  },
                }))}
                isExpanded={openSection === "modules"}
                onToggle={(e) => toggleSection("modules", e)}
              />

              <Box
                p={2}
                borderRadius="md"
                cursor="pointer"
                textAlign="center"
                onClick={() => {
                  const firstSection = sections[0];
                  const sectionSubsections = subsections[firstSection.id];
                  if (sectionSubsections && sectionSubsections.length > 0) {
                    navigate(`/${firstSection.id}/${sectionSubsections[0].id}`);
                  } else {
                    navigate(`/${firstSection.id}`);
                  }
                }}
                _hover={{ color: "#9D0013" }}
              >
                <Text>{"About"}</Text>
              </Box>
              <Box
                p={2}
                borderRadius="md"
                cursor="pointer"
                textAlign="center"
                onClick={() => navigate("/acknowledgements/leadership")}
                _hover={{ color: "#9D0013" }}
              >
                <Text>{"Acknowledgements"}</Text>
              </Box>
            </Box>
            <IconButton
              icon={<MoonIcon color="black" fontSize={"lg"} />}
              className="toggle-button"
              display={{ base: "inline-flex" }}
            />
            <Box display={{ base: "none", md: "flex" }}>
              <SearchBar
                className="nav-search"
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                canExpand={true}
                maxResults={3}
                display={{ base: "none", md: "flex" }}
              />
            </Box>
          </HStack>

          <IconButton
            icon={<HamburgerIcon color="black" fontSize={"xl"} />}
            aria-label="Open menu"
            className="toggle-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            variant="unstyled"
            display={{ base: "inline-flex", md: "none" }}
          />
        </HStack>

        {isMenuOpen && (
          <VStack
            display={{ base: "flex", md: "none" }}
            backgroundColor="white"
            align="stretch"
            pb={3}
          >
            <Box
              borderRadius="md"
              cursor="pointer"
              textAlign="left"
              pb={1}
              width={"min-content"}
              onClick={() => {
                setIsMenuOpen(false);
                const sectionSubsections = subsections[sections[0].id];
                if (sectionSubsections && sectionSubsections.length > 0) {
                  navigate(`/${sections[0].id}/${sectionSubsections[0].id}`);
                } else {
                  navigate(`/${sections[0].id}`);
                }
              }}
              _hover={{ color: "#9D0013" }}
            >
              About
            </Box>

            <Box onMouseEnter={() => setIsModulesExpanded(true)}>
              <Box
                borderRadius="md"
                cursor="pointer"
                textAlign="left"
                pb={1}
                width={"min-content"}
                whiteSpace={"nowrap"}
                _hover={{ color: "#9D0013" }}
              >
                Modules
                <Icon
                  as={ChevronDownIcon}
                  transform={
                    isModulesExpanded ? "rotate(180deg)" : "rotate(0deg)"
                  }
                  onClick={() => setIsModulesExpanded(!isModulesExpanded)}
                  transition="transform 0.3s"
                  w={5}
                  h={5}
                />
              </Box>
              <Collapse
                in={isModulesExpanded}
                animateOpacity={true}
                style={{ overflow: "visible" }}
                duration={0.3}
                width={"min-content"}
              >
                <VStack pl={6} align="stretch" spacing={2}>
                  {sections.slice(1).map((section) => (
                    <Box
                      width={"min-content"}
                      whiteSpace={"nowrap"}
                      key={section.id}
                      cursor="pointer"
                      onClick={() => {
                        setIsMenuOpen(false);
                        const sectionSubsections = subsections[section.id];
                        if (
                          sectionSubsections &&
                          sectionSubsections.length > 0
                        ) {
                          navigate(
                            `/${section.id}/${sectionSubsections[0].id}`
                          );
                        } else {
                          navigate(`/${section.id}`);
                        }
                        toggleSection(section.id, null);
                      }}
                      _hover={{ color: "#9D0013" }}
                    >
                      {section.title}
                    </Box>
                  ))}
                </VStack>
              </Collapse>
            </Box>
            <Box
              borderRadius="md"
              cursor="pointer"
              textAlign="left"
              onClick={() => {
                setIsMenuOpen(false);
                navigate("/acknowledgements/leadership");
              }}
              _hover={{ color: "#9D0013" }}
              width={"min-content"}
            >
              Acknowledgements
            </Box>
            <SearchBar
              className="nav-search"
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              canExpand={false}
              maxResults={2}
              px={4}
              pb={4}
              align="stretch"
            />
          </VStack>
        )}
      </Box>
    </Box>
  );
}

export default NavBar;
