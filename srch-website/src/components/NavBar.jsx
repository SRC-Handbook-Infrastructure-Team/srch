import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  HStack,
  VStack,
  Image,
  Text,
  Icon,
  Collapse,
  Slide,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  ChevronDownIcon,
  MoonIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import { getSections, getSubsections } from "../util/MarkdownRenderer";
import { NavSearchBar } from "../components/NavSearchBar";
import logo from "../assets/logo.png";
import "../ContentPage.css";
import { color } from "framer-motion";

function NavBar({ className = ""}) {
  
  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location.pathname;
  const pathParts = currentPath.split("/").filter(Boolean);
  const currentSectionId = pathParts[0] || "";
  const currentSubsectionId = pathParts[1] || "";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
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

  function forceSearchOpen() {
    setIsMenuOpen(false);
    setIsSearchOpen(true);
  }

  function forceMenuOpen() {
    setIsSearchOpen(false);
    setIsMenuOpen(true);
  }

  useEffect(() => {
    setIsSearchOpen(false);
  }, [location.pathname]);

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
        <Collapse in={isExpanded} animateOpacity>
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
        </Collapse>
      </Box>
    );
  };

    return (
    <>
      {/* Fixed top navbar */}
      <Box
        as="header"
        className={`top-navbar ${className}`.trim()}
        data-menu-open={isMenuOpen ? "true" : "false"}
        data-modules-expanded={isModulesExpanded ? "true" : "false"}
        onMouseLeave={() => setIsSearchOpen(false)}
      >
        <Box className="navbar-padding">
          <HStack className="header-hstack">
            {/* Logo ---------------------------------------------------- */}
            <Box
              className="navbar-logo-container"
              onClick={() => navigate("/")}
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

            {/* Right side icons / desktop nav -------------------------- */}
            <HStack className="right-hstack" spacing={"1rem"}>
              {/* Desktop: Modules dropdown */}
              <Box
                className="hide-base show-md"
                onMouseLeave={() => setOpenSection(null)}
              >
                <Box className="nav-dropdown">
                  <Box
                    className="nav-dropdown-title"
                    onMouseEnter={() => setOpenSection("modules")}
                    onClick={(e) => toggleSection("modules", e)}
                  >
                    <Text
                      className="nav-dropdown-title-text"
                      color={openSection === "modules" ? "#9D0013" : "inherit"}
                    >
                      Modules
                    </Text>
                    <Icon
                      as={ChevronDownIcon}
                      className="nav-dropdown-chevron"
                      style={{
                        transform:
                          openSection === "modules"
                            ? "rotate(180deg)"
                            : undefined,
                      }}
                    />
                  </Box>
                  <Collapse in={openSection === "modules"} animateOpacity>
                    <Box className="nav-dropdown-menu">
                      <VStack align="stretch" spacing={0}>
                        {sections.slice(1).map((section) => (
                          <Box
                            key={section.id}
                            className="nav-dropdown-item"
                            onClick={(e) => {
                              const sectionSubsections =
                                subsections[section.id];
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
                              toggleSection(section.id, e);
                            }}
                          >
                            <Text fontWeight="medium" whiteSpace="nowrap">
                              {section.title}
                            </Text>
                          </Box>
                        ))}
                      </VStack>
                    </Box>
                  </Collapse>
                </Box>
              </Box>

              {/* Desktop: About / Acknowledgements */}
              <Box
                className="nav-link-box hide-base show-md"
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
                className="nav-link-box hide-base show-md"
                onClick={() => navigate("/acknowledgements")}
              >
                <Text>Acknowledgements</Text>
              </Box>

              {/* Icons: dark mode / search */}
              <Box className="icon-button">
                <MoonIcon
                  className="navsearchbar-button"
                  fontSize={"lg"}
                ></MoonIcon>
              </Box>
              <Box
                className="icon-button"
                onClick={() => {
                  if (!isSearchOpen) {
                    forceSearchOpen();
                  } else {
                    setIsSearchOpen(false);
                  }
                }}
              >
                <SearchIcon
                  className="navsearchbar-button"
                  fontSize={"lg"}
                ></SearchIcon>
              </Box>

              {/* Mobile hamburger (only shows on base) */}
              <Box
                className="icon-button show-base hide-md"
                onClick={() => {
                  if (!isMenuOpen) {
                    forceMenuOpen();
                  } else {
                    setIsMenuOpen(false);
                  }
                }}
              >
                <HamburgerIcon
                  color="black"
                  fontSize={"x-large"}
                ></HamburgerIcon>
              </Box>
            </HStack>
          </HStack>

          {/* Search bar under the nav (same as before) */}
          <Collapse in={isSearchOpen} animateOpacity>
            <NavSearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              setIsSearchOpen={setIsSearchOpen}
              isSearchOpen={isSearchOpen}
              maxResults={2}
              align="stretch"
            />
          </Collapse>
        </Box>
      </Box>

      {/* ===========================================
          Mobile slide-down menu PANEL (separate)
          =========================================== */}
      <Collapse in={isMenuOpen} animateOpacity>
        <Box className="mobile-menu-panel show-base hide-md">
          <VStack
            align={"start"}
            spacing={7}
            className="mobile-menu-vstack"
          >
            {/* About */}
            <Box
              className="nav-link-box"
              onClick={() => {
                setIsMenuOpen(false);
                const firstSection = sections[0];
                const sectionSubsections = subsections[firstSection.id];
                if (sectionSubsections && sectionSubsections.length > 0) {
                  navigate(`/${firstSection.id}/${sectionSubsections[0].id}`);
                } else {
                  navigate(`/${firstSection.id}`);
                }
              }}
            >
              About
            </Box>

            {/* Acknowledgements */}
            <Box
              className="nav-link-box"
              onClick={() => {
                setIsMenuOpen(false);
                navigate("/acknowledgements");
              }}
            >
              Acknowledgements
            </Box>

            {/* Modules dropdown in mobile panel */}
            <Box 
              className="mobile-modules-container"
              onMouseEnter={() => setIsModulesExpanded(true)}
              onMouseLeave={() => setIsModulesExpanded(false)}
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
              >
                <VStack align="stretch" spacing={1}>
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
          </VStack>
        </Box>
      </Collapse>
    </>
  );

}

export default NavBar;
