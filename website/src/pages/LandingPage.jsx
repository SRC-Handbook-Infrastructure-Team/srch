import "../styles/LandingPage.css";
import "../styles/Home.css";
import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { LuMinus, LuPlus } from "react-icons/lu";
import MarkdownRenderer, {
  createIdFromHeading,
  extractFootnotes,
  getContent,
  getSubsections,
  getPreloadedNavigationData,
  getPreloadedMarkdownContent,
  warmMarkdownContent,
} from "../util/MarkdownRenderer";
import { getSectionIconById } from "../util/sectionIcons";

function prettifySlug(slug = "") {
  return String(slug)
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\b\w/g, (m) => m.toUpperCase())
    .trim();
}

function getSectionIcon(sectionId, theme) {
  return getSectionIconById(sectionId, theme);
}

function getSubsectionPreview(content) {
  if (!content) return "";

  // Convert custom sidebar reference tags to readable text for previews.
  content = content.replace(
    /<sidebar-ref\s+term=["']([^"']+)["']\s*(?:\/>|>\s*<\/sidebar-ref>)/gi,
    (_, term) => String(term || "").replace(/[-_]+/g, " "),
  );

  // Remove any remaining HTML-like tags that may appear in raw markdown.
  content = content.replace(/<[^>]+>/g, "");

  content = content.replace(/!\[[^\]]*\]\([^\)]*\)/g, "");

  // Replace drawer links {text} with just 'text'
  content = content.replace(/\{([A-Za-z0-9-]+)\}/g, (match, p1) =>
    p1.replace(/-/g, " "),
  );

  // Replace general links [text](url) with just 'text'
  content = content.replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1");

  // Remove emphasis and code markers
  content = content.replace(/(\*\*|__)(.*?)\1/g, "$2"); // bold
  content = content.replace(/(\*|_)(.*?)\1/g, "$2"); // italic
  content = content.replace(/`([^`]+)`/g, "$1"); // inline code

  // Remove headings but keep text
  content = content.replace(/^#{1,6}\s*(.*)$/gm, "$1");

  // Remove footnotes
  content = content.replace(/\[\^([^\]]+)\]/g, "");

  // Remove Markdown table rows (lines starting and ending with |)
  content = content.replace(/^\s*\|[-:\s|]+\|\s*$/gm, "");

  // Normalize spaces (but keep newlines)
  content = content.replace(/[ \t]{2,}/g, " ");

  // Preserve paragraph breaks by replacing multiple newlines with exactly two newlines
  content = content.replace(/\n{2,}/g, "\n\n").trim();

  // Clean spacing before punctuation after tag and markdown cleanup.
  content = content.replace(/\s+([,.;:!?])/g, "$1");

  // Remove remaining text inside square brackets including the brackets
  content = content.replace(/\[[^\]]*\]/g, "");

  if (!content) return "";
  return content.trim();
}

function extractPrimerIntroPreview(content = "") {
  const markdown = stripNonBodySections(content);
  if (!markdown.trim()) return "";

  const introBlock = markdown.replace(/^#\s[^\r\n]+(?:\r?\n)+/, "");
  const firstSection = introBlock.split(/^##\s+/m)[0].trim();

  return truncateText(getSubsectionPreview(firstSection), 220);
}

function truncateText(text = "", maxLength = 150) {
  const value = String(text || "").trim();
  if (!value) return "";
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength).trim()}...`;
}

function stripNonBodySections(markdown = "") {
  let main = String(markdown || "");
  if (!main.trim()) return "";

  // Keep only content before the sidebar divider, matching page rendering behavior.
  const sidebarMatch = /^##\s*Sidebar\s*$/im.exec(main);
  if (sidebarMatch) {
    main = main.slice(0, sidebarMatch.index).trim();
  }

  const { stripped } = extractFootnotes(main);
  return String(stripped || "").trim();
}

function extractH2Blocks(content = "") {
  const markdown = stripNonBodySections(content);
  if (!markdown.trim()) return [];

  const headingRegex = /^##\s+(.+)$/gm;
  const excludedHeadings = new Set(["further reading", "footnotes", "sidebar"]);
  const matches = [];
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const title = String(match[1] || "")
      .replace(/\s+#+\s*$/, "")
      .trim();

    if (!title || excludedHeadings.has(title.toLowerCase())) {
      continue;
    }

    matches.push({
      title,
      index: match.index,
      bodyStart: headingRegex.lastIndex,
    });
  }

  if (matches.length === 0) return [];

  return matches
    .map((item, idx) => {
      const bodyEnd =
        idx < matches.length - 1 ? matches[idx + 1].index : markdown.length;
      const body = markdown.slice(item.bodyStart, bodyEnd);
      const excerpt = truncateText(getSubsectionPreview(body), 180);

      return {
        title: item.title,
        id: createIdFromHeading(item.title),
        excerpt,
      };
    })
    .filter((item) => item.title);
}

