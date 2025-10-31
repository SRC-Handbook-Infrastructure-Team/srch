
import "../LandingPage.css";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import logoImage from "../assets/logo.png";
import buttonArrow from "../assets/button-arrow.png";
import targetIcon from "../assets/targetIcon.png";
import bookIcon from "../assets/bookIcon.png";
import lightbulbIcon from "../assets/lightbulbIcon.png";
import peopleIcon from "../assets/peopleIcon.png";
import privacyIcon from "../assets/privacy-icon.jpg";
import automatedIcon from "../assets/automated.png";
import aiIcon from "../assets/ai-icon.png";
import accessibilityIcon from "../assets/accessibility-icon.png";

function Home() {
  const navigate = useNavigate();
  const privacySlug = "/privacy/whatIsPrivacy";
  const accessibilitySlug = "/accessibility/whatIsAccessibility";
  const decisionSlug = "/automatedDecisionMaking/fairness";
  const aiSlug = "/generativeAI/copyright";

  return (
    <div className="layout">
      <NavBar />
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
              <div className="curriculum-title">Check out our curriculum</div>
              <div className="curriculum-subtext">
                Explore our focus areas of socially responsible computing
              </div>
            </div>

            <div className="card-grid">
              {/* Privacy Curriculum Card */}
              <button
                className="topic-card"
                onClick={() => navigate(privacySlug)}
              >
                <div className="outline-tip">
                  <img
                    src={privacyIcon}
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

              {/* Accessibility Curriculum Card */}
              <button
                className="topic-card"
                onClick={() => navigate(accessibilitySlug)}
              >
                <div className="outline-tip">
                  <img
                    src={accessibilityIcon}
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

              {/* Decision-Making Curriculum Card */}
              <button
                className="topic-card"
                onClick={() => navigate(decisionSlug)}
              >
                <div className="outline-tip">
                  <img
                    src={automatedIcon}
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

              {/* Generative AI Curriculum Card */}
              <button className="topic-card" onClick={() => navigate(aiSlug)}>
                <div className="outline-tip">
                  <img
                    src={aiIcon}
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

          <div className="content-section" style={{ paddingBottom: "84px" }}>
            <div className="content-header">
              <h2 className="search-title" style={{ paddingTop: "84px" }}>
                Search for Content
              </h2>
              <p className="search-subtitle">
                Find specific topics, case studies, and resources quickly
              </p>
            </div>

            <div className="search-bar">
              <svg className="search-icon" viewBox="0 0 28 28" fill="none">
                <path
                  d="M11.1366 19.2731C8.86249 19.2731 6.93809 18.4853 5.36336 16.9098C3.78862 15.3342 3.00084 13.4098 3 11.1366C2.99917 8.86333 3.78695 6.93893 5.36336 5.36336C6.93976 3.78779 8.86416 3 11.1366 3C13.409 3 15.3338 3.78779 16.911 5.36336C18.4883 6.93893 19.2756 8.86333 19.2731 11.1366C19.2731 12.0545 19.1271 12.9203 18.835 13.734C18.5429 14.5477 18.1465 15.2674 17.6458 15.8933L24.6558 22.9033C24.8853 23.1328 25 23.4248 25 23.7795C25 24.1342 24.8853 24.4263 24.6558 24.6558C24.4263 24.8853 24.1342 25 23.7795 25C23.4248 25 23.1328 24.8853 22.9033 24.6558L15.8933 17.6458C15.2674 18.1465 14.5477 18.5429 13.734 18.835C12.9203 19.1271 12.0545 19.2731 11.1366 19.2731ZM11.1366 16.7696C12.7013 16.7696 14.0315 16.2221 15.1272 15.1272C16.2229 14.0323 16.7704 12.7021 16.7696 11.1366C16.7687 9.571 16.2213 8.24119 15.1272 7.14714C14.0332 6.05309 12.7029 5.50522 11.1366 5.50356C9.57017 5.50189 8.24036 6.04975 7.14714 7.14714C6.05392 8.24453 5.50606 9.57434 5.50356 11.1366C5.50105 12.6988 6.04891 14.029 7.14714 15.1272C8.24537 16.2255 9.57517 16.7729 11.1366 16.7696Z"
                  fill="#222222"
                />
              </svg>
              <input
                type="text"
                className="search-placeholder"
                placeholder="Search for topics, case studies, terms..."
              />
            </div>
          </div>

          <div className="line-divider"></div>

          <div className="text-section">
            <h2 className="section-title" style={{ paddingTop: "84px" }}>
              How to use the handbook
            </h2>
            <div className="how-to-section">
              <p
                className="intro-text"
                style={{ fontSize: "20px", paddingBottom: "36px" }}
              >
                Each section contains a series of primers that are loosely
                aligned with learning objectives in the SRC curriculum. Use them
                to:
              </p>

              <div className="info-list">
                <div className="list-item">
                  <img
                    src={targetIcon}
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
                    src={peopleIcon}
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
                    src={lightbulbIcon}
                    alt="Lightbulb Icon"
                    width={24}
                    height={24}
                  />
                  <p className="list-text">
                    Foster inclusive, critical thinking in the classroom
                  </p>
                </div>

                <div className="list-item">
                  <img src={bookIcon} alt="Book Icon" width={24} height={24} />
                  <p className="list-text">
                    Adapt and contribute content so it remains relevant and
                    impactful
                  </p>
                </div>
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
                src={buttonArrow}
                alt="Arrow for the Learn More Button"
                width={24}
                height={24}
              />
            </button>
          </div>

          <div className="line-divider"></div>

          <div className="link-section">
            <div className="logo-area">
              <img
                src={logoImage}
                alt="SRC Handbook Logo"
                width={100}
                height={91}
              />
            </div>

            <div className="modules">
              <div className="modules-heading">Modules</div>
              <div className="primer-link">
                <div className="primer-link-photo">
                  <img
                    src={privacyIcon}
                    alt="Privacy Icon"
                    width={24}
                    height={24}
                  />
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
                  <img
                    src={accessibilityIcon}
                    alt="Accessibility Icon"
                    width={24}
                    height={24}
                  />
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
                  <img
                    src={automatedIcon}
                    alt="Automated Decision Making Icon"
                    width={24}
                    height={24}
                  />
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
                  <img
                    src={aiIcon}
                    alt="Generative AI Icon"
                    width={24}
                    height={24}
                  />
                </div>
                <button
                  onClick={() => navigate(aiSlug)}
                  className="module-link"
                >
                  Generative AI
                </button>
              </div>
            </div>

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

            <div className="modules">
              <div className="module-heading">Have Feedback?</div>
              <p className="feedback-contact">
                Contact:{" "}
                <a href="mailto:src_handbook@brown.edu">
                  src_handbook@brown.edu
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
