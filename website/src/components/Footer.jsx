import "../styles/Footer.css";
import { useNavigate } from "react-router-dom";
import logoLight from "../assets/srch_logo.svg";
import logoDark from "../assets/srch_logo_white.svg";
import { Box, Image } from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import {
  getPreloadedNavigationData,
  preloadNavigationData,
} from "../util/MarkdownRenderer";
import { getSectionIconById } from "../util/sectionIcons";

function Footer({
  withSidebars = false,
  isLeftOpen = false,
  leftWidth = 322,
  isRightOpen = false,
  rightWidth = 300,
}) {
  const navigate = useNavigate();
  const footerRef = useRef(null);
  const [theme, setTheme] = useState("light");
  const [moduleLinks, setModuleLinks] = useState([]);

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
        if (!isMounted || !Array.isArray(sections) || sections.length === 0) {
          return;
        }

        const links = sections.map((section) => {
          const slug = `/${section.id}`;

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

  useEffect(() => {
    const footerEl = footerRef.current;
    if (!footerEl || typeof document === "undefined") return;

    const updateFooterHeight = () => {
      document.documentElement.style.setProperty(
        "--footer-height",
        `${Math.round(footerEl.getBoundingClientRect().height)}px`,
      );
    };

    updateFooterHeight();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateFooterHeight, { passive: true });
      return () => {
        window.removeEventListener("resize", updateFooterHeight);
      };
    }

    const ro = new ResizeObserver(() => {
      updateFooterHeight();
    });

    ro.observe(footerEl);
    window.addEventListener("resize", updateFooterHeight, { passive: true });

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateFooterHeight);
    };
  }, []);

  const getLogo = () => (theme === "dark" ? logoDark : logoLight);
  function getModuleIconById(sectionId) {
    return getSectionIconById(sectionId, theme);
  }

  return (
    <Box
      ref={footerRef}
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
              {moduleLinks.map((module) => {
                const iconSrc = getModuleIconById(module.id);

                return (
                  <div className="primer-link-primer-footer" key={module.id}>
                    <div className="primer-link-photo-primer-footer">
                      {iconSrc ? (
                        <img
                          className="footer-icon"
                          src={iconSrc}
                          alt={`${module.title} Icon`}
                          width={24}
                          height={24}
                        />
                      ) : null}
                    </div>
                    <button
                      onClick={() => navigate(module.slug)}
                      className="module-link-primer-footer"
                    >
                      {module.title}
                    </button>
                  </div>
                );
              })}
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