async function resolveSubsectionMarkdown(sectionId, sub) {
  if (!sectionId || !sub?.id) return "";

  const preloaded = getPreloadedMarkdownContent(sectionId, sub.id);
  if (typeof preloaded?.content === "string" && preloaded.content.trim()) {
    return preloaded.content;
  }

  try {
    const fetched = await getContent(sectionId, sub.id);
    if (typeof fetched?.content === "string" && fetched.content.trim()) {
      return fetched.content;
    }
  } catch {
    // Fall back to raw subsection content if cleaned content fetch fails.
  }

  if (typeof sub.content === "string" && sub.content.trim()) {
    return sub.content;
  }

  return "";
}

// Convert index to letter: 0->a, 1->b, ... 25->z, 26->aa, etc.
function indexToLetter(index) {
  let s = "";
  let i = index;
  do {
    s = String.fromCharCode(97 + (i % 26)) + s;
    i = Math.floor(i / 26) - 1;
  } while (i >= 0);
  return s;
}

function LandingPage() {
  const { sectionId } = useParams();
  const navigate = useNavigate();

  const cachedContent = sectionId
    ? getPreloadedMarkdownContent(sectionId)
    : null;
  const cachedNavigation = getPreloadedNavigationData();
  const cachedLandingSubsections = sectionId
    ? cachedNavigation?.subsections?.[sectionId] || []
    : [];

  const [mainContent, setMainContent] = useState(cachedContent?.content || "");
  const [sidebar, setSidebar] = useState(cachedContent?.sidebar || {});
  const [subsections, setSubsections] = useState(cachedLandingSubsections);
  const [pageTitle, setPageTitle] = useState(
    cachedContent?.frontmatter?.title || "",
  );
  const [theme, setTheme] = useState("light");
  const [expandedCards, setExpandedCards] = useState(new Set());

  const formattedTitle = useMemo(() => {
    return pageTitle && pageTitle.trim()
      ? pageTitle.trim()
      : prettifySlug(sectionId || "");
  }, [pageTitle, sectionId]);

  const sectionNumberById = useMemo(() => {
    const map = {};
    const navSections = cachedNavigation?.sections || [];
    navSections.forEach((section, index) => {
      if (section?.id) {
        map[section.id] = index + 1;
      }
    });
    return map;
  }, [cachedNavigation]);

  useEffect(() => {
    const root = document.documentElement;
    if (!root) return;

    const getCurrentTheme = () => root.getAttribute("data-theme") || "light";
    setTheme(getCurrentTheme());

    const observer = new MutationObserver(() => {
      setTheme(getCurrentTheme());
    });

    observer.observe(root, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (!root) return;

    root.classList.add("is-landing-page");
    return () => {
      root.classList.remove("is-landing-page");
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function loadContent() {
      if (!sectionId) {
        return;
      }

      const [result, subsectionData] = await Promise.all([
        getContent(sectionId),
        getSubsections(sectionId).catch(() => []),
      ]);
      if (!isMounted) return;

      if (!result) {
        navigate("/", { replace: true });
        return;
      }

      const raw = result.content || "";
      const cleaned = raw.replace(/^\s*#\s[^\n\r]+(\r?\n)+/, "");

      setMainContent(cleaned);
      setSidebar(result.sidebar || {});
      setPageTitle(result.frontmatter?.title || "");

      if (Array.isArray(subsectionData)) {
        const normalized = subsectionData.filter(
          (sub) => sub && typeof sub.id === "string" && sub.id,
        );

        const enrichedSubsections = await Promise.all(
          normalized.map(async (sub) => {
            const markdown = await resolveSubsectionMarkdown(sectionId, sub);
            const h2Blocks = extractH2Blocks(markdown);

            return {
              id: sub.id,
              title: sub.title || prettifySlug(sub.id),
              introPreview: extractPrimerIntroPreview(markdown),
              preview: truncateText(getSubsectionPreview(markdown), 180),
              h2Blocks,
            };
          }),
        );

        if (!isMounted) return;
        setSubsections(enrichedSubsections);
        // Initialize all cards as collapsed
        setExpandedCards(new Set());
      } else {
        setSubsections([]);
      }
    }

    loadContent().catch((error) => {
      console.error("Error loading landing page content:", error);
    });

    return () => {
      isMounted = false;
    };
  }, [sectionId, navigate]);

  const handleNavigation = (targetId) => {
    if (!targetId) return;
    if (targetId.includes("/")) {
      navigate(`/${targetId}`);
      return;
    }
    navigate(`/${sectionId}/${targetId}`);
  };

  const sectionIcon = getSectionIcon(sectionId, theme);

  const toggleCardExpanded = (subId, event) => {
    event.stopPropagation();
    setExpandedCards((prev) => {
      const next = new Set(prev);
      if (next.has(subId)) {
        next.delete(subId);
      } else {
        next.add(subId);
      }
      return next;
    });
  };

  const handleSubheadingNavigation = (subId, headingId, event) => {
    event.stopPropagation();
    if (!sectionId || !subId) return;

    if (headingId) {
      navigate(`/${sectionId}/${subId}#${headingId}`);
      return;
    }

    navigate(`/${sectionId}/${subId}`);
  };

  return (
    <>
      <div className="landing-upper-content">
        <div className="landing-upper-text-section">
          <div className="landing-title" id="landing-title">
            {sectionIcon && (
              <img
                className="landing-primer-icon"
                src={sectionIcon}
                alt={`${formattedTitle} icon`}
              />
            )}
            <span>{formattedTitle}</span>
          </div>
        </div>
      </div>

      <div className="about-lower-content landing-lower-content">
        <div className="landing-content-stack">
          <section className="about-section landing-content-column">
            {mainContent && (
              <Box>
                <MarkdownRenderer
                  content={mainContent}
                  sidebar={sidebar}
                  sectionId={sectionId}
                  subsectionId=""
                  onDrawerOpen={() => {}}
                  onNavigation={handleNavigation}
                  highlight={null}
                />
              </Box>
            )}
          </section>
          {subsections.length > 0 && (
            <div className="landing-outline-column">
              <div className="landing-outline" aria-label="Primer Outline">
                <h3 className="landing-outline-heading">Primer Outline</h3>
                <div className="landing-outline-list">
                  {subsections.map((sub, index) => (
                    <button
                      key={sub.id}
                      type="button"
                      className="landing-outline-row"
                      onClick={() => navigate(`/${sectionId}/${sub.id}`)}
                      onMouseEnter={() =>
                        warmMarkdownContent(sectionId, sub.id)
                      }
                      onFocus={() => warmMarkdownContent(sectionId, sub.id)}
                      aria-label={`Open ${(() => {
                        const sectionNum = sectionNumberById[sectionId] || 1;
                        const subLetter = indexToLetter(index);
                        return `${sectionNum}.${subLetter}. ${sub.title}`;
                      })()}`}
                    >
                      <span
                        className={`landing-outline-card ${
                          !expandedCards.has(sub.id)
                            ? "landing-outline-card--collapsed"
                            : ""
                        }`}
                      >
                        <span
                          className="landing-outline-dot"
                          aria-hidden="true"
                        />
                        <span className="landing-outline-card-heading-row">
                          <span className="landing-outline-card-title">
                            {(() => {
                              const sectionNum =
                                sectionNumberById[sectionId] || 1;
                              const subLetter = indexToLetter(index);
                              return `${sectionNum}.${subLetter}. ${sub.title}`;
                            })()}
                          </span>
                          {expandedCards.has(sub.id) ? (
                            <LuMinus
                              className="landing-outline-collapse-icon"
                              aria-hidden="true"
                              onClick={(e) => toggleCardExpanded(sub.id, e)}
                            />
                          ) : (
                            <LuPlus
                              className="landing-outline-collapse-icon"
                              aria-hidden="true"
                              onClick={(e) => toggleCardExpanded(sub.id, e)}
                            />
                          )}
                        </span>

                        {sub.introPreview && (
                          <span
                            className={`landing-outline-card-intro ${
                              !expandedCards.has(sub.id)
                                ? "landing-outline-card-intro--collapsed"
                                : ""
                            }`}
                          >
                            {sub.introPreview}
                          </span>
                        )}

                        {Array.isArray(sub.h2Blocks) &&
                        sub.h2Blocks.length > 0 ? (
                          <span
                            className={`landing-outline-subheading-list ${
                              expandedCards.has(sub.id)
                                ? "landing-outline-subheading-list--expanded"
                                : "landing-outline-subheading-list--collapsed"
                            }`}
                            aria-hidden={!expandedCards.has(sub.id)}
                          >
                            {sub.h2Blocks.map((block, blockIndex) => (
                              <span
                                key={`${sub.id}-h2-${blockIndex}`}
                                className="landing-outline-subheading-row landing-outline-subheading-row--clickable"
                                onClick={(event) =>
                                  handleSubheadingNavigation(
                                    sub.id,
                                    block.id,
                                    event,
                                  )
                                }
                              >
                                <span
                                  className="landing-outline-subheading-dot"
                                  aria-hidden="true"
                                />
                                <span className="landing-outline-subheading-copy">
                                  <span className="landing-outline-subheading-title">
                                    {block.title}
                                  </span>
                                  {block.excerpt && (
                                    <span className="landing-outline-subheading-preview">
                                      {block.excerpt}
                                    </span>
                                  )}
                                </span>
                              </span>
                            ))}
                          </span>
                        ) : (
                          !sub.introPreview &&
                          sub.preview && (
                            <span
                              className={`landing-outline-card-preview ${
                                !expandedCards.has(sub.id)
                                  ? "landing-outline-card-preview--collapsed"
                                  : ""
                              }`}
                            >
                              {sub.preview}
                            </span>
                          )
                        )}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default LandingPage;
