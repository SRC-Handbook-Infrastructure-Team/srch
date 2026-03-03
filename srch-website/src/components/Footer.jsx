import "../styles/Footer.css";
import { useNavigate } from "react-router-dom";
import logoLight from "../assets/srch_logo.svg";
import logoDark from "../assets/srch_logo_white.svg";
import privacyIconLight from "../assets/privacy-icon.svg";
import privacyIconDark from "../assets/privacy-icon_white.svg";
import automatedIconLight from "../assets/decision-icon.svg";
import automatedIconDark from "../assets/decision-icon_white.svg";
import aiIconLight from "../assets/ai-icon.svg";
import aiIconDark from "../assets/ai-icon_white.svg";
import accessibilityIconLight from "../assets/accessibility-icon.svg";
import accessibilityIconDark from "../assets/accessibility-icon_white.svg";
import { Box, Image } from "@chakra-ui/react";
import { useState, useEffect } from "react";

function Footer() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState("light");

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

  const getLogo = () => (theme === "dark" ? logoDark : logoLight);
  const getPrivacyIcon = () =>
    theme === "dark" ? privacyIconDark : privacyIconLight;
  const getAutomatedIcon = () =>
    theme === "dark" ? automatedIconDark : automatedIconLight;
  const getAiIcon = () => (theme === "dark" ? aiIconDark : aiIconLight);
  const getAccessibilityIcon = () =>
    theme === "dark" ? accessibilityIconDark : accessibilityIconLight;

  const privacySlug = "/privacy/whatIsPrivacy";
  const accessibilitySlug = "/accessibility/whatIsAccessibility";
  const decisionSlug = "/automatedDecisionMaking/fairness";
  const aiSlug = "/generativeAI/copyright";

  return (
    <Box className="footer-container">
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
              <div className="primer-link-primer-footer">
                <div className="primer-link-photo-primer-footer">
                  <img
                    className="footer-icon"
                    src={getPrivacyIcon()}
                    alt="Privacy Icon"
                    width={24}
                    height={24}
                  />
                </div>
                <button
                  onClick={() => navigate(privacySlug)}
                  className="module-link-primer-footer"
                >
                  Privacy
                </button>
              </div>

              <div className="primer-link-primer-footer">
                <div className="primer-link-photo-primer-footer">
                  <img
                    className="footer-icon"
                    src={getAccessibilityIcon()}
                    alt="Accessibility Icon"
                    width={24}
                    height={24}
                  />
                </div>
                <button
                  onClick={() => navigate(accessibilitySlug)}
                  className="module-link-primer-footer"
                >
                  Accessibility
                </button>
              </div>

              <div className="primer-link-primer-footer">
                <div className="primer-link-photo-primer-footer">
                  <img
                    className="footer-icon"
                    src={getAutomatedIcon()}
                    alt="Automated Decision Making Icon"
                    width={24}
                    height={24}
                  />
                </div>
                <button
                  onClick={() => navigate(decisionSlug)}
                  className="module-link-primer-footer"
                >
                  Automated Decision Making
                </button>
              </div>

              <div className="primer-link-primer-footer">
                <div className="primer-link-photo-primer-footer">
                  <img
                    className="footer-icon"
                    src={getAiIcon()}
                    alt="Generative AI Icon"
                    width={24}
                    height={24}
                  />
                </div>
                <button
                  onClick={() => navigate(aiSlug)}
                  className="module-link-primer-footer"
                >
                  Generative AI
                </button>
              </div>
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
