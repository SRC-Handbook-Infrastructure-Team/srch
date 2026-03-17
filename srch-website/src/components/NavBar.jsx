import "../styles/NavBar.css";
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Image, Icon, Collapse } from "@chakra-ui/react";
import {
  HamburgerIcon,
  ChevronDownIcon,
  MoonIcon,
  SearchIcon,
  SunIcon,
} from "@chakra-ui/icons";
import { getSections, getSubsections } from "../util/MarkdownRenderer";
import { NavSearchBar } from "../components/NavSearchBar";
import logoLight from "../assets/srch_logo.svg";
import logoDark from "../assets/srch_logo_white.svg";

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
    <Box
      onMouseLeave={() => {
        setIsSearchOpen(false);
        closeSectionOnLeave("modules");
        setIsMenuOpen(false);
      }}
    >
      <Box
        as="header"
        className={`top-navbar ${className}`.trim()}
        data-menu-open={isMenuOpen ? "true" : "false"}
        data-modules-expanded={isModulesExpanded ? "true" : "false"}
      >
        <Box className="main-navbar">
          <Box
            as="button"
            type="button"
            className="navbar-logo-container show-base hide-md"
            aria-label="Go to home page"
            onClick={() => navigate("/")}
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
              className="navbar-logo-container"
              aria-label="Go to home page"
              onClick={() => navigate("/")}
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
            <Box
              className="nav-dropdown"
              onMouseEnter={() => openSectionOnHover("modules")}
            >
              <Box
                as="button"
                type="button"
                className="nav-dropdown-title"
                onClick={(e) => toggleSection("modules", e)}
              >
                <span
                  className="nav-dropdown-title-text nav-link-box"
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
                const sectionSubsections = subsections[firstSection.id];
                if (sectionSubsections && sectionSubsections.length > 0) {
                  navigate(`/${firstSection.id}/${sectionSubsections[0].id}`);
                } else {
                  navigate(`/${firstSection.id}`);
                }
              }}
            >
              <span>About</span>
            </Box>
            <Box
              as="button"
              type="button"
              className="nav-link-box nav-button"
              onClick={() => navigate("/acknowledgments")}
            >
              <span>Acknowledgments</span>
            </Box>
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
              <SearchIcon className="navsearchbar-button" fontSize={"lg"} />
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
                <SunIcon className="navsearchbar-button" fontSize="larger" />
              ) : (
                <MoonIcon className="navsearchbar-button" fontSize="lg" />
              )}
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
              <SearchIcon className="navsearchbar-button" fontSize={"lg"} />
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
                <SunIcon className="navsearchbar-button" fontSize="larger" />
              ) : (
                <MoonIcon className="navsearchbar-button" fontSize="lg" />
              )}
            </Box>
            <Box
              as="button"
              type="button"
              className="icon-button"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              onClick={toggleMenu}
            >
              <HamburgerIcon
                color={theme === "dark" ? "white" : "black"}
                fontSize={"x-large"}
              />
            </Box>
          </Box>
        </Box>
        <Collapse
          in={isSearchOpen}
          unmountOnExit
          animateOpacity
          transition={{
            enter: { duration: 0.25 },
            exit: { duration: 0.15, delay: 0.1 },
          }}
          startingHeight={"0.75rem"}
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
        <Collapse
          in={openSection === "modules"}
          unmountOnExit
          animateOpacity
          transition={{
            enter: { duration: 0.5 },
            exit: { duration: 0.25 },
          }}
          style={{ overflow: "visible" }}
        >
          <Box className="nav-dropdown-menu">
            {sections.slice(1).map((section) => (
              <Box
                as="button"
                type="button"
                key={section.id}
                className="nav-dropdown-item nav-button"
                tabIndex={openSection === "modules" ? 0 : -1}
                onClick={(e) => {
                  const sectionSubsections = subsections[section.id];
                  if (sectionSubsections && sectionSubsections.length > 0) {
                    navigate(`/${section.id}/${sectionSubsections[0].id}`);
                  } else {
                    navigate(`/${section.id}`);
                  }
                  toggleSection(section.id, e);
                }}
              >
                <span>{section.title}</span>
              </Box>
            ))}
          </Box>
        </Collapse>
      </Box>
      <Collapse
        in={isMenuOpen}
        unmountOnExit
        animateOpacity
        transition={{
          enter: { duration: 0.25 },
          exit: { duration: 0.5 },
        }}
      >
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
              onMouseEnter={() => setIsModulesExpanded(true)}
              onMouseLeave={() => setIsModulesExpanded(false)}
            >
              <Box
                as="button"
                type="button"
                className="mobile-modules-toggle nav-link-box nav-button"
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
                unmountOnExit
                animateOpacity={true}
                style={{ overflow: "visible", width: "min-content" }}
                transition={{
                  enter: { duration: 0.25 },
                  exit: { duration: 0.25 },
                }}
              >
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
              </Collapse>
            </Box>
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
}

export default NavBar;
