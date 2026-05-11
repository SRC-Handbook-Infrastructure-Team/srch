/**
 * Route page for About content, including project framing and static details
 * about the handbook and its purpose.
 */

import "../styles/About.css";
import { useState, useEffect } from "react";
import GridBackground from "../components/GridBackground";
import MarkdownRenderer, {
  getContent,
  getAboutHeadingLinks,
} from "../util/MarkdownRenderer";

export default function About() {
  const [contentData, setContentData] = useState(null);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    getContent("about").then((data) => {
      if (data) setContentData(data);
    });
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (!root) return;

    const storedTheme = window.localStorage.getItem("srch-theme");
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme =
      storedTheme === "light" || storedTheme === "dark"
        ? storedTheme
        : prefersDark
          ? "dark"
          : "light";

    setTheme(initialTheme);

    const observer = new MutationObserver(() => {
      const currentTheme = root.getAttribute("data-theme");
      if (currentTheme && currentTheme !== theme) {
        setTheme(currentTheme);
      }
    });

    observer.observe(root, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, [theme]);

  const headingLinks = contentData
    ? getAboutHeadingLinks(contentData.content)
    : [];

  const handleJump = (id) => {
    const target = document.getElementById(id);
    if (!target) return;
    const offset = 100;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <>
      <GridBackground
        height="600px"
        theme={theme}
        title="About the SRC Handbook"
        subtitle="This Handbook is your guide to integrating ethics, responsibility, and social awareness into computer science teaching. Whether you are an instructor designing a syllabus, a TA leading discussions, or a student exploring what impact your work can have, this site offers curated modules, case studies, discussion prompts, and resource tools."
      />

      <div className="about-lower-content">
        <section className="about-section">
          {headingLinks.length > 0 && (
            <div className="about-jump-links" aria-label="About section links">
              {headingLinks.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  className="about-jump-link"
                  onClick={() => handleJump(link.id)}
                >
                  {link.label}
                </button>
              ))}
            </div>
          )}
          {contentData && (
            <MarkdownRenderer
              content={contentData.content}
              sidebar={contentData.sidebar ?? {}}
              sectionId="about"
              subsectionId=""
              onDrawerOpen={() => {}}
              onNavigation={() => {}}
              highlight={null}
            />
          )}
        </section>
      </div>
    </>
  );
}
