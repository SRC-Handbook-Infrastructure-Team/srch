import "../styles/Footer.css";
import { useNavigate } from "react-router-dom";
import logoImage from "../assets/logo.png";
import privacyIcon from "../assets/privacy-icon.svg";
import automatedIcon from "../assets/decision-icon.svg";
import aiIcon from "../assets/ai-icon.svg";
import accessibilityIcon from "../assets/accessibility-icon.svg";
import { Box } from "@chakra-ui/react";

function Footer() {
  const navigate = useNavigate();

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
            <img
              src={logoImage}
              className="logo-image-footer"
              alt="SRC Handbook Logo"
              width={100}
              height={31.58}
              onClick={() => navigate("/")}
            />
          </div>
          <div className="links-section">
            <div className="logo-container show-wide hide-narrow">
              <img
                src={logoImage}
                className="logo-image-footer"
                alt="SRC Handbook Logo"
                width={100}
                height={31.58}
                onClick={() => navigate("/")}
              />
            </div>
            <div>
              <div className="heading-footer">Modules</div>
              <div className="primer-link-primer-footer">
                <div className="primer-link-photo-primer-footer">
                  <img
                    className="footer-icon"
                    src={privacyIcon}
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
                    src={accessibilityIcon}
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
                    src={automatedIcon}
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
                    src={aiIcon}
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
              <div className="footer-links">
                <div className="heading-footer">Quick Links</div>
                <button
                  onClick={() => navigate("/about")}
                  className="module-link-primer-footer"
                >
                  About
                </button>
                <button
                  onClick={() => navigate("/acknowledgements")}
                  className="module-link-primer-footer"
                >
                  Acknowledgements
                </button>
              </div>
              <div className="footer-links second-column show-narrow hide-wide">
                <div className="heading-footer">Have Feedback?</div>
                <p className="feedback-footer">
                  Contact:{" "}
                  <a href="mailto:src_handbook@brown.edu">
                    src_handbook@brown.edu
                  </a>
                </p>
                <p className="feedback-footer">
                  <a href="?">Bug Report Form</a>
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
            © 2025 Brown University. All rights reserved.
          </p>
        </div>
      </div>
    </Box>
  );
}

export default Footer;
