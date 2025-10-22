import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Text, Image, HStack, VStack, Icon } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { getSections, getSubsections } from "../util/MarkdownRenderer";
import { SearchBar } from "./SearchBar";
import logo from "../assets/logo.png";
import { useCallback } from "react";
import { useRef } from "react";

function NavBar() {
  const location = useLocation();

  const navigate = useNavigate();
  const currentPath = location.pathname;
  const pathParts = currentPath.split("/").filter(Boolean);

  // Current section and subsection IDs from URL
  const currentSectionId = pathParts[0] || "";
  const currentSubsectionId = pathParts[1] || "";

  // State
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

        if (!currentSectionId && sortedSections.length > 0) {
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
      position="fixed"
      left={0}
      top={0}
      width="100vw"
      height={"min-content"}
      margin={0}
      borderRight="1px solid"
      borderColor="gray.200"
      bg="white"
      overflowY="auto"
      overflow={"visible"}
      boxShadow={"2px 2px 5px rgba(0, 0, 0, 0.1)"}
      zIndex={10}
      sx={{
        "& a:hover": {
          color: "#9D0013",
        },
        "& a:button": {
          color: "#9D0013",
        },
      }}
    >
      <HStack
        align="stretch"
        justify="space-between"
        spacing={2}
        overflow={"visible"}
        width="100%"
        px={4}
      >
        <Box cursor="pointer" onClick={() => navigate("/")}>
          <Image
            src={logo}
            alt="Logo"
            boxSize="75px"
            objectFit="contain"
            paddingTop={2}
            paddingBottom={2}
          />
        </Box>

        <HStack spacing={4} ml="auto">
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
            onClick={() => {
              navigate("/acknowledgements/leadership");
            }}
            _hover={{ color: "#9D0013" }}
          >
            <Text>{"Acknowledgements"}</Text>
          </Box>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            canExpand={true}
          />
        </HStack>
      </HStack>
    </Box>
  );
}

export default NavBar;