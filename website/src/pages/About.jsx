import "../styles/LandingPage.css";
import aboutMarkdown from "../markdown/about/about.md?raw";
import MarkdownRenderer from "../util/MarkdownRenderer";

function getAboutContent(markdown) {
  return String(markdown || "")
    .replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "")
    .replace(/^#\s+.*\r?\n+/, "")
    .trim();
}

export default function About() {
  const content = getAboutContent(aboutMarkdown);

  return (
    <>
      <div className="upper-content">
        <div className="upper-text-section">
          <div className="website-title" id="about-title">
            About the SRC Handbook
          </div>
          <div className="info-section">
            Learn how to use this resource, how it’s structured, and the story
            behind its creation.
          </div>
        </div>
      </div>

      <div className="about-lower-content">
        <section className="about-section">
          <MarkdownRenderer
            content={content}
            sidebar={{}}
            sectionId="about"
            subsectionId=""
            onDrawerOpen={() => {}}
            onNavigation={() => {}}
            highlight={null}
          />
        </section>
      </div>
    </>
  );
}
