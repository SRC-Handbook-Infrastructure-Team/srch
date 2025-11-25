import logoImage from "../assets/logo.png";
import privacyIcon from "../assets/privacy-icon.svg";
import automatedIcon from "../assets/decision-icon.svg";
import aiIcon from "../assets/ai-icon.svg";
import accessibilityIcon from "../assets/accessibility-icon.svg";
import {
  Box,
  HStack,
  VStack,
  Image,
  Text,
  Icon,
  Collapse,
} from "@chakra-ui/react";
import "../LandingPage.css"
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  const privacySlug = "/privacy/whatIsPrivacy";
  const accessibilitySlug = "/accessibility/whatIsAccessibility";
  const decisionSlug = "/automatedDecisionMaking/fairness";
  const aiSlug = "/generativeAI/copyright";

  
    return (
    <Box className="footer-container">
      {/* use a footer-specific divider so it can be full-width */}
      <div className="page-divider page-divider-margin"></div>


        <div className="link-section-primer-footer">
          <div className="modules-section-primer-footer">
            <div className="modules-primer-footer">
              <div className="logo-area-primer-footer">
            <img
              src={logoImage}
              alt="SRC Handbook Logo"
              width={100}
              height={91}
            />
          </div>
              <div className="module-heading-primer-footer">Have Feedback?</div>
              <p className="feedback-contact-primer-footer">
                Contact:{" "}
                <a href="mailto:src_handbook@brown.edu">
                  src_handbook@brown.edu
                </a>
              </p>
            </div>
            <div className="modules-primer-footer">
              <div className="modules-heading-primer-footer">Modules</div>
              <div className="primer-link-primer-footer">
                <div className="primer-link-photo-primer-footer">
                  <img
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
            <div className="modules-primer-footer">
              <div className="module-heading-primer-footer">Quick Links</div>
              <div className="module-links-primer-footer">
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
            </div>
          </div>
          <p className="feedback-contact-primer-footer">
            © 2025 Brown University. All rights reserved.
          </p>
        </div>
        </Box>
    )
}

 export default Footer;