/**
 * Route page for the home experience, including top-level navigation into
 * modules and search-driven discovery entry points.
 */

import "../styles/Home.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import targetIconLight from "../assets/targetIcon.svg";
import targetIconDark from "../assets/targetIcon_white.svg";
import bookIconLight from "../assets/bookIcon.svg";
import bookIconDark from "../assets/bookIcon_white.svg";
import lightbulbIconLight from "../assets/lightbulbIcon.svg";
import lightbulbIconDark from "../assets/lightbulbIcon_white.svg";
import peopleIconLight from "../assets/peopleIcon.svg";
import peopleIconDark from "../assets/peopleIcon_white.svg";
import instaLogoLight from "../assets/instagram-logo.svg";
import instaLogoDark from "../assets/instagram-logo_white.svg";
import clockIconLight from "../assets/clock-icon.svg";
import clockIconDark from "../assets/clock-icon_white.svg";
import cntrLogo from "../assets/cntr-logo.png";
import srcLogo from "../assets/src_logo.svg";
import SearchBar from "../components/SearchBar";
import { ArrowRight } from "lucide-react";
import {
  getSections,
  getSubsections,
  getPreloadedNavigationData,
} from "../util/MarkdownData";
import { getSectionIconById } from "../util/sectionIcons";
import { LuChevronDown } from "react-icons/lu";

function getFirstParagraph(markdown = "") {
  const text = String(markdown)
    .replace(/^---[\s\S]*?---\s*/m, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/^#{1,6}\s+.*$/gm, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/\{[^}]+\}/g, "")
    .trim();

  const paragraphs = text
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\s+/g, " ").trim())
    .filter(Boolean);

  return paragraphs[0] || "";
}

function truncate(text = "", max = 130) {
  const value = String(text || "").trim();
  if (value.length <= max) return value;
  return `${value.slice(0, max).trimEnd()}...`;
}

function getInitialTheme() {
  if (typeof document === "undefined") return "light";

  const root = document.documentElement;
  const attrTheme = root?.getAttribute("data-theme");
  if (attrTheme === "light" || attrTheme === "dark") return attrTheme;

  const storedTheme = window.localStorage.getItem("srch-theme");
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  return storedTheme === "light" || storedTheme === "dark"
    ? storedTheme
    : prefersDark
      ? "dark"
      : "light";
}

