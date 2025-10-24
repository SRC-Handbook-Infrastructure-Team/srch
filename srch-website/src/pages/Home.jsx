import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { SearchBar } from "../components/SearchBar";
import ResultsWindow from "../components/ResultsWindow";
import { background, Heading } from "@chakra-ui/react";
import logoImage from "../assets/logo.png";
import privacyIcon from "../assets/privacy-icon.jpg";
import automatedIcon from "../assets/automated.png";
import aiIcon from "../assets/ai-icon.png";
import accessibilityIcon from "../assets/accessibility-icon.png";
import backgroundGradient from "../assets/landing-page-background-gradient.png";

function Home() {
  return (
    <div
      data-layer="landing-page"
      class="layout"
      style={{
        width: "1512px",
        background: "white",
        overflow: "hidden",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        display: "inline-flex",
      }}
    >
      <NavBar />
      <div
        className="Body"
        style={{
          alignSelf: "stretch",
          overflow: "hidden",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: "36px",
          display: "flex",
        }}
      >
        <div
          className="UpperContent"
          style={{
            alignSelf: "stretch",
            paddingBottom: "24px",
            paddingLeft: "200px",
            paddingRight: "200px",
            position: "relative",
            borderTop: "1px white solid",
            justifyContent: "flex-start",
            alignItems: "flex-end",
            gap: "56px",
            display: "inline-flex",
          }}
        >
          <div
            className="background-gradient"
            style={{
              width: "1512px",
              height: "568px",
              left: "0px",
              top: "0px",
              position: "absolute",
              backgroundImage: `url(${backgroundGradient})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              zIndex: 0,
            }}
          ></div>
          <div
            className="TextSection"
            style={{
              width: "582px",
              paddingTop: "100px",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: "36px",
              display: "inline-flex",
              zIndex: 1,
            }}
          >
            <div
              className="website-title"
              style={{
                alignSelf: "stretch",
                color: "black",
                fontSize: "84px",
                fontFamily: "Funnel Sans, sans-serif",
                color: "#000",
                fontStyle: "normal",
                fontWeight: "1000",
                lineHeight: "100px",
                wordWrap: "break-word",
              }}
            >
              Brown SRC Handbook
            </div>
            <div
              className="infoSection"
              style={{
                alignSelf: "stretch",
                color: "black",
                fontSize: "18px",
                fontFamily: "Be Vietnam Pro, sans-serif",
                fontWeight: "400px",
                lineHeight: "28px",
                wordWrap: "break-word",
              }}
            >
              This Handbook is your guide to integrating ethics, responsibility,
              and social awareness into computer science teaching. Whether
              you're an instructor designing a syllabus, a TA leading
              discussions, or a student exploring what impact your work can
              have, this site offers curated modules, case studies, discussion
              prompts, and resource tools.
            </div>{" "}
            {/* closes the infoSection div */}
          </div>{" "}
          {/* closes the TextSection div */}
        </div>{" "}
        {/* closes the upperSection div */}
        <div
          className="lowerContent"
          style={{
            display: "flexbox",
            padding: "72px 200px",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "84px",
            alignSelf: "stretch",
            background: "#FFF",
          }}
        >
          <div
            className="curriculumSection"
            style={{
              alignSelf: "stretch",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: "36",
              display: "inline-text",
            }}
          >
            <div
              className="curriculumHeader"
              style={{
                alignSelf: "stretch",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: "12px",
                display: "inline-flex",
              }}
            >
              <div
                className="searchHeader"
                style={{
                  alignSelf: "stretch",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "36",
                  display: "inline-flex",
                }}
              >
                <div
                  className="curriculum"
                  style={{
                    textAlign: "center",
                    color: "black",
                    fontSize: "48px",
                    fontFamily: "Funnel Sans, sans-serif",
                    fontWeight: "500",
                    wordWrap: "break-word",
                  }}
                >
                  Check out our curriculum
                  <div
                    className="curriculumSubtext"
                    style={{
                      width: "1112px",
                      textAlign: "center",
                      color: "Black",
                      fontSize: "18px",
                      fontFamily: "Be Vietnam Pro",
                      fontWeight: "400",
                      lineHeight: "28px",
                      wordWrap: "break-word",
                    }}
                  >
                    Explore our focus areas of socially responsible computing
                  </div>
                  <div
                    className="cardSection"
                    style={{
                      alignSelf: "stretch",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "36",
                      display: "inline-flex",
                    }}
                  >
                    <div
                      className="topicCardWide"
                      style={{
                        flex: "1 1 0",
                        padding: "24",
                        background: "white",
                        boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.08)",
                        overflow: "hidden",
                        borderRadius: "16",
                        outline: "1px #755543",
                        outlineOffset: "-1px",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "24",
                        display: "flex",
                      }}
                    ></div>
                    <div
                      className="outlineTip"
                      style={{
                        width: "100",
                        height: "100",
                        postition: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        className="Vector"
                        style={{
                          left: "12.5",
                          top: "4.17",
                          position: "absolute",
                        }}
                      >
                        <img
                          src={privacyIcon}
                          alt="Accessibility Icon"
                          width={75}
                          height={92}
                        /> {/* closes the img tag */ }

                      </div> {/* closes the vector div */}
                    </div> {/* closes the outlineTip div */}

                    <div className="CardText"
                      style={{
                        alignSelf: 'stretch',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        gap: '6',
                        display: 'inline-flex',
                        
                      }}
                    
                    
                    ></div>

                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* closes the curriculumHeader section */}
        </div>
        {/* closes the lowerContent div */}
      </div>
      {/* closees the Body div*/}
    </div> // closes landing page
  );
}

export default Home;
