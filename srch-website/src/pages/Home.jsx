import "../LandingPage.css";
import "../ContentPage.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logoImage from "../assets/logo.png";
import buttonArrow from "../assets/button-arrow.png";
import targetIcon from "../assets/targetIcon.png";
import bookIcon from "../assets/bookIcon.png";
import lightbulbIcon from "../assets/lightbulbIcon.png";
import peopleIcon from "../assets/peopleIcon.png";
import privacyIcon from "../assets/privacy-icon.svg";
import automatedIcon from "../assets/decision-icon.svg";
import aiIcon from "../assets/ai-icon.svg";
import instaLogo from "../assets/instagram-logo.svg";
import cntrLogo from "../assets/cntr-logo.png";
import accessibilityIcon from "../assets/accessibility-icon.svg";
import { SearchBar } from "../components/SearchBar";
import Footer from "../components/Footer"


function Home() {
  const navigate = useNavigate();
  const privacySlug = "/privacy/whatIsPrivacy";
  const accessibilitySlug = "/accessibility/whatIsAccessibility";
  const decisionSlug = "/automatedDecisionMaking/fairness";
  const aiSlug = "/generativeAI/copyright";
  const [searchQuery, setSearchQuery] = useState("");

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

          <div className="content-section">
            <div className="content-header">
              <h2 className="search-title">Search for Content</h2>
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
            <h2
              className="section-title"
              style={{ overflowWrap: "break-word" }}
            >
              How to use the Handbook
            </h2>
            <div className="how-to-section">
              <p className="intro-text">
                Each section contains a series of primers that are loosely
                aligned with learning objectives in the SRC curriculum.{" "}
                <br></br> Use them to:
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
          </div>

          <div className="line-divider"></div>

          <div className="content-section">
            <div className="content-header">
              <h2 className="search-title">Connect with Us</h2>
              <p className="search-subtitle">
                Follow us to receive CNTR news and updates!
              </p>
            </div>
            <div className="cntr-link-area">
              <div className="connect-cont">
                <img src={cntrLogo} alt="CNTR logo" width={56} height={67} />
                <p className="connect-text">
                  CNTR Website:
                  <br />
                  <a
                    className="connect-link"
                    href="https://cntr.brown.edu/"
                    target="blank"
                  >
                    cntr.brown.edu
                  </a>
                </p>
              </div>
              <div
                className="connect-cont"
              >
                <img
                  src={instaLogo}
                  alt="instagram logo"
                  width={56}
                  height={56}
                />
                <p className="connect-text">
                  CNTR Instagram:
                  <br />
                  <a
                    className="connect-link"
                    href="https://www.instagram.com/brown_cntr/"
                    target="blank"
                  >
                    @brown_cntr
                  </a>
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
          <Footer/>

    </div>
  );
}

export default Home;
