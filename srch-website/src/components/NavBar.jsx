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
import "../styles/NavBar.css";

const themeStorageKey = "srch-theme";

function NavBar({ className = "", layoutMode }) {
  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location.pathname;
  const pathParts = currentPath.split("/").filter(Boolean);
  const currentSectionId = pathParts[0] || "";
  const currentSubsectionId = pathParts[1] || "";

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isModulesExpanded, setIsModulesExpanded] = useState(false);
  const [theme, setTheme] = useState("light");

  const [sections, setSections] = useState([]);
  const [subsections, setSubsections] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [openSection, setOpenSection] = useState(null);

  const hasLoadedData = useRef(false);

  useEffect(() => {
    const root = document.documentElement;
    if (!root) return;

    const storedTheme = window.localStorage.getItem(themeStorageKey);
    const prefersDark = window.matchMedia
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
      : false;
    const initialTheme =
      storedTheme === "light" || storedTheme === "dark"
        ? storedTheme
        : prefersDark
          ? "dark"
          : "light";

    setTheme(initialTheme);
    root.setAttribute("data-theme", initialTheme);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (!root) return;

    // Only push content in overlay mode (mobile / narrow)
    if (layoutMode !== "overlay") {
      root.style.setProperty("--mobile-menu-offset", "0px");
      return;
    }

    // Menu closed → no offset
    if (!isMenuOpen) {
      root.style.setProperty("--mobile-menu-offset", "0px");
      return;
    }

    // Menu open → fixed height based on modules state
    const height = isModulesExpanded ? 300 : 200; // px
    root.style.setProperty("--mobile-menu-offset", `${height}px`);
  }, [layoutMode, isMenuOpen, isModulesExpanded]);

  const toggleSection = (sectionKey, e) => {
    e?.stopPropagation();
    setOpenSection((prev) => (prev === sectionKey ? null : sectionKey));
  };

  const openSectionOnHover = (sectionKey) => {
    setOpenSection(sectionKey);
  };

  const closeSectionOnLeave = (sectionKey) => {
    setOpenSection((prev) => (prev === sectionKey ? null : prev));
  };

  function forceSearchOpen() {
    setIsMenuOpen(false);
    setIsSearchOpen(true);
  }

  function toggleMenu() {
    setIsSearchOpen(false);
    setIsMenuOpen((prev) => {
      const next = !prev;
      return next;
    });
  }

  function toggleTheme() {
    setTheme((prevTheme) => {
      const nextTheme = prevTheme === "dark" ? "light" : "dark";
      const root = document.documentElement;
      if (root) {
        root.setAttribute("data-theme", nextTheme);
      }
      window.localStorage.setItem(themeStorageKey, nextTheme);
      return nextTheme;
    });
  }

  useEffect(() => {
    setIsSearchOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 48em)");

    const handleChange = (event) => {
      if (event.matches) {
        setIsMenuOpen(false);
        setIsModulesExpanded(false);
      }
    };

    handleChange(mediaQuery);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  useEffect(() => {
    if (hasLoadedData.current) return;

    async function loadAllData() {
      try {
        const sectionsData = await getSections();
        const sortedSections = [...sectionsData].sort(
          (a, b) => a.order - b.order,
        );
        setSections(sortedSections);

        const subsectionsMap = {};
        const expandStateMap = {};

        for (const section of sortedSections) {
          const sectionSubsections = await getSubsections(section.id);
          if (sectionSubsections.length > 0) {
            subsectionsMap[section.id] = sectionSubsections.sort(
              (a, b) => a.order - b.order,
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
  }, [subsections, navigate, currentSectionId, currentSubsectionId]);

  return (
    <>
      <Box
        as="header"
        className={`top-navbar ${className}`.trim()}
        data-menu-open={isMenuOpen ? "true" : "false"}
        data-modules-expanded={isModulesExpanded ? "true" : "false"}
        onMouseLeave={() => setIsSearchOpen(false)}
      >
        <Box className="navbar-padding">
          <HStack className="header-hstack">
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
            <HStack className="right-hstack" spacing={"1rem"}>
              <Box className="hide-base show-md">
                <Box
                  className="nav-dropdown"
                  onMouseEnter={() => openSectionOnHover("modules")}
                  onMouseLeave={() => closeSectionOnLeave("modules")}
                >
                  <Box
                    className="nav-dropdown-title"
                    onClick={(e) => toggleSection("modules", e)}
                  >
                    <Text
                      className="nav-dropdown-title-text nav-link-box"
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
                  <Collapse
                    in={openSection === "modules"}
                    animateOpacity
                    transition={{
                      enter: { duration: 0.5 },
                      exit: { duration: 0.25 },
                    }}
                  >
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
                                  `/${section.id}/${sectionSubsections[0].id}`,
                                );
                              } else {
                                navigate(`/${section.id}`);
                              }
                              toggleSection(section.id, e);
                            }}
                          >
                            <Text whiteSpace="nowrap">{section.title}</Text>
                          </Box>
                        ))}
                      </VStack>
                    </Box>
                  </Collapse>
                </Box>
              </Box>
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
                onClick={() => navigate("/acknowledgments")}
              >
                <Text>Acknowledgments</Text>
              </Box>
              {/* <Box
                className="icon-button"
                role="button"
                tabIndex={0}
                aria-label={
                  theme === "dark"
                    ? "Switch to light mode"
                    : "Switch to dark mode"
                }
                onClick={toggleTheme}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    toggleTheme();
                  }
                }}
              >
                <MoonIcon className="navsearchbar-button" fontSize={"lg"} />
              </Box> */}
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
                <SearchIcon className="navsearchbar-button" fontSize={"lg"} />
              </Box>
              <Box
                className="icon-button show-base hide-md"
                onClick={toggleMenu}
              >
                <HamburgerIcon color="black" fontSize={"x-large"} />
              </Box>
            </HStack>
          </HStack>
          <Collapse
            in={isSearchOpen}
            animateOpacity
            transition={{
              enter: { duration: 0.25 },
              exit: { duration: 0.15, delay: 0.1 },
            }}
            startingHeight={"1rem"}
          >
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
      <Collapse
        in={isMenuOpen}
        animateOpacity
        transition={{
          enter: { duration: 0.25 },
          exit: { duration: 0.25 },
        }}
      >
        <Box className="mobile-menu-panel show-base hide-md">
          <VStack align={"start"} spacing={7} className="mobile-menu-vstack">
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
            <Box
              className="nav-link-box"
              onClick={() => {
                setIsMenuOpen(false);
                navigate("/acknowledgments");
              }}
            >
              Acknowledgments
            </Box>
            <Box
              className="mobile-modules-container"
              onMouseEnter={() => setIsModulesExpanded(true)}
              onMouseLeave={() => setIsModulesExpanded(false)}
            >
              <Box
                className="mobile-modules-toggle nav-link-box"
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
                transition={{
                  enter: { duration: 0.5 },
                  exit: { duration: 0.25 },
                }}
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
                            `/${section.id}/${sectionSubsections[0].id}`,
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
