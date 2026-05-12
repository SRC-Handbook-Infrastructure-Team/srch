/**
 * Route page for About content, including project framing and static details
 * about the handbook and its purpose.
 */

import "../styles/About.css";
import { useState, useEffect } from "react";
import MarkdownRenderer, {
  getContent,
  getAboutHeadingLinks,
  getPreloadedMarkdownContent,
} from "../util/MarkdownRenderer";

export default function About() {
  const [contentData, setContentData] = useState(
    () => getPreloadedMarkdownContent("about") || null,
  );

  useEffect(() => {
    let isCancelled = false;

    getContent("about").then((data) => {
      if (!isCancelled && data) setContentData(data);
    });

    return () => {
      isCancelled = true;
    };
  }, []);

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
      <div className="about-lower-content">
        <section className="about-section">
          {headingLinks.length > 0 && (
            <div className="about-jump-links" aria-label="About section links">
              {headingLinks.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  className="generic-button"
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
