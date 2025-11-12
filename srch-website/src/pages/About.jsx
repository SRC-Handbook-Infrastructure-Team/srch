/**
 * ============================================================================
 * About.jsx — full-hero overlay version (matches Acknowledgements + Home)
 * ----------------------------------------------------------------------------
 * • Full-viewport fixed hero using SRC gradient image
 * • Text block overlays the hero background
 * • Lower content slides upward after hero scroll
 * • No ContentsSidebar on this page
 * ============================================================================
 */

import "../About.css";
import NavBar from "../components/NavBar";
import logoImage from "../assets/logo.png";
import privacyIcon from "../assets/privacy-icon.svg";
import automatedIcon from "../assets/decision-icon.svg";
import aiIcon from "../assets/ai-icon.svg";
import accessibilityIcon from "../assets/accessibility-icon.svg";

export default function About() {
  return (
    <>
      <NavBar />

      {/* 1. FIXED HERO (same structure as Acknowledgements) */}
      <div className="about-hero">
        <div className="about-upper-text">
          <div className="about-title">
            About the SRC
            <br />
            Handbook
          </div>
          <p className="about-sub">
            Learn how to use this resource, how it’s structured, and the story
            behind its creation.
          </p>
        </div>
      </div>

      {/* 2. LOWER CONTENT that scrolls above the hero */}
      <div className="about-lower-content">
        <section className="about-section">
          <h2>How to use the handbook</h2>

          <p>
            Each section contains a series of primers that are loosely aligned
            with learning objectives in the SRC curriculum. Use them to:
          </p>

          <ul>
            <li>
              <strong>Structure your lesson or course</strong> with embedded
              ethical modules
            </li>
            <li>
              <strong>Give students real examples</strong> that connect tech to
              society
            </li>
            <li>
              <strong>Foster inclusive, critical thinking</strong> in the
              classroom
            </li>
            <li>
              <strong>Adapt and contribute content</strong> so it remains
              relevant and impactful
            </li>
          </ul>
        </section>

        <div className="line-divider"></div>
        {/* 3) Footer (structurally mirrors Home’s link-section block) */}
        <div className="link-section">
          {/* Logo column */}
          <div className="logo-area">
            <img
              src={logoImage}
              alt="SRC Handbook Logo"
              className="footer-logo"
            />
          </div>

          {/* Modules column */}
          <div className="modules">
            <div className="modules-heading">Modules</div>

            <div className="primer-link">
              <div className="primer-link-photo">
                <img src={privacyIcon} alt="Privacy Icon" />
              </div>
              <button
                onClick={() => navigate(privacySlug)}
                className="module-link"
              >
                Privacy
              </button>
            </div>

            <div className="primer-link">
              <div className="primer-link-photo">
                <img src={accessibilityIcon} alt="Accessibility Icon" />
              </div>
              <button
                onClick={() => navigate(accessibilitySlug)}
                className="module-link"
              >
                Accessibility
              </button>
            </div>

            <div className="primer-link">
              <div className="primer-link-photo">
                <img src={automatedIcon} alt="Automated Decision Making Icon" />
              </div>
              <button
                onClick={() => navigate(decisionSlug)}
                className="module-link"
              >
                Automated Decision Making
              </button>
            </div>

            <div className="primer-link">
              <div className="primer-link-photo">
                <img src={aiIcon} alt="Generative AI Icon" />
              </div>
              <button onClick={() => navigate(aiSlug)} className="module-link">
                Generative AI
              </button>
            </div>
          </div>

          {/* Quick links column */}
          <div className="modules">
            <div className="module-heading">Quick Links</div>
            <div className="module-links">
              <button
                onClick={() => navigate("/about")}
                className="module-link"
              >
                About
              </button>
              <button
                onClick={() => navigate("/acknowledgements")}
                className="module-link"
              >
                Acknowledgements
              </button>
            </div>
          </div>

          {/* Feedback column */}
          <div className="modules">
            <div className="module-heading">Have Feedback?</div>
            <p className="feedback-contact">
              Contact:{" "}
              <a href="mailto:src_handbook@brown.edu">src_handbook@brown.edu</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