function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [curriculumCards, setCurriculumCards] = useState([]);

  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const curriculumTitleRef = useRef(null);

  const [theme, setTheme] = useState(getInitialTheme);
  const [isMobileLayout, setIsMobileLayout] = useState(window.innerWidth < 800);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileLayout(window.innerWidth < 800);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (!root) return;
    const initialTheme = getInitialTheme();
    setTheme(initialTheme);
    root.setAttribute("data-theme", initialTheme);

    const observer = new MutationObserver(() => {
      const currentTheme = root.getAttribute("data-theme");
      if (currentTheme) {
        setTheme(currentTheme);
      }
    });
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  const getInstaLogo = () =>
    theme === "dark" ? instaLogoDark : instaLogoLight;

  const getTargetIcon = () =>
    theme === "dark" ? targetIconDark : targetIconLight;
  const getBookIcon = () => (theme === "dark" ? bookIconDark : bookIconLight);
  const getLightbulbIcon = () =>
    theme === "dark" ? lightbulbIconDark : lightbulbIconLight;
  const getPeopleIcon = () =>
    theme === "dark" ? peopleIconDark : peopleIconLight;

  const getClockIcon = () =>
    theme === "dark" ? clockIconDark : clockIconLight;

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const upperContentHeight = window.innerHeight * 0.4;
      setIsScrolledDown(scrollY > upperContentHeight);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (location.pathname !== "/" || location.hash !== "#curriculum") return;

    let attempts = 0;
    let timer = null;

    const scrollToCurriculum = () => {
      const target = document.getElementById("curriculum");
      const offset = 90;

      if (target) {
        const targetTop =
          target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: Math.max(0, targetTop), behavior: "smooth" });
        return;
      }

      attempts += 1;
      if (attempts < 8) {
        timer = window.setTimeout(scrollToCurriculum, 50);
      }
    };

    scrollToCurriculum();

    return () => {
      if (timer) window.clearTimeout(timer);
    };
  }, [location.pathname, location.hash]);

  useEffect(() => {
    let isCancelled = false;

    try {
      const preloaded = getPreloadedNavigationData();
      if (
        preloaded &&
        Array.isArray(preloaded.sections) &&
        preloaded.sections.length > 0
      ) {
        const sortedSections = [...preloaded.sections].sort(
          (a, b) => (a.order || 999) - (b.order || 999),
        );

        const cardsFromPreloaded = sortedSections
          .map((section) => ({
            id: section.id,
            title: section.title || section.id,
            slug: `/${section.id}`,
            description: truncate(getFirstParagraph(section.content)),
          }))
          .filter(Boolean);

        if (cardsFromPreloaded.length > 0) {
          setCurriculumCards(cardsFromPreloaded);
        }
      }
    } catch (e) {}

    const loadCurriculumCards = async () => {
      try {
        const sections = await getSections();
        if (isCancelled) return;

        const sortedSections = [...sections].sort(
          (a, b) => (a.order || 999) - (b.order || 999),
        );
        const subsectionResults = await Promise.all(
          sortedSections.map((section) => getSubsections(section.id)),
        );

        if (isCancelled) return;

        const cards = sortedSections
          .map((section, index) => ({
            section,
            subsections: subsectionResults[index] || [],
          }))
          .filter(
            ({ subsections }) =>
              Array.isArray(subsections) && subsections.length > 0,
          )
          .map(({ section }) => ({
            id: section.id,
            title: section.title || section.id,
            slug: `/${section.id}`,
            description: truncate(getFirstParagraph(section.content)),
          }));

        setCurriculumCards(cards);
      } catch {
        if (isCancelled) return;
        setCurriculumCards([]);
      }
    };

    loadCurriculumCards();

    return () => {
      isCancelled = true;
    };
  }, []);

  const getCardIcon = (sectionId) => {
    const src = getSectionIconById(sectionId, theme);
    if (!src) return null;
    return {
      src,
      alt: `${cardTitleFromSectionId(sectionId)} Icon`,
    };
  };

  const cardTitleFromSectionId = (sectionId) =>
    String(sectionId || "")
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/[-_]+/g, " ")
      .replace(/\b\w/g, (m) => m.toUpperCase())
      .trim() || "Section";

  const handleScrollClick = () => {
    if (curriculumTitleRef.current) {
      const navbarHeight = 70;
      const padding = 100;
      window.scrollTo({
        top: window.innerHeight - (navbarHeight + padding),
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="layout">
      <div className="body">
        <button
          className="scroll-caret-button"
          onClick={handleScrollClick}
          aria-label={isScrolledDown ? "Scroll to top" : "Scroll to curriculum"}
        >
          <LuChevronDown
            className={`scroll-caret-icon ${isScrolledDown ? "hidden" : ""}`}
            size="36"
          />
        </button>
        <div className="lower-content">
          <div className="content-section" id="curriculum">
            <div className="content-header">
              <div
                className="section-title"
                ref={curriculumTitleRef}
                style={{ overflowWrap: "break-word" }}
              >
                Check Out Our Curriculum
              </div>
              <div className="subtitle">
                Explore our focus areas of socially responsible computing
              </div>
            </div>

            <div className="card-grid">
              {curriculumCards.map((card, index) => {
                const icon = getCardIcon(card.id);
                return (
                  <div key={card.id}>
                    {isMobileLayout ? (
                      <button
                        className="topic-card"
                        onClick={() => navigate(card.slug)}
                      >
                        <div className="topic-card-flex">
                          <div className="card-accent" />

                          <div className="card-info">
                            <span className="card-number">
                              {String(index + 1).padStart(2, "0")}.
                            </span>

                            <div className="card-icon-wrap">
                              {icon ? (
                                <img
                                  src={icon.src}
                                  alt={icon.alt}
                                  width={52}
                                  height={52}
                                />
                              ) : null}
                            </div>
                          </div>
                          <div className="card-divider" />
                          <div>
                            <div className="card-body">
                              <div className="card-heading">{card.title}</div>
                              <div className="topic-subtext-mobile">
                                {card.description}
                              </div>
                            </div>
                            <div className="card-arrow-wrap">
                              <ArrowRight className="card-arrow" />
                            </div>
                          </div>
                        </div>
                      </button>
                    ) : (
                      <button
                        className="topic-card topic-card-flex"
                        onClick={() => navigate(card.slug)}
                      >
                        <div className="card-accent" />

                        <span className="card-number">
                          {String(index + 1).padStart(2, "0")}.
                        </span>

                        <div className="card-divider" />

                        <div className="card-icon-wrap">
                          {icon ? (
                            <img
                              src={icon.src}
                              alt={icon.alt}
                              width={52}
                              height={52}
                            />
                          ) : null}
                        </div>

                        <div className="card-body">
                          <div className="card-heading">{card.title}</div>
                          <div className="topic-subtext">
                            {card.description}
                          </div>
                        </div>

                        <ArrowRight className="card-arrow" />
                      </button>
                    )}
                  </div>
                );
              })}

              {curriculumCards.length % 2 !== 0 && (
                <div className="topic-card topic-card-flex placeholder-card">
                  <div className="outline-tip">
                    <img
                      src={getClockIcon()}
                      alt="Coming Soon Icon"
                      width={75}
                      height={92}
                      style={{ opacity: 0.5 }}
                    />
                  </div>
                  <div className="card" style={{ opacity: 0.7 }}>
                    <div className="card-heading">And more to come...</div>
                    <div className="topic-subtext">
                      The SRCH is constantly doing research and writing primers
                      to expand our content.
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="line-divider"></div>

          <div className="content-section">
            <div className="content-header">
              <div
                className="section-title"
                style={{ overflowWrap: "break-word" }}
              >
                Search for Content
              </div>
              <p className="subtitle">
                Find specific topics, case studies, and resources quickly
              </p>
            </div>
            <div className="landing-search-container">
              <SearchBar
                className="results-autofill"
                setSearchQuery={setSearchQuery}
                searchQuery={searchQuery}
                maxResults={2}
              />
            </div>
          </div>

          <div className="line-divider"></div>

          <div className="content-section">
            <div
              className="section-title"
              style={{ overflowWrap: "break-word" }}
            >
              How to Use the Handbook
            </div>
            <div className="how-to-section">
              <p className="intro-text">
                Each section contains a series of primers that are loosely
                aligned with learning objectives in the SRC curriculum. Use them
                to:
              </p>

              <div className="info-list">
                <div className="list-item">
                  <img
                    src={getTargetIcon()}
                    className="list-icon"
                    alt="Target Icon"
                    width={24}
                    height={24}
                  />
                  <p className="list-text">
                    Structure your lesson or course with embedded ethical
                    modules
                  </p>
                </div>

                <div className="list-item">
                  <img
                    src={getPeopleIcon()}
                    className="list-icon"
                    alt="People Icon"
                    width={24}
                    height={24}
                  />
                  <p className="list-text">
                    Give students real examples that connect tech to society
                  </p>
                </div>

                <div className="list-item">
                  <img
                    src={getLightbulbIcon()}
                    className="list-icon"
                    alt="Lightbulb Icon"
                    width={24}
                    height={24}
                  />
                  <p className="list-text">
                    Foster inclusive, critical thinking in the classroom
                  </p>
                </div>

                <div className="list-item">
                  <img
                    src={getBookIcon()}
                    className="list-icon"
                    alt="Book Icon"
                    width={24}
                    height={24}
                  />
                  <p className="list-text">
                    Adapt and contribute content so it remains relevant and
                    impactful
                  </p>
                </div>
              </div>
            </div>
            <div className="learn-more-container">
              <button
                className="generic-button"
                onClick={() => navigate("/about")}
              >
                <span>Learn More</span>
                <LuChevronDown className="button-icon" size="24" />
              </button>
            </div>
          </div>

          <div className="line-divider"></div>

          <div className="content-section connect-section">
            <div className="content-header">
              <div
                className="section-title"
                style={{ overflowWrap: "break-word" }}
              >
                Connect with Us
              </div>
              <p className="subtitle">
                Follow us to receive CNTR and SRC@Brown CS news and updates!
              </p>
            </div>
            <div className="cntr-link-area">
              <a
                className="connect-link"
                href="https://cntr.brown.edu/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  fontWeight: 400,
                }}
              >
                <div className="connect-cont">
                  <img src={cntrLogo} alt="CNTR logo" width={56} height={67} />
                  <p className="connect-text">
                    CNTR Website:
                    <br />
                    <span className="connect-link">cntr.brown.edu</span>
                  </p>
                </div>
              </a>
              <a
                className="connect-link"
                href="https://www.instagram.com/brown_cntr/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  fontWeight: 400,
                }}
              >
                <div className="connect-cont">
                  <img
                    src={getInstaLogo()}
                    alt="instagram logo"
                    width={52}
                    height={52}
                  />
                  <p className="connect-text">
                    CNTR Instagram:
                    <br />
                    <span className="connect-link">@brown_cntr</span>
                  </p>
                </div>
              </a>
              <a
                className="connect-link"
                href="https://responsible.cs.brown.edu/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  fontWeight: 400,
                }}
              >
                <div className="connect-cont">
                  <img src={srcLogo} alt="CNTR logo" width={56} height={67} />
                  <p className="connect-text">
                    SRC@Brown CS Website:
                    <br />
                    <span className="connect-link">
                      responsible.cs.brown.edu
                    </span>
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
