import "../styles/LandingPage.css";
import "../styles/MarkdownPage.css";
import aboutMarkdown from "../markdown/about/about.md?raw";
import MarkdownRenderer from "../util/MarkdownRenderer";

function stripFrontmatter(markdown) {
  return String(markdown || "").replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "");
}

function getAboutContent(markdown) {
  return stripFrontmatter(markdown).trim();
}

function createHeadingId(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function mapHeadingToButtonLabel(title) {
  const normalized = String(title || "").toLowerCase();

  if (normalized.includes("socially responsible computing handbook")) {
    return "What is It?";
  }
  if (normalized.includes("how to use")) {
    return "How to Use It";
  }
  if (normalized.includes("living resource")) {
    return "Project Life";
  }
  if (normalized.includes("history of the project")) {
    return "Project History";
  }
  if (normalized.includes("funding")) {
    return "Funding";
  }
  if (normalized.includes("connect")) {
    return "Connect";
  }

  return title;
}

function getAboutHeadingLinks(markdown) {
  const body = stripFrontmatter(markdown);
  const headingMatches = Array.from(body.matchAll(/^#\s+(.+)$/gm));

  return headingMatches.map((match) => {
    const title = (match[1] || "").trim();
    return {
      title,
      id: createHeadingId(title),
      label: mapHeadingToButtonLabel(title),
    };
  });
}

export default function About() {
  const content = getAboutContent(aboutMarkdown);
  const headingLinks = getAboutHeadingLinks(aboutMarkdown);

  const handleJump = (id) => {
    const target = document.getElementById(id);
    if (!target) return;
    const offset = 100;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <>
      <div className="upper-content">
        <div className="upper-text-section">
          <div className="website-title" id="about-title">
            About the SRC Handbook
          </div>
          <div className="info-section">
            This Handbook is your guide to integrating ethics, responsibility,
            and social awareness into computer science teaching. Whether you are
            an instructor designing a syllabus, a TA leading discussions, or a
            student exploring what impact your work can have, this site offers
            curated modules, case studies, discussion prompts, and resource
            tools.
          </div>
        </div>
      </div>

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
