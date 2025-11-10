import "../LandingPage.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import logoImage from "../assets/logo.png";
import buttonArrow from "../assets/arrow.svg";
import targetIcon from "../assets/target.svg";
import bookIcon from "../assets/book.svg";
import lightbulbIcon from "../assets/lightbulb.svg";
import peopleIcon from "../assets/people.svg";
import privacyIcon from "../assets/privacy.svg";
import automatedIcon from "../assets/automated-decision-making.svg";
import aiIcon from "../assets/generative-ai.svg";
import accessibilityIcon from "../assets/accessibility.svg";
import backgroundGradient from "../assets/landing-page-background-gradient.png";
import { SearchBar } from "../components/SearchBar";

function Home() {
  const navigate = useNavigate();
  const privacySlug = "/privacy/whatIsPrivacy";
  const accessibilitySlug = "/accessibility/whatIsAccessibility";
  const decisionSlug = "/automatedDecisionMaking/fairness";
  const aiSlug = "/generativeAI/copyright";
  const [searchQuery, setSearchQuery] = useState("");

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
                    className="smaller-icon"
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
                    className="smaller-icon"
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
                    className="smaller-icon"
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
            <SearchBar
              className="searchbar-border"
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              canExpand={false}
              maxResults={2}
              align="stretch"
            ></SearchBar>
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
                    className="module-icon dark-mode-icon"
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
                    className="module-icon dark-mode-icon"
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
                    className="module-icon dark-mode-icon"
                    width={24}
                    height={24}
                  />
                  <p className="list-text">
                    Foster inclusive, critical thinking in the classroom
                  </p>
                </div>

                <div className="list-item">
                  <img src={bookIcon} alt="Book Icon" 
                  className="module-icon dark-mode-icon"
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
                className="arrow-icon"
                width={24}
                height={24}
                style={{ display: 'inline-block' }}
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
