import "../styles/Footer.css";
import { useNavigate } from "react-router-dom";
import logoLight from "../assets/srch_logo.svg";
import logoDark from "../assets/srch_logo_white.svg";
import privacyIconLight from "../assets/privacy-icon.svg";
import privacyIconDark from "../assets/privacy-icon_white.svg";
import automatedDecisionMakingIconLight from "../assets/automatedDecisionMaking-icon.svg";
import automatedDecisionMakingIconDark from "../assets/automatedDecisionMaking-icon_white.svg";
import generativeAIIconLight from "../assets/generativeAI-icon.svg";
import generativeAIIconDark from "../assets/generativeAI-icon_white.svg";
import accessibilityIconLight from "../assets/accessibility-icon.svg";
import accessibilityIconDark from "../assets/accessibility-icon_white.svg";
import { Box, Image } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import {
  getPreloadedNavigationData,
  preloadNavigationData,
} from "../util/MarkdownRenderer";

function Footer({
  withSidebars = false,
  isLeftOpen = false,
  leftWidth = 300,
  isRightOpen = false,
  rightWidth = 300,
}) {
  const navigate = useNavigate();
  const [theme, setTheme] = useState("light");
  const [moduleLinks, setModuleLinks] = useState([
    { id: "privacy", title: "Privacy", slug: "/privacy/whatIsPrivacy" },
    {
      id: "accessibility",
      title: "Accessibility",
      slug: "/accessibility/whatIsAccessibility",
    },
    {
      id: "automatedDecisionMaking",
      title: "Automated Decision Making",
      slug: "/automatedDecisionMaking/fairness",
    },
    {
      id: "generativeAI",
      title: "Generative AI",
      slug: "/generativeAI/copyright",
    },
  ]);

  useEffect(() => {
    const root = document.documentElement;
    if (!root) return;
    const getCurrentTheme = () => {
      return root.getAttribute("data-theme") || "light";
    };
    setTheme(getCurrentTheme());

    const observer = new MutationObserver(() => {
      setTheme(getCurrentTheme());
    });
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function loadFooterLinksFromCache() {
      try {
        let preloaded = getPreloadedNavigationData();
        if (!preloaded) {
          preloaded = await preloadNavigationData();
        }

        const sections = preloaded?.sections || [];
        const subsectionsMap = preloaded?.subsections || {};

        if (!isMounted || !Array.isArray(sections) || sections.length === 0) {
          return;
        }

        const links = sections.map((section) => {
          const sectionSubsections = subsectionsMap[section.id] || [];
          const slug =
            sectionSubsections.length > 0
              ? `/${section.id}/${sectionSubsections[0].id}`
              : `/${section.id}`;

          return {
            id: section.id,
            title: section.title || section.id,
            slug,
          };
        });

        if (links.length > 0) {
          setModuleLinks(links);
        }
      } catch (error) {
        console.error("Error loading footer module links from cache:", error);
      }
    }

    loadFooterLinksFromCache();

    return () => {
      isMounted = false;
    };
  }, []);

  const getLogo = () => (theme === "dark" ? logoDark : logoLight);
  const getPrivacyIcon = () =>
    theme === "dark" ? privacyIconDark : privacyIconLight;
  const getAutomatedDecisionMakingIcon = () =>
    theme === "dark"
      ? automatedDecisionMakingIconDark
      : automatedDecisionMakingIconLight;
  const getGenerativeAIIcon = () =>
    theme === "dark" ? generativeAIIconDark : generativeAIIconLight;
  const getAccessibilityIcon = () =>
    theme === "dark" ? accessibilityIconDark : accessibilityIconLight;

  function getModuleIconById(sectionId) {
    switch (sectionId) {
      case "privacy":
        return getPrivacyIcon();
      case "accessibility":
        return getAccessibilityIcon();
      case "automatedDecisionMaking":
        return getAutomatedDecisionMakingIcon();
      case "generativeAI":
        return getGenerativeAIIcon();
      default:
        return getPrivacyIcon();
    }
  }

  return (
    <Box
      className={`footer-container ${withSidebars ? "with-sidebars" : ""} ${isLeftOpen ? "left-open" : ""} ${isRightOpen ? "right-open" : ""}`.trim()}
      style={{
        "--left-sidebar-width": `${leftWidth}px`,
        "--right-sidebar-width": `${rightWidth}px`,
      }}
    >
      <div className="footer-line-divider"></div>
      <div className="footer-content">
        <div className="footer-box">
          <div className="logo-container hide-wide show-narrow">
            <Image
              src={getLogo()}
              alt="Socially Responsible Computing Handbook"
              height={"30px"}
              objectFit="contain"
            />
          </div>
          <div className="links-section">
            <div className="logo-container show-wide hide-narrow">
              <Image
                src={getLogo()}
                alt="Socially Responsible Computing Handbook"
                height={"50px"}
                objectFit="contain"
              />
            </div>
            <div>
              <div className="heading-footer">Modules</div>
              {moduleLinks.map((module) => (
                <div className="primer-link-primer-footer" key={module.id}>
                  <div className="primer-link-photo-primer-footer">
                    <img
                      className="footer-icon"
                      src={getModuleIconById(module.id)}
                      alt={`${module.title} Icon`}
                      width={24}
                      height={24}
                    />
                  </div>
                  <button
                    onClick={() => navigate(module.slug)}
                    className="module-link-primer-footer"
                  >
                    {module.title}
                  </button>
                </div>
              ))}
            </div>
            <div className="footer-links">
              <div className="heading-footer">Quick Links</div>
              <button
                onClick={() => navigate("/about")}
                className="module-link-primer-footer"
              >
                About
              </button>
              <button
                onClick={() => navigate("/acknowledgments")}
                className="module-link-primer-footer"
              >
                Acknowledgments
              </button>
              <div className="footer-links second-column show-narrow hide-wide">
                <div className="heading-footer">Have Feedback?</div>
                <p className="feedback-footer">
                  Contact:{" "}
                  <a href="mailto:src_handbook@brown.edu">
                    src_handbook@brown.edu
                  </a>
                </p>
                <p className="feedback-footer">
                  <a href="https://docs.google.com/forms/d/e/1FAIpQLSex69OXWeME_pnC5IOYB754xsxmu8SH7rdV_LF-k7Q_TefHaA/viewform?usp=dialog">
                    Bug Report Form
                  </a>
                </p>
              </div>
            </div>
            <div className="footer-links show-wide hide-narrow">
              <div className="heading-footer">Have Feedback?</div>
              <p className="feedback-footer">
                Contact:{" "}
                <a href="mailto:src_handbook@brown.edu">
                  src_handbook@brown.edu
                </a>
              </p>
              <p className="feedback-footer">
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSex69OXWeME_pnC5IOYB754xsxmu8SH7rdV_LF-k7Q_TefHaA/viewform?usp=dialog">
                  Bug Report Form
                </a>
              </p>
            </div>
          </div>
          <p className="copyright">
            © 2026 Brown University. All rights reserved.
          </p>
        </div>
      </div>
    </Box>
  );
}

export default Footer;
