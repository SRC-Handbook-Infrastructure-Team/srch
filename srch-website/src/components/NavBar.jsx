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

function NavBar({ className = "" }) {
  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location.pathname;
  const pathParts = currentPath.split("/").filter(Boolean);
  const currentSectionId = pathParts[0] || "";
  const currentSubsectionId = pathParts[1] || "";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModulesExpanded, setIsModulesExpanded] = useState(false);

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
    if (hasLoadedData.current) return;

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
      <Box className="nav-dropdown">
        <Box className="nav-dropdown-title" onClick={handleClick}>
          <Text
            className="nav-dropdown-title-text"
            color={isExpanded ? "#9D0013" : "inherit"}
          >
            {title}
          </Text>
          <Icon
            as={ChevronDownIcon}
            className="nav-dropdown-chevron"
            style={{ transform: isExpanded ? "rotate(180deg)" : undefined }}
          />
        </Box>

        {isExpanded && (
          <Box className="nav-dropdown-menu">
            <VStack align="stretch" spacing={0}>
              {items.map((item) => (
                <Box
                  key={item.id}
                  className="nav-dropdown-item"
                  onClick={item.onClick}
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
    <Box as="header" className={`top-navbar ${className}`.trim()}>
      <Box>
        <HStack className="header-hstack">
          <Box className="navbar-logo-container" onClick={() => navigate("/")}>
            <HStack alignItems={"center"}>
              <Image
                src={logo}
                alt="Socially Responsible Computing Handbook"
                height={"30px"}
                objectFit="contain"
              />
            </HStack>
          </Box>

          <HStack className="right-hstack">
            <Box className="hide-base show-md right-hstack">
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
                className="nav-link-box"
                onClick={() => {
                  const firstSection = sections[0];
                  const sectionSubsections = subsections[firstSection.id];
                  if (sectionSubsections && sectionSubsections.length > 0) {
                    navigate(`/${firstSection.id}/${sectionSubsections[0].id}`);
                  } else {
                    navigate(`/${firstSection.id}`);
                  }
                }}
              >
                <Text>About</Text>
              </Box>
              <Box
                className="nav-link-box"
                onClick={() => navigate("/acknowledgements/leadership")}
              >
                <Text>Acknowledgements</Text>
              </Box>
            </Box>

            <IconButton
              icon={<MoonIcon color="black" fontSize={"lg"} />}
              className="icon-button"
              aria-label="Toggle dark mode"
            />

            <Box className="hide-base show-md">
              <SearchBar
                className="nav-search"
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                canExpand={true}
                maxResults={3}
              />
            </Box>
          </HStack>

          <IconButton
            icon={<HamburgerIcon color="black" fontSize={"xl"} />}
            aria-label="Open menu"
            className="icon-button show-base hide-md"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            variant="unstyled"
          />
        </HStack>

        {isMenuOpen && (
          <VStack
            align={"start"}
            className="mobile-menu-vstack show-base hide-md"
          >
            <Box
              className="nav-link-box"
              onClick={() => {
                setIsMenuOpen(false);
                const sectionSubsections = subsections[sections[0].id];
                if (sectionSubsections && sectionSubsections.length > 0) {
                  navigate(`/${sections[0].id}/${sectionSubsections[0].id}`);
                } else {
                  navigate(`/${sections[0].id}`);
                }
              }}
            >
              About
            </Box>

            <Box
              className="mobile-modules-container"
              onMouseEnter={() => setIsModulesExpanded(true)}
            >
              <Box
                className="mobile-modules-toggle"
                onClick={() => setIsModulesExpanded(!isModulesExpanded)}
              >
                Modules
                <Icon
                  as={ChevronDownIcon}
                  className="mobile-modules-chevron"
                  style={{
                    transform: isModulesExpanded
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                  }}
                />
              </Box>
              <Collapse
                in={isModulesExpanded}
                animateOpacity={true}
                style={{ overflow: "visible", width: "min-content" }}
                duration={0.3}
                className="mobile-modules-collapse"
              >
                <VStack align="stretch" spacing={2}>
                  {sections.slice(1).map((section) => (
                    <Box
                      key={section.id}
                      className="mobile-module-item"
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
                    >
                      {section.title}
                    </Box>
                  ))}
                </VStack>
              </Collapse>
            </Box>

            <Box
              className="nav-link-box"
              onClick={() => {
                setIsMenuOpen(false);
                navigate("/acknowledgements/leadership");
              }}
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
