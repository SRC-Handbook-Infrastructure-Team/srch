import "../styles/LandingPage.css";
import "../styles/Home.css";
import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { LuChevronRight } from "react-icons/lu";
import MarkdownRenderer, {
  getContent,
  getSubsections,
  getPreloadedNavigationData,
  getPreloadedMarkdownContent,
  warmMarkdownContent,
} from "../util/MarkdownRenderer";
import privacyIconLight from "../assets/privacy-icon.svg";
import privacyIconDark from "../assets/privacy-icon_white.svg";
import accessibilityIconLight from "../assets/accessibility-icon.svg";
import accessibilityIconDark from "../assets/accessibility-icon_white.svg";
import automatedIconLight from "../assets/automatedDecisionMaking-icon.svg";
import automatedIconDark from "../assets/automatedDecisionMaking-icon_white.svg";
import generativeAiIconLight from "../assets/generativeAI-icon.svg";
import generativeAiIconDark from "../assets/generativeAI-icon_white.svg";

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
  switch (sectionId) {
    case "privacy":
      return theme === "dark" ? privacyIconDark : privacyIconLight;
    case "accessibility":
      return theme === "dark" ? accessibilityIconDark : accessibilityIconLight;
    case "automatedDecisionMaking":
      return theme === "dark" ? automatedIconDark : automatedIconLight;
    case "generativeAI":
      return theme === "dark" ? generativeAiIconDark : generativeAiIconLight;
    default:
      return null;
  }
}

function getSubsectionPreview(content) {
  if (!content) return "";

  const plain = String(content)
    // Remove code blocks and inline code markers.
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    // Resolve common markdown links/images to human-readable text.
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\[[^\]]*\]/g, "$1")
    // Remove headings, quotes, list markers, and footnote syntax.
    .replace(/^\s{0,3}#{1,6}\s+/gm, "")
    .replace(/^\s{0,3}>\s?/gm, "")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/^\s*\d+\.\s+/gm, "")
    .replace(/^\[\^.+\]:.*$/gm, "")
    .replace(/\[\^[^\]]+\]/g, "")
    // Convert custom inline tokens used in this project.
    .replace(/\{([^}|]+)\|([^}]+)\}/g, "$2")
    .replace(/\{([^}]+)\}/g, "$1")
    // Remove emphasis markers and remaining html tags.
    .replace(/(\*\*|__|~~|\*|_)/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!plain) return "";
  return plain;
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

  const formattedTitle = useMemo(() => {
    return pageTitle && pageTitle.trim()
      ? pageTitle.trim()
      : prettifySlug(sectionId || "");
  }, [pageTitle, sectionId]);

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
        setSubsections(
          subsectionData
            .filter((sub) => sub && typeof sub.id === "string" && sub.id)
            .map((sub) => ({
              id: sub.id,
              title: sub.title || prettifySlug(sub.id),
              preview: getSubsectionPreview(sub.content),
            })),
        );
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

  return (
    <>
      <div className="upper-content landing-upper-content">
        <div className="upper-text-section">
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
        <section className="about-section">
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
          {subsections.length > 0 && (
            <div className="landing-outline" aria-label="Primer Outline">
              <div className="landing-outline-list">
                {subsections.map((sub, index) => (
                  <button
                    key={sub.id}
                    type="button"
                    className="landing-outline-row"
                    onClick={() => navigate(`/${sectionId}/${sub.id}`)}
                    onMouseEnter={() => warmMarkdownContent(sectionId, sub.id)}
                    onFocus={() => warmMarkdownContent(sectionId, sub.id)}
                    aria-label={`Open ${sub.title}`}
                  >
                    <span className="landing-outline-marker" aria-hidden="true">
                      <span className="landing-outline-dot" />
                      {index < subsections.length - 1 && (
                        <span className="landing-outline-stem" />
                      )}
                    </span>
                    <span className="landing-outline-card">
                      <span className="landing-outline-card-title">
                        {sub.title}
                      </span>
                      {sub.preview && (
                        <span className="landing-outline-card-preview">
                          {sub.preview}
                        </span>
                      )}
                      <LuChevronRight
                        className="landing-outline-chevron"
                        aria-hidden="true"
                      />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
}

export default LandingPage;
