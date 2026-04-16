import "../styles/NavBar.css";
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Image, Icon, Collapsible } from "@chakra-ui/react";
import { LuMenu, LuChevronDown, LuMoon, LuSearch, LuSun } from "react-icons/lu";
import {
  getSections,
  getSubsections,
  getPreloadedNavigationData,
  preloadNavigationData,
} from "../util/MarkdownRenderer";
import { NavSearchBar } from "../components/NavSearchBar";
import NavBarSearchResults from "./NavBarSearchResults";
import logoLight from "../assets/srch_logo.svg";
import logoDark from "../assets/srch_logo_white.svg";

const themeStorageKey = "srch-theme";

function NavBar() {
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
  const getLogo = () => (theme === "dark" ? logoDark : logoLight);

  const [sections, setSections] = useState([]);
  const [subsections, setSubsections] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [openSection, setOpenSection] = useState(null);

  const hasLoadedData = useRef(false);

  useEffect(() => {
    const root = document.documentElement;
    if (!root) return;

    const storedTheme = window.localStorage.getItem(themeStorageKey);
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme =
      storedTheme === "light" || storedTheme === "dark"
        ? storedTheme
        : prefersDark
          ? "dark"
          : "light";
    setTheme(initialTheme);
    root.setAttribute("data-theme", initialTheme);
  }, []);

  const toggleSection = (sectionKey, e) => {
    e?.stopPropagation();
    const willOpen = openSection !== sectionKey;
    if (willOpen) {
      setIsSearchOpen(false);
    }
    setOpenSection(willOpen ? sectionKey : null);
  };

  const openSectionOnHover = (sectionKey) => {
    setIsSearchOpen(false);
    setOpenSection(sectionKey);
  };

  const closeSectionOnLeave = (sectionKey) => {
    setOpenSection((prev) => (prev === sectionKey ? null : prev));
  };

  function forceSearchOpen() {
    setIsMenuOpen(false);
    setOpenSection(null);
    setIsModulesExpanded(false);
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

  function handleLogoClick() {
    if (currentPath === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    navigate("/");
  }

  useEffect(() => {
    setIsSearchOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 45em)");

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
        let preloaded = getPreloadedNavigationData();
        if (!preloaded) {
          preloaded = await preloadNavigationData();
        }

        const cachedSections = preloaded?.navSections || preloaded?.sections;
        const cachedSubsections =
          preloaded?.navSubsections || preloaded?.subsections;

        if (
          Array.isArray(cachedSections) &&
          cachedSections.length > 0 &&
          cachedSubsections &&
          typeof cachedSubsections === "object"
        ) {
          setSections(cachedSections);
          setSubsections(cachedSubsections);

          if (
            !currentSectionId &&
            currentPath !== "/" &&
            cachedSections.length > 0
          ) {
            navigate(`/${cachedSections[0].id}`, { replace: true });
          }

          hasLoadedData.current = true;
          return;
        }

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

  return (
    <Box
      as="header"
      className="navbar"
      onMouseLeave={() => {
        setIsSearchOpen(false);
        closeSectionOnLeave("modules");
        setIsMenuOpen(false);
      }}
    >
      <Box
        className={`top-navbar`}
        data-menu-open={isMenuOpen ? "true" : "false"}
        data-modules-expanded={isModulesExpanded ? "true" : "false"}
      >
        <Box className="main-navbar">
          <Box
            as="button"
            type="button"
            className="navbar-logo-container nav-link-box show-base hide-md"
            aria-label="Go to home page"
            onClick={handleLogoClick}
          >
            <Image
              src={getLogo()}
              alt="Socially Responsible Computing Handbook"
              height={"30px"}
              objectFit="contain"
              className="navbar-logo-img"
            />
            <div className="logo-white-overlay"></div>
          </Box>
          <Box className="middle-menu show-md hide-base">
            <Box
              as="button"
              type="button"
              className="navbar-logo-container nav-link-box middle-menu-left"
              aria-label="Go to home page"
              onClick={handleLogoClick}
            >
              <Image
                src={getLogo()}
                alt="Socially Responsible Computing Handbook"
                height={"30px"}
                objectFit="contain"
                className="navbar-logo-img"
              />
              <div className="logo-white-overlay"></div>
            </Box>
            <Box className="middle-menu-center">
              <Box
                className="nav-dropdown"
                onMouseEnter={() => openSectionOnHover("modules")}
              >
                <Box
                  as="button"
                  type="button"
                  className="nav-dropdown-title nav-link-box"
                  onClick={(e) => toggleSection("modules", e)}
                >
                  <span
                    className="nav-dropdown-title-text"
                    style={{
                      color:
                        openSection === "modules"
                          ? "var(--color-text-hover)"
                          : "inherit",
                    }}
                  >
                    Modules
                  </span>
                </Box>
              </Box>
              <Box
                as="button"
                type="button"
                className="nav-link-box nav-button"
                onClick={() => {
                  const firstSection = sections[0];
                  navigate(`/${firstSection.id}`);
                }}
                onMouseEnter={() => closeSectionOnLeave("modules")}
              >
                <span>About</span>
              </Box>
              <Box
                as="button"
                type="button"
                className="nav-link-box nav-button"
                onClick={() => navigate("/acknowledgments")}
                onMouseEnter={() => closeSectionOnLeave("modules")}
              >
                <span>Acknowledgments</span>
              </Box>
            </Box>
            <Box className="middle-menu-right">
              <Box
                as="button"
                type="button"
                className="icon-button"
                aria-label={isSearchOpen ? "Close search" : "Open search"}
                onClick={() => {
                  if (!isSearchOpen) {
                    forceSearchOpen();
                  } else {
                    setIsSearchOpen(false);
                  }
                }}
                onMouseEnter={() => closeSectionOnLeave("modules")}
              >
                <LuSearch className="navsearchbar-button" size="1.25em" />
              </Box>
              <Box
                as="button"
                type="button"
                className="icon-button"
                aria-label={
                  theme === "dark"
                    ? "Switch to light mode"
                    : "Switch to dark mode"
                }
                onClick={toggleTheme}
                onMouseEnter={() => closeSectionOnLeave("modules")}
              >
                {theme === "dark" ? (
                  <LuSun className="navsearchbar-button" size="1.25em" />
                ) : (
                  <LuMoon className="navsearchbar-button" size="1.25em" />
                )}
              </Box>
            </Box>
          </Box>
          <Box className="right-hstack show-base hide-md">
            <Box
              as="button"
              type="button"
              className="icon-button"
              aria-label={isSearchOpen ? "Close search" : "Open search"}
              onClick={() => {
                if (!isSearchOpen) {
                  forceSearchOpen();
                } else {
                  setIsSearchOpen(false);
                }
              }}
            >
              <LuSearch className="navsearchbar-button" size="1.25em" />
            </Box>
            <Box
              as="button"
              type="button"
              className="icon-button"
              aria-label={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
              onClick={toggleTheme}
            >
              {theme === "dark" ? (
                <LuSun className="navsearchbar-button" size="1.25em" />
              ) : (
                <LuMoon className="navsearchbar-button" size="1.25em" />
              )}
            </Box>
            <Box
              as="button"
              type="button"
              className="icon-button"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              onClick={toggleMenu}
            >
              <LuMenu
                color={theme === "dark" ? "white" : "black"}
                size="1.5em"
              />
            </Box>
          </Box>
        </Box>
        <Collapsible.Root open={openSection === "modules"} unmountOnExit>
          <Collapsible.Content style={{ overflow: "visible" }}>
            <Box className="nav-dropdown-menu">
              <Box className="nav-dropdown-sections-grid">
                {sections.slice(1).map((section) => {
                  const sectionSubsections = subsections[section.id] || [];
                  return (
                    <Box
                      key={section.id}
                      className="nav-dropdown-section-column"
                    >
                      <Box
                        as="button"
                        type="button"
                        className="nav-dropdown-item nav-dropdown-section-title nav-button"
                        tabIndex={openSection === "modules" ? 0 : -1}
                        onClick={() => {
                          navigate(`/${section.id}`);
                          setOpenSection(null);
                        }}
                      >
                        <span>{section.title}</span>
                      </Box>
                      <Box className="nav-dropdown-subsections">
                        {sectionSubsections.map((subsection) => (
                          <Box
                            as="button"
                            type="button"
                            key={`${section.id}-${subsection.id}`}
                            className="nav-dropdown-item nav-dropdown-subsection-item nav-button"
                            tabIndex={openSection === "modules" ? 0 : -1}
                            onClick={() => {
                              navigate(`/${section.id}/${subsection.id}`);
                              setOpenSection(null);
                            }}
                          >
                            <span>{subsection.title}</span>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Collapsible.Content>
        </Collapsible.Root>
        <Collapsible.Root open={isSearchOpen}>
          <Collapsible.Content>
            <NavSearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              setIsSearchOpen={setIsSearchOpen}
              isSearchOpen={isSearchOpen}
              align="stretch"
            />
          </Collapsible.Content>
        </Collapsible.Root>
        <NavBarSearchResults
          show={isSearchOpen && Boolean(searchQuery)}
          searchQuery={searchQuery}
          maxResults={2}
          setIsSearchOpen={setIsSearchOpen}
        />
      </Box>
      <Collapsible.Root
        open={isMenuOpen}
        unmountOnExit
        className="mobile-menu-collapsible"
      >
        <Collapsible.Content>
          <Box className="mobile-menu-panel show-base hide-md">
            <Box
              className="mobile-menu-vstack"
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              gap={7}
            >
              <Box
                as="button"
                type="button"
                className="nav-link-box nav-button"
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
                as="button"
                type="button"
                className="nav-link-box nav-button"
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate("/acknowledgments");
                }}
              >
                Acknowledgments
              </Box>
              <Box
                className="mobile-modules-container"
                onMouseEnter={() => {
                  setIsSearchOpen(false);
                  setIsModulesExpanded(true);
                }}
                onMouseLeave={() => setIsModulesExpanded(false)}
              >
                <Box
                  as="button"
                  type="button"
                  className="mobile-modules-toggle nav-link-box nav-button"
                  onClick={() => {
                    const willOpen = !isModulesExpanded;
                    if (willOpen) {
                      setIsSearchOpen(false);
                    }
                    setIsModulesExpanded(willOpen);
                  }}
                >
                  Modules
                  <Icon
                    as={LuChevronDown}
                    className="mobile-modules-chevron"
                    style={{
                      transform: isModulesExpanded
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                    }}
                  />
                </Box>
                <Collapsible.Root open={isModulesExpanded} unmountOnExit>
                  <Collapsible.Content style={{ overflow: "visible" }}>
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="stretch"
                      paddingLeft={"1rem"}
                      gap={1}
                    >
                      {sections.slice(1).map((section) => (
                        <Box
                          as="button"
                          type="button"
                          key={section.id}
                          className="nav-dropdown-item nav-button"
                          tabIndex={isModulesExpanded ? 0 : -1}
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
                    </Box>
                  </Collapsible.Content>
                </Collapsible.Root>
              </Box>
            </Box>
          </Box>
        </Collapsible.Content>
      </Collapsible.Root>
    </Box>
  );
}

export default NavBar;
