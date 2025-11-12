import "../LandingPage.css";
import "../ContentPage.css";
import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useToast, Box } from "@chakra-ui/react";
import { useLayout } from "../layouts/LayoutContext";
import MarkdownRenderer, {
  getSections,
  getContent,
  getSubsections,
  getDrawerFile,
  highlightText,
} from "../util/MarkdownRenderer";
import logoImage from "../assets/logo.png";
import privacyIcon from "../assets/privacy-icon.svg";
import automatedIcon from "../assets/decision-icon.svg";
import aiIcon from "../assets/ai-icon.svg";
import accessibilityIcon from "../assets/accessibility-icon.svg";

function MarkdownPage() {
  // Get parameters from URL and location for hash

  /*

  Hook Explanation: 
  - sectionId: refers to the module name (ex: Privacy, Accessibility, Generative AI)
  - subSectionId: refers to the article name (ex: bias, fairness, whatIsAccessibility)
  - urlTerm: only used for sidebar content to create a unique slug for every sidebar
  (ex:)
  - sidebar and setSidebar: sidebar is the dictionary that maps all of the sidebar terms
  (what the user sees and can click) to the actual content relating to that term
  
  drawerTerm and setDrawerTerm: drawerTerm is used to set the heading for each
  sidebar, if a heading is provided then the drawer term is set to the heading
  if not it is automatically pulled


  */

  /**
   * Formats the compact page header that sits above the divider, e.g.:
   * "1.a - What is Privacy?"
   *
   * Rules:
   * - Section numbering is fixed by product spec (Privacy=1, Accessibility=2, ADM=3, GenAI=4).
   * - Subsection letters come from index-based ordering (a, b, c...).
   * - Prefer frontmatter `title` (pageTitle) when present; otherwise prettify the slug.
   *
   * This version reuses the same numbering logic as ContentsSidebar.
   */

  // ----------------- Shared Formatting Helpers (same logic as ContentsSidebar) -----------------
  const SECTION_NUMBER_MAP = {
    privacy: "1",
    accessibility: "2",
    automateddecisionmaking: "3",
    generativeai: "4",
  };

  // convert 0 -> 'a', 1 -> 'b', etc.
  function indexToLetter(index) {
    let s = "";
    let i = index;
    do {
      s = String.fromCharCode(97 + (i % 26)) + s;
      i = Math.floor(i / 26) - 1;
    } while (i >= 0);
    return s;
  }

  // prettify "what-is-privacy" → "What Is Privacy"
  function prettifySlug(slug = "") {
    return (
      String(slug)
        // Insert space between lowercase -> uppercase ("generativeAI" → "generative AI")
        .replace(/([a-z])([A-Z])/g, "$1 $2")

        // Insert space between acronym + word ("AIethics" → "AI ethics")
        .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")

        // Replace hyphens and underscores with spaces
        .replace(/[-_]+/g, " ")

        // Collapse any double spaces
        .replace(/\s+/g, " ")

        // Capitalize each word
        .replace(/\b\w/g, (m) => m.toUpperCase())

        .trim()
    );
  }

  // normalize 'automated-decision-making' -> 'automateddecisionmaking' (map key)
  function normalizeSectionKey(id) {
    return String(id || "")
      .replace(/[^a-z]/gi, "")
      .toLowerCase();
  }

  function getFastCachedSubsections(sectionId) {
    return window.__SRCH_SUBSECTIONS_CACHE__?.[sectionId] || null;
  }

  function getFormattedTitle(
    sectionId,
    subsectionId,
    pageTitle,
    subsectionsArr = []
  ) {
    // Normalize incoming section id to match our map keys
    const sectionKey = normalizeSectionKey(sectionId);
    const sectionNum = SECTION_NUMBER_MAP[sectionKey] || ""; // empty if unknown (no '?')

    // Find letter for subsection, if any
    let letter = "";
    if (
      subsectionId &&
      Array.isArray(subsectionsArr) &&
      subsectionsArr.length > 0
    ) {
      const idx = subsectionsArr.findIndex((s) => s && s.id === subsectionId);
      if (idx >= 0) letter = indexToLetter(idx);
    }

    // Prefer frontmatter title when present
    const titleText =
      pageTitle && pageTitle.trim()
        ? pageTitle.trim()
        : prettifySlug(subsectionId || sectionId || "");

    // Build the numeric prefix (e.g. "1.a.") only if we have a section number
    const numberedPrefix = sectionNum
      ? sectionNum + (letter ? `.${letter}.` : "")
      : "";

    // If there is a prefix, add " - " after it; otherwise just the title
    return numberedPrefix ? `${numberedPrefix} - ${titleText}` : titleText;
  }

  function formatDate(dateString) {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      if (!isNaN(date.getTime())) {
        return date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      }
    } catch (e) {}
    return dateString; // fallback: show raw
  }

  const { sectionId, subsectionId, term: urlTerm } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const cachedContent = useRef({});

  const layout = useLayout() || {};
  const { leftSidebar = {}, openRightDrawer, closeRightDrawer } = layout;

  const highlight = useMemo(() => {
    let hl = location.state?.highlight;
    if (!hl) {
      const params = new URLSearchParams(location.search);
      hl = params.get("highlight");
    }
    return hl;
  }, [location.state, location.search]);

  const [sidebar, setSidebar] = useState({});
  const [drawerTerm, setDrawerTerm] = useState("");
  const [drawerActiveKey, setDrawerActiveKey] = useState(null);

  const [mainContent, setMainContent] = useState("");
  const [previousPath, setPreviousPath] = useState("/");
  const [isLoading, setIsLoading] = useState(false);
  const [contentFinal, setContentFinal] = useState(undefined);
  const [pageTitle, setPageTitle] = useState("");
  const [subsections, setSubsections] = useState([]);
  const [lastUpdated, setLastUpdated] = useState("");

  const contentRef = useRef(null);

  const formattedTitle = useMemo(() => {
    //  Prefer cached fast subsections (metadata) BEFORE slow markdown subsections
    const fastSubs = getFastCachedSubsections(sectionId);

    return getFormattedTitle(
      sectionId,
      subsectionId,
      pageTitle,
      fastSubs || subsections
    );
  }, [sectionId, subsectionId, pageTitle, subsections]);

  function getCacheKey(section, subsection = null) {
    return subsection ? `${section}/${subsection}` : section;
  }

  async function getCachedContent(section, subsection = null) {
    const cacheKey = getCacheKey(section, subsection);
    if (cachedContent.current[cacheKey]) return cachedContent.current[cacheKey];
    const result = await getContent(section, subsection);
    if (result) cachedContent.current[cacheKey] = result;
    return result;
  }

  function getSidebarContent(
    term,
    targetSectionId = sectionId,
    targetSubsectionId = subsectionId
  ) {
    const key = (term || "").toString().toLowerCase();
    if (sidebar && sidebar[key]) return sidebar[key];
    const cacheKey = getCacheKey(targetSectionId, targetSubsectionId);
    const storedContent = cachedContent.current[cacheKey];
    if (storedContent && storedContent.sidebar) {
      const maybe = storedContent.sidebar[key];
      if (maybe) return maybe;
    }
    return null;
  }

  async function openGlobalDrawerForTerm(term, opts = {}) {
    // opts used only by URL watcher
    const { noToggle = false, noNavigate = false } = opts;

    if (!term) return;
    const key = String(term).toLowerCase();

    //
    // 1) Prevent URL-triggered calls from toggling the drawer off
    //
    if (!noToggle && drawerActiveKey === key) {
      closeRightDrawer();
      setDrawerActiveKey(null);

      if (!noNavigate) {
        navigate(`/${sectionId}/${subsectionId}`);
      }

      return;
    }

    // 2) Load sidebar entry
    const sidebarEntry = getSidebarContent(key);

    const contentToShow =
      (typeof sidebarEntry === "string"
        ? sidebarEntry
        : sidebarEntry.content) || "";

    const heading =
      (typeof sidebarEntry === "object" && sidebarEntry.heading) ||
      String(term).replace(/-/g, " ");

    //
    // 4) Build node
    //
    const node = (
      <>
        <div className="drawer-meta-label">Familiar Case Studies</div>
        <div className="drawer-meta-divider" />

        <h2 className="drawer-section-title">
          {highlightText(heading, highlight)}
        </h2>

        <MarkdownRenderer
          content={contentToShow}
          onDrawerOpen={handleDrawerOpen}
          onNavigation={handleNavigation}
          highlight={highlight}
        />
      </>
    );

    // 5) Commit state
    setDrawerActiveKey(key);
    openRightDrawer(node);

    //
    // 6) Clicks should change URL — URL-triggered calls should NOT.
    //
    if (!noNavigate) {
      navigate(`/${sectionId}/${subsectionId}/${term}`);
    }
  }

  useEffect(() => {
    if (mainContent && !isLoading) setPreviousPath(location.pathname);
  }, [mainContent, location.pathname, isLoading]);

  useEffect(() => {
    async function loadContent() {
      setIsLoading(true);

      if (!sectionId) {
        const sections = await getSections();
        if (sections.length > 0) navigate(`/${sections[0].id}`);
        setIsLoading(false);
        return;
      }

      if (sectionId && !subsectionId) {
        const result = await getContent(sectionId);
        if (result) {
          const raw = result.content || "";
          const cleaned = raw.replace(/^\s*#\s[^\n\r]+(\r?\n)+/, "");
          setMainContent(cleaned);
          setSidebar(result.sidebar || {});
          setContentFinal(result.frontmatter?.final);
          setPageTitle(result.frontmatter?.title || "");

          //  Prefer subsection lastUpdated; fallback to section-level lastUpdated
          let lu = result.frontmatter?.lastUpdated || "";

          if (!lu) {
            try {
              const parent = await getContent(sectionId);
              lu = parent?.frontmatter?.lastUpdated || "";
            } catch (e) {
              // ignore — fallback will simply remain empty
            }
          }

          setLastUpdated(lu);
        } else {
          toast({
            title: "Subsection Not Found",
            description: `The subsection "${subsectionId}" in section "${sectionId}" could not be found.`,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom-right",
          });
          navigate(previousPath, { replace: true });
        }

        setIsLoading(false);
        return;
      }

      if (sectionId && subsectionId) {
        //  Performance: fetch content + subsections in parallel to make the H1
        // numbering (letter) available ASAP on direct subsection loads.
        const [result, subs] = await Promise.all([
          getContent(sectionId, subsectionId),
          getSubsections(sectionId).catch(() => []),
        ]);

        if (Array.isArray(subs)) {
          const validSubs = subs
            .filter((s) => s && s.id && typeof s.id === "string")
            .filter(
              (s) => !s.id.startsWith(".") && s.id.toLowerCase() !== "drawer"
            )
            .map((s) => ({
              ...s,
              title:
                (s.title && String(s.title).trim()) ||
                String(s.id || "")
                  .replace(/[-_]/g, " ")
                  .replace(/\b\w/g, (m) => m.toUpperCase()),
            }))
            .sort(
              (a, b) =>
                (Number.isFinite(a.order) ? a.order : 999) -
                (Number.isFinite(b.order) ? b.order : 999)
            );
          setSubsections(validSubs);
        }

        if (result) {
          const raw = result.content || "";
          const cleaned = raw.replace(/^\s*#\s[^\n\r]+(\r?\n)+/, "");
          setMainContent(cleaned);
          setSidebar(result.sidebar || {});
          setContentFinal(result.frontmatter?.final);
          setPageTitle(result.frontmatter?.title || "");

          //  Prefer subsection lastUpdated; fallback to section-level lastUpdated
          let lu = result.frontmatter?.lastUpdated || "";

          if (!lu) {
            try {
              const parent = await getContent(sectionId);
              lu = parent?.frontmatter?.lastUpdated || "";
            } catch (e) {
              // ignore — fallback will simply remain empty
            }
          }

          setLastUpdated(lu);
        } else {
          toast({
            title: "Subsection Not Found",
            description: `The subsection "${subsectionId}" in section "${sectionId}" could not be found.`,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom-right",
          });
          navigate(previousPath, { replace: true });
        }
      }
      setIsLoading(false);
    }

    loadContent();
  }, [sectionId, subsectionId, navigate, toast, previousPath]);

  useEffect(() => {
    if (!sectionId) return;
    let active = true;
    getSubsections(sectionId)
      .then((data) => {
        if (!active) return;
        const validSubs = (data || [])
          .filter((s) => s && s.id && typeof s.id === "string")
          .filter(
            (s) => !s.id.startsWith(".") && s.id.toLowerCase() !== "drawer"
          )
          .map((s) => ({
            ...s,
            title:
              (s.title && String(s.title).trim()) ||
              String(s.id || "")
                .replace(/[-_]/g, " ")
                .replace(/\b\w/g, (m) => m.toUpperCase()),
          }))
          .sort(
            (a, b) =>
              (Number.isFinite(a.order) ? a.order : 999) -
              (Number.isFinite(b.order) ? b.order : 999)
          );
        setSubsections(validSubs);
      })
      .catch((err) => console.error("Failed to load subsections:", err));
    return () => {
      active = false;
    };
  }, [sectionId]);

  useEffect(() => {
    if (!urlTerm) {
      closeRightDrawer();
      setDrawerActiveKey(null);
      return;
    }

    if (!sidebar || Object.keys(sidebar).length === 0) return;

    const key = String(urlTerm).toLowerCase();
    if (drawerActiveKey !== key) {
      openGlobalDrawerForTerm(key, { noToggle: true, noNavigate: true });
    }
  }, [
    urlTerm,
    sidebar,
    drawerActiveKey,
    closeRightDrawer,
    openGlobalDrawerForTerm,
  ]);

  const checkAndNavigate = useCallback(
    async (path) => {
      if (isLoading) return;
      const pathParts = path.split("/").filter(Boolean);

      const targetSectionId = pathParts[0];
      const targetSubsectionId = pathParts[1] || null;

      try {
        let contentExists = false;
        if (targetSubsectionId) {
          const result = await getContent(targetSectionId, targetSubsectionId);
          contentExists = result !== null;
        } else {
          const result = await getContent(targetSectionId);
          contentExists = result !== null;
        }
        if (contentExists) navigate(`/${path}`);
        else {
          toast({
            title: targetSubsectionId
              ? "Subsection Not Found"
              : "Section Not Found",
            description: targetSubsectionId
              ? `The subsection "${targetSubsectionId}" in section "${targetSectionId}" could not be found.`
              : `The section "${targetSectionId}" could not be found.`,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom-right",
          });
        }
      } catch (error) {
        console.error("Error checking content:", error);
        toast({
          title: "Navigation Error",
          description: "An error occurred while trying to navigate.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-right",
        });
      }
    },
    [isLoading, navigate, toast]
  );

  function handleDrawerOpen(term) {
    openGlobalDrawerForTerm(term);
  }

  function handleNavigation(targetId) {
    closeRightDrawer();
    if (targetId.includes("/")) {
      checkAndNavigate(targetId);
    } else {
      if (sectionId && !subsectionId) {
        checkAndNavigate(`${sectionId}/${targetId}`);
      } else {
        checkAndNavigate(targetId);
      }
    }
  }

  useEffect(() => {
    if (!mainContent) return;
    const timer = setTimeout(() => {
      if (location.hash) {
        const id = location.hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo(0, 0);
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [mainContent, location.hash]);

  return (
    <div className="markdown-page">
      <Box mb={10}>
        <div className="page-header">
          <p className="page-section-label">
            {sectionId ? prettifySlug(sectionId).toUpperCase() : ""}
          </p>

          {/* Title + last updated + sidebar toggle in one flex row */}
          <div className="page-header-row">
            <h1 className="page-title">{formattedTitle}</h1>

            {lastUpdated && (
              <div className="page-last-updated">
                Last updated on {formatDate(lastUpdated)}
              </div>
            )}

            <button
              className="header-toggle"
              onClick={() => leftSidebar?.toggle && leftSidebar.toggle()}
              aria-label={
                leftSidebar?.collapsed ? "Expand sidebar" : "Collapse sidebar"
              }
              title={
                leftSidebar?.collapsed ? "Expand sidebar" : "Collapse sidebar"
              }
            >
              {leftSidebar?.collapsed ? ">" : "<"}
            </button>
          </div>

          {/* Full-bleed divider that spans the whole viewport, Figma-style */}
          <div className="page-divider page-divider--fullbleed" />
        </div>

        {mainContent && (
          <Box ref={contentRef}>
            <MarkdownRenderer
              content={mainContent}
              sidebar={sidebar}
              sectionId={sectionId}
              subsectionId={subsectionId}
              onDrawerOpen={handleDrawerOpen}
              onNavigation={handleNavigation}
              isFinal={contentFinal}
              highlight={highlight}
            />
          </Box>
        )}
        <div className="page-divider page-divider--fullbleed" />
        <div className="link-section-primer-footer">
          <div className="logo-area-primer-footer">
            <img
              src={logoImage}
              alt="SRC Handbook Logo"
              width={100}
              height={91}
            />
          </div>
          <div className="modules-section-primer-footer">
            <div className="modules-primer-footer">
              <div className="modules-heading-primer-footer">Modules</div>
              <div className="primer-link-primer-footer">
                <div className="primer-link-photo-primer-footer">
                  <img
                    src={privacyIcon}
                    alt="Privacy Icon"
                    width={24}
                    height={24}
                  />
                </div>
                <button
                  onClick={() => navigate(privacySlug)}
                  className="module-link-primer-footer"
                >
                  Privacy
                </button>
              </div>

              <div className="primer-link-primer-footer">
                <div className="primer-link-photo-primer-footer">
                  <img
                    src={accessibilityIcon}
                    alt="Accessibility Icon"
                    width={24}
                    height={24}
                  />
                </div>
                <button
                  onClick={() => navigate(accessibilitySlug)}
                  className="module-link-primer-footer"
                >
                  Accessibility
                </button>
              </div>

              <div className="primer-link-primer-footer">
                <div className="primer-link-photo-primer-footer">
                  <img
                    src={automatedIcon}
                    alt="Automated Decision Making Icon"
                    width={24}
                    height={24}
                  />
                </div>
                <button
                  onClick={() => navigate(decisionSlug)}
                  className="module-link-primer-footer"
                >
                  Automated Decision Making
                </button>
              </div>

              <div className="primer-link-primer-footer">
                <div className="primer-link-photo-primer-footer">
                  <img
                    src={aiIcon}
                    alt="Generative AI Icon"
                    width={24}
                    height={24}
                  />
                </div>
                <button
                  onClick={() => navigate(aiSlug)}
                  className="module-link-primer-footer"
                >
                  Generative AI
                </button>
              </div>
            </div>
            <div className="modules-primer-footer">
              <div className="module-heading-primer-footer">Quick Links</div>
              <div className="module-links-primer-footer">
                <button
                  onClick={() => navigate("/about")}
                  className="module-link-primer-footer"
                >
                  About
                </button>
                <button
                  onClick={() => navigate("/acknowledgements")}
                  className="module-link-primer-footer"
                >
                  Acknowledgements
                </button>
              </div>
            </div>
            <div className="modules-primer-footer">
              <div className="module-heading-primer-footer">Have Feedback?</div>
              <p className="feedback-contact-primer-footer">
                Contact:{" "}
                <a href="mailto:src_handbook@brown.edu">
                  src_handbook@brown.edu
                </a>
              </p>
            </div>
          </div>
          <p className="feedback-contact-primer-footer">
            © 2025 Brown University. All rights reserved.
          </p>
        </div>
      </Box>
    </div>
  );
}

export default MarkdownPage;
