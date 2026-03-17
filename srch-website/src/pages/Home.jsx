import "../styles/Home.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import targetIconLight from "../assets/targetIcon.svg";
import targetIconDark from "../assets/targetIcon_white.svg";
import bookIconLight from "../assets/bookIcon.svg";
import bookIconDark from "../assets/bookIcon_white.svg";
import lightbulbIconLight from "../assets/lightbulbIcon.svg";
import lightbulbIconDark from "../assets/lightbulbIcon_white.svg";
import peopleIconLight from "../assets/peopleIcon.svg";
import peopleIconDark from "../assets/peopleIcon_white.svg";
import privacyIconLight from "../assets/privacy-icon.svg";
import privacyIconDark from "../assets/privacy-icon_white.svg";
import automatedIconLight from "../assets/decision-icon.svg";
import automatedIconDark from "../assets/decision-icon_white.svg";
import aiIconLight from "../assets/ai-icon.svg";
import aiIconDark from "../assets/ai-icon_white.svg";
import carotIconLight from "../assets/carot-icon.svg";
import carotIconDark from "../assets/carot-icon_white.svg";
import instaLogoLight from "../assets/instagram-logo.svg";
import instaLogoDark from "../assets/instagram-logo_white.svg";
import srcLogoLight from "../assets/src_logo.svg";
import srcLogoDark from "../assets/src_logo_white.svg";
import cntrLogo from "../assets/cntr-logo.png";
import accessibilityIconLight from "../assets/accessibility-icon.svg";
import accessibilityIconDark from "../assets/accessibility-icon_white.svg";
import SearchBar from "../components/SearchBar";

function Home() {
  const navigate = useNavigate();
  const privacySlug = "/privacy/whatIsPrivacy";
  const accessibilitySlug = "/accessibility/whatIsAccessibility";
  const decisionSlug = "/automatedDecisionMaking/fairness";
  const aiSlug = "/generativeAI/copyright";
  const [searchQuery, setSearchQuery] = useState("");

  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const curriculumTitleRef = useRef(null);

  const [theme, setTheme] = useState("light");
  useEffect(() => {
    const root = document.documentElement;
    if (!root) return;
    const storedTheme = window.localStorage.getItem("srch-theme");
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

    const observer = new MutationObserver(() => {
      const currentTheme = root.getAttribute("data-theme");
      if (currentTheme && currentTheme !== theme) {
        setTheme(currentTheme);
      }
    });
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, [theme]);

  const getPrivacyIcon = () =>
    theme === "dark" ? privacyIconDark : privacyIconLight;
  const getAutomatedIcon = () =>
    theme === "dark" ? automatedIconDark : automatedIconLight;
  const getAiIcon = () => (theme === "dark" ? aiIconDark : aiIconLight);
  const getCarotIcon = () =>
    theme === "dark" ? carotIconDark : carotIconLight;
  const getInstaLogo = () =>
    theme === "dark" ? instaLogoDark : instaLogoLight;
  const getSrcLogo = () => (theme === "dark" ? srcLogoDark : srcLogoLight);
  const getAccessibilityIcon = () =>
    theme === "dark" ? accessibilityIconDark : accessibilityIconLight;

  const getTargetIcon = () =>
    theme === "dark" ? targetIconDark : targetIconLight;
  const getBookIcon = () => (theme === "dark" ? bookIconDark : bookIconLight);
  const getLightbulbIcon = () =>
    theme === "dark" ? lightbulbIconDark : lightbulbIconLight;
  const getPeopleIcon = () =>
    theme === "dark" ? peopleIconDark : peopleIconLight;

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      // Check if user has scrolled past the upper-content section
      const scrollY = window.scrollY;
      const upperContentHeight = window.innerHeight * 0.4; // Approximate upper-content height
      setIsScrolledDown(scrollY > upperContentHeight);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle scroll to content or top
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
        <div className="upper-content">
          <div className="upper-text-section">
            <div className="website-title">Brown SRC Handbook</div>
            <div className="info-section">
              This Handbook is your guide to integrating ethics, responsibility,
              and social awareness into computer science teaching. Whether
              you're an instructor designing a syllabus, a TA leading
              discussions, or a student exploring what impact your work can
              have, this site offers curated modules, case studies, discussion
              prompts, and resource tools.
            </div>
          </div>
        </div>

        <div className="lower-content">
          <div className="content-section">
            <div className="content-header">
              <button
                className="scroll-caret-button"
                onClick={handleScrollClick}
                aria-label={
                  isScrolledDown ? "Scroll to top" : "Scroll to curriculum"
                }
              >
                <img
                  src={getCarotIcon()}
                  alt="Scroll"
                  className={`scroll-caret-icon ${isScrolledDown ? "hidden" : ""}`}
                />
              </button>
              <div
                className="section-title"
                ref={curriculumTitleRef}
                style={{ overflowWrap: "break-word" }}
              >
                Check out Our Curriculum
              </div>
              <div className="curriculum-subtext">
                Explore our focus areas of socially responsible computing
              </div>
            </div>

            <div className="card-grid">
              <button
                className="topic-card"
                onClick={() => navigate(privacySlug)}
              >
                <div className="outline-tip">
                  <img
                    src={getPrivacyIcon()}
                    alt="Privacy Icon"
                    width={75}
                    height={92}
                  />
                </div>
                <div className="card">
                  <div className="card-heading">Privacy</div>
                  <div className="topic-subtext">
                    Think critically about privacy and its applications to
                    computer science.
                  </div>
                </div>
              </button>
              <button
                className="topic-card"
                onClick={() => navigate(accessibilitySlug)}
              >
                <div className="outline-tip">
                  <img
                    src={getAccessibilityIcon()}
                    alt="Accessibility Icon"
                    width={75}
                    height={92}
                  />
                </div>
                <div className="card">
                  <div className="card-heading">Accessibility</div>
                  <div className="topic-subtext">
                    Think critically about accessibility and its applications to
                    computer science.
                  </div>
                </div>
              </button>
              <button
                className="topic-card"
                onClick={() => navigate(decisionSlug)}
              >
                <div className="outline-tip">
                  <img
                    src={getAutomatedIcon()}
                    alt="Automated Decision Making Icon"
                    width={75}
                    height={92}
                  />
                </div>
                <div className="card">
                  <div className="card-heading">Automated Decision Making</div>
                  <div className="topic-subtext">
                    Think critically about automated decision making and its
                    applications to computer science.
                  </div>
                </div>
              </button>
              <button className="topic-card" onClick={() => navigate(aiSlug)}>
                <div className="outline-tip">
                  <img
                    src={getAiIcon()}
                    alt="Generative AI Icon"
                    width={75}
                    height={92}
                  />
                </div>
                <div className="card">
                  <div className="card-heading">Generative AI</div>
                  <div className="topic-subtext">
                    Think critically about Generative AI and its applications to
                    computer science.
                  </div>
                </div>
              </button>
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
              <p className="search-subtitle">
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
                aligned with learning objectives in the SRC curriculum.{" "}
                <br></br> Use them to:
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
                className="learn-more-button"
                onClick={() => navigate("/about")}
              >
                <span className="learn-more-text">Learn more</span>
                <img
                  src={getCarotIcon()}
                  className="button-icon"
                  alt="Arrow for the Learn More Button"
                  width={24}
                  height={24}
                />
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
              <p className="search-subtitle">
                Follow us to receive CNTR news and updates!
              </p>
            </div>
            <div className="cntr-link-area">
              <a
                className="connect-link"
                href="https://cntr.brown.edu/"
                target="blank"
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
                target="blank"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
