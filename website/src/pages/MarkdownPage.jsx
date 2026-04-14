/**
 * Builds a footnote origin map for all sidebar drawers on the page.
 * For each sidebar slug, maps footnotes to that slug using the loaded sidebar content.
 * Returns: { [footnoteKey: string]: sidebarSlug }
 */
function buildSidebarDrawersFootnoteOriginMap(sidebar) {
  const originMap = {};
  if (!sidebar || typeof sidebar !== "object") return originMap;
  const slugs = Object.keys(sidebar);
  for (const slug of slugs) {
    const entry = sidebar[slug];
    const contentToShow =
      (typeof entry === "string" ? entry : entry?.content) || "";
    // Use buildFootnoteOriginMap on this drawer's content, mapping all found footnotes to this slug
    const localMap = buildFootnoteOriginMap(contentToShow, {});
    for (const key of Object.keys(localMap)) {
      if (!originMap[key]) originMap[key] = slug;
    }
  }
  return originMap;
}
import "../styles/MarkdownPage.css";
import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { useLayout } from "../layouts/LayoutContext";
import MarkdownRenderer, {
  getSections,
  getContent,
  getSubsections,
  highlightText,
} from "../util/MarkdownRenderer";

/* ─────────────────────────────────────────────────────────────────────────────
 * buildFootnoteOriginMap
 *
 * Walks the raw main-page markdown AND every sidebar entry to build a complete
 * map of  footnoteKey → "main" | sidebarSlug.
 *
 * Algorithm
 * ─────────
 * 1. Extract every [^key]: definition from mainMarkdown → mark origin "main".
 * 2. For each sidebar entry, extract every [^key]: definition → mark origin
 *    with the sidebar's slug (the key in the sidebarMap object).
 * 3. Second pass: scan for [^key] *references* in both main and sidebar text.
 *    If a reference appears but has no definition anywhere, it is still
 *    recorded so links can gracefully degrade.
 *
 * Returns:  { [footnoteKey: string]: "main" | sidebarSlug }
 *
 * @param {string}  mainMarkdown  - Raw markdown for the main page body.
 * @param {Object}  sidebarMap    - { [slug: string]: { content: string, heading: string } }
 * ─────────────────────────────────────────────────────────────────────────── */
export function buildFootnoteOriginMap(mainMarkdown, sidebarMap = {}) {
  const originMap = {};
  const defRegex = () => /^\[\^([^\]]+)\]:\s*(.*(?:\n(?!\[\^|\s*$).*)*)/gm;
  const refRegex = () => /\[\^([^\]]+)\](?!:)/g;
  if (!mainMarkdown || typeof mainMarkdown !== "string") return originMap;
  const lines = mainMarkdown.split(/\r?\n/);
  let currentSlug = null;
  const sidebarSlugs = Object.keys(sidebarMap).map((s) => s.toLowerCase());
  let sidebarStartIdx = lines.findIndex((line) =>
    /^##\s+Sidebar\s*$/i.test(line),
  );
  if (sidebarStartIdx === -1) {
    let m;
    const rx = defRegex();
    while ((m = rx.exec(mainMarkdown)) !== null) {
      const key = m[1];
      if (!originMap[key]) originMap[key] = "main";
    }
    for (const [slug, entry] of Object.entries(sidebarMap)) {
      const text = typeof entry === "string" ? entry : (entry?.content ?? "");
      if (!text) continue;
      let m2;
      const rx2 = defRegex();
      while ((m2 = rx2.exec(text)) !== null) {
        const key = m2[1];
        if (!originMap[key]) originMap[key] = slug;
      }
    }
    function scanRefs(text, fallbackOrigin) {
      if (!text || typeof text !== "string") return;
      let m;
      const rx = refRegex();
      while ((m = rx.exec(text)) !== null) {
        const key = m[1];
        if (!originMap[key]) originMap[key] = fallbackOrigin;
      }
    }
    scanRefs(mainMarkdown, "main");
    for (const [slug, entry] of Object.entries(sidebarMap)) {
      const text = typeof entry === "string" ? entry : (entry?.content ?? "");
      scanRefs(text, slug);
    }
    return originMap;
  }

  for (let i = 0; i < sidebarStartIdx; ++i) {
    let m;
    const rx = defRegex();
    while ((m = rx.exec(lines[i])) !== null) {
      const key = m[1];
      if (!originMap[key]) originMap[key] = "main";
    }
    let ref;
    const rxRef = refRegex();
    while ((ref = rxRef.exec(lines[i])) !== null) {
      const key = ref[1];
      if (!originMap[key]) originMap[key] = "main";
    }
  }

  currentSlug = null;
  for (let i = sidebarStartIdx + 1; i < lines.length; ++i) {
    const line = lines[i];
    const slugMatch = line.match(/^([A-Za-z0-9-_]+):\s*$/);
    if (slugMatch && sidebarSlugs.includes(slugMatch[1].toLowerCase())) {
      currentSlug = slugMatch[1].toLowerCase();
      continue;
    }
    if (!currentSlug) continue;
    let m;
    const rx = defRegex();
    while ((m = rx.exec(line)) !== null) {
      const key = m[1];
      if (!originMap[key]) originMap[key] = currentSlug;
    }
    const refRegexSimple = /\[\^([0-9]+)\]/g;
    let refMatch;
    let foundRef = false;
    while ((refMatch = refRegexSimple.exec(line)) !== null) {
      const key = refMatch[1];
      if (!originMap[key]) originMap[key] = currentSlug;
      foundRef = true;
    }
  }
  let m;
  const rx = defRegex();
  while ((m = rx.exec(mainMarkdown)) !== null) {
    const key = m[1];
    if (!originMap[key]) originMap[key] = "main";
  }
  let ref;
  const rxRef = refRegex();
  while ((ref = rxRef.exec(mainMarkdown)) !== null) {
    const key = ref[1];
    if (!originMap[key]) originMap[key] = "main";
  }

  return originMap;
}

function MarkdownPage() {
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
    subsectionsArr = [],
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
    return dateString;
  }

  const { sectionId, subsectionId, term: urlTerm } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const cachedContent = useRef({});
  const pageScrollRef = useRef(0);
  const notifyError = useCallback((title, description) => {
    console.error(`${title}: ${description}`);
  }, []);

  const highlight = useMemo(() => {
    let hl =
      location.state?.highlightConfig ||
      location.state?.highlightTargets ||
      location.state?.highlight;
    if (!hl) {
      const params = new URLSearchParams(location.search);
      hl = params.get("highlight");
    }
    return hl;
  }, [location.state, location.search]);

  const layout = useLayout() || {};
  const { closeRightDrawer, openRightDrawer } = layout;
  const [sidebar, setSidebar] = useState({});
  const [mainContent, setMainContent] = useState("");
  const [previousPath, setPreviousPath] = useState("/");
  const [isLoading, setIsLoading] = useState(false);
  const [contentFinal, setContentFinal] = useState(undefined);
  const [pageTitle, setPageTitle] = useState("");
  const [subsections, setSubsections] = useState([]);
  const [lastUpdated, setLastUpdated] = useState("");
  const [mainFootnotes, setMainFootnotes] = useState([]);
  const [allDefinitions, setAllDefinitions] = useState({});
  const [rawMainMarkdown, setRawMainMarkdown] = useState("");
  const [referencesBlock, setReferencesBlock] = useState(null);

  const contentRef = useRef(null);
  const scrollPosRef = useRef(0);
  const pendingScrollRestoreRef = useRef(null);
  const mergedFootnotesRef = useRef([]);
  const formattedTitle = useMemo(() => {
    const fastSubs = getFastCachedSubsections(sectionId);
    return getFormattedTitle(
      sectionId,
      subsectionId,
      pageTitle,
      fastSubs || subsections,
    );
  }, [sectionId, subsectionId, pageTitle, subsections]);

  function getPageScrollContainer() {
    if (typeof document !== "undefined") {
      const main = document.getElementById("main");
      if (main) return main;
    }
    return window;
  }

  function getPageScrollTop() {
    const container = getPageScrollContainer();
    return container === window
      ? window.scrollY || 0
      : container.scrollTop || 0;
  }

  function restorePageScroll(top) {
    const container = getPageScrollContainer();
    if (container === window) {
      window.scrollTo({ top, behavior: "auto" });
      return;
    }
    container.scrollTo({ top, behavior: "auto" });
  }

  function schedulePageScrollRestore(top) {
    restorePageScroll(top);

    requestAnimationFrame(() => {
      restorePageScroll(top);
    });

    if (pendingScrollRestoreRef.current) {
      window.clearTimeout(pendingScrollRestoreRef.current);
    }

    pendingScrollRestoreRef.current = window.setTimeout(() => {
      restorePageScroll(top);
      pendingScrollRestoreRef.current = null;
    }, 400);
  }

  /*
   * footnoteOriginMap
   *
   * Combines main markdown footnotes and all sidebar drawer footnotes.
   * This ensures all footnotes are mapped to their correct origin (main or sidebar slug).
   */
  const [sidebarFootnoteOriginMap, setSidebarFootnoteOriginMap] = useState({});
  useEffect(() => {
    if (!sidebar || Object.keys(sidebar).length === 0) {
      setSidebarFootnoteOriginMap({});
      return;
    }

    const map = buildSidebarDrawersFootnoteOriginMap(sidebar);
    setSidebarFootnoteOriginMap(map);
  }, [sidebar]);

  // Merge main markdown footnotes and sidebar drawer footnotes
  const footnoteOriginMap = useMemo(() => {
    const mainMap = buildFootnoteOriginMap(rawMainMarkdown, sidebar);
    // Sidebar map takes precedence for keys it defines
    return { ...mainMap, ...sidebarFootnoteOriginMap };
  }, [rawMainMarkdown, sidebar, sidebarFootnoteOriginMap]);

  function getCacheKey(section, subsection = null) {
    return subsection ? `${section}/${subsection}` : section;
  }
  const stableOnFootnotesReady = useCallback(
    (fns) => onFootnotesReadyRef.current(fns),
    [],
  );

  const onFootnotesReadyRef = useRef(null);
  onFootnotesReadyRef.current = (fns) => {
    mergedFootnotesRef.current = fns;
    setMainFootnotes(fns);
  };
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
    targetSubsectionId = subsectionId,
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

  const allPageFootnotes = useMemo(() => {
    if (!allDefinitions || Object.keys(allDefinitions).length === 0) return [];
    return Object.entries(allDefinitions).map(([key, content], i) => ({
      key,
      content,
      number: i + 1,
    }));
  }, [allDefinitions]);

  /**
   * Pure UI helper: given a term key, render its content into the right drawer.
   * No navigation. No toggling. This is invoked ONLY by the URL-driven controller.
   */
  async function openGlobalDrawerForTerm(term, opts = {}) {
    const { silent = false } = opts;

    if (!term) return;
    const key = String(term).toLowerCase();

    const sidebarEntry = getSidebarContent(key);
    if (!sidebarEntry) {
      if (!silent) {
        notifyError(
          "Sidebar Entry Not Found",
          `The sidebar entry "${term}" could not be found in this subsection.`,
        );
      }
      return;
    }

    const contentToShow =
      (typeof sidebarEntry === "string"
        ? sidebarEntry
        : sidebarEntry.content) ||
      "";

    // Build the footnote origin map for this drawer's content only
    const drawerFootnoteOriginMap = buildFootnoteOriginMap(contentToShow, {});

    const heading =
      (typeof sidebarEntry === "object" && sidebarEntry.heading) ||
      String(term).replace(/-/g, " ");

    const node = (
      <>
        <div className="drawer-meta-label">
          {highlightText(heading, highlight)}
        </div>
        <div className="drawer-meta-divider" />
        <MarkdownRenderer
          content={contentToShow}
          sidebar={{}}
          sectionId={sectionId}
          subsectionId={subsectionId}
          onDrawerOpen={handleDrawerOpen}
          onNavigation={handleNavigation}
          highlight={highlight}
          urlTerm={urlTerm}
          mergedSidebar={allPageFootnotes}
          footnoteOriginMap={drawerFootnoteOriginMap}
        />
      </>
    );

    openRightDrawer(node);
  }

  useEffect(() => {
    if (mainContent && !isLoading) setPreviousPath(location.pathname);
  }, [mainContent, location.pathname, isLoading]);

  // Restore scroll after markdown re-renders (fixes jump)
  useEffect(() => {
    if (!contentRef.current) return;
    contentRef.current.scrollTop = scrollPosRef.current;
  }, [mainContent]);

  useEffect(() => {
    async function loadContent() {
      setIsLoading(true);
      setReferencesBlock(null);

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
          // ── Store raw markdown for footnote origin parsing ──
          setRawMainMarkdown(raw);
          setSidebar(result.sidebar || {});
          setContentFinal(result.frontmatter?.final);
          setPageTitle(result.frontmatter?.title || "");
          setAllDefinitions(result.allDefinitions || {});
          setReferencesBlock(result.referencesBlock || null);

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
          notifyError(
            "Subsection Not Found",
            `The subsection "${subsectionId}" in section "${sectionId}" could not be found.`,
          );
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
              (s) => !s.id.startsWith(".") && s.id.toLowerCase() !== "drawer",
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
                (Number.isFinite(b.order) ? b.order : 999),
            );
          setSubsections(validSubs);
        }

        if (result) {
          const raw = result.content || "";
          const cleaned = raw.replace(/^\s*#\s[^\n\r]+(\r?\n)+/, "");
          setMainContent(cleaned);
          setRawMainMarkdown(raw);
          setSidebar(result.sidebar || {});
          setContentFinal(result.frontmatter?.final);
          setPageTitle(result.frontmatter?.title || "");
          setAllDefinitions(result.allDefinitions || {});
          setReferencesBlock(result.referencesBlock || null);

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
          notifyError(
            "Subsection Not Found",
            `The subsection "${subsectionId}" in section "${sectionId}" could not be found.`,
          );
          navigate(previousPath, { replace: true });
        }
      }
      setIsLoading(false);
    }

    loadContent();
  }, [sectionId, subsectionId, navigate, notifyError, previousPath]);

  useEffect(() => {
    if (!sectionId) return;
    let active = true;
    getSubsections(sectionId)
      .then((data) => {
        if (!active) return;
        const validSubs = (data || [])
          .filter((s) => s && s.id && typeof s.id === "string")
          .filter(
            (s) => !s.id.startsWith(".") && s.id.toLowerCase() !== "drawer",
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
              (Number.isFinite(b.order) ? b.order : 999),
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
      return;
    }

    const key = String(urlTerm).toLowerCase();

    if (!sidebar || Object.keys(sidebar).length === 0) {
      return;
    }

    const sidebarEntry = getSidebarContent(key);
    if (!sidebarEntry) {
      return;
    }

    openGlobalDrawerForTerm(key, {
      silent: true,
    });
  }, [urlTerm, sidebar]);

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
          notifyError(
            targetSubsectionId ? "Subsection Not Found" : "Section Not Found",
            targetSubsectionId
              ? `The subsection "${targetSubsectionId}" in section "${targetSectionId}" could not be found.`
              : `The section "${targetSectionId}" could not be found.`,
          );
        }
      } catch (error) {
        console.error("Error checking content:", error);
        notifyError(
          "Navigation Error",
          "An error occurred while trying to navigate.",
        );
      }
    },
    [isLoading, navigate, notifyError],
  );

  // Save scroll BEFORE drawer changes cause any re-renders
  function saveScrollPosition() {
    scrollPosRef.current = getPageScrollTop();
  }

  /**
   * Click handler for drawer chips:
   * - ONLY updates the URL.
   * - UI changes are handled by the URL-driven controller effect below.
   */
  function handleDrawerOpen(term, hash = "") {
    saveScrollPosition();
    pageScrollRef.current = scrollPosRef.current;

    const basePath = `/${sectionId}/${subsectionId}`;

    if (!term) {
      closeRightDrawer();
      if (location.pathname !== basePath) {
        navigate(basePath, { replace: true });

        requestAnimationFrame(() => {
          schedulePageScrollRestore(pageScrollRef.current);
        });
      }
      return;
    }

    const key = String(term).toLowerCase();
    const targetPath = `${basePath}/${key}`;

    if (location.pathname !== targetPath || hash) {
      navigate({ pathname: targetPath, hash });

      requestAnimationFrame(() => {
        schedulePageScrollRestore(pageScrollRef.current);
      });
    }

    openGlobalDrawerForTerm(key, { silent: false });
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

  // Only handle in-page anchor links like #some-heading
  useEffect(() => {
    if (!location.hash) return;

    const id = location.hash.replace("#", "");

    setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;

      // If the element is inside the drawer, scroll the drawer's scroll container
      const drawer = document.querySelector(".right-sidebar");
      if (drawer && drawer.contains(el)) {
        let scrollContainer = null;
        let node = el.parentElement;
        while (node && node !== document.body) {
          const { overflowY } = window.getComputedStyle(node);
          if (overflowY === "auto" || overflowY === "scroll") {
            scrollContainer = node;
            break;
          }
          node = node.parentElement;
        }
        if (scrollContainer) {
          const containerRect = scrollContainer.getBoundingClientRect();
          const elRect = el.getBoundingClientRect();
          scrollContainer.scrollTo({
            top:
              scrollContainer.scrollTop + (elRect.top - containerRect.top) - 24,
            behavior: "smooth",
          });
          return;
        }
      }

      el.scrollIntoView({ behavior: "smooth" });
    }, 350);
  }, [location.hash]);

  useEffect(() => {
    return () => {
      if (pendingScrollRestoreRef.current) {
        window.clearTimeout(pendingScrollRestoreRef.current);
      }
    };
  }, []);

  return (
    <div className="markdown-page">
      <Box className="markdown-content">
        <div className="page-header markdown-margin">
          <p className="page-section-label">
            {sectionId ? prettifySlug(sectionId).toUpperCase() : ""}
          </p>
          <div className="page-header-row">
            <h1 className="page-title">{formattedTitle}</h1>
          </div>
          {lastUpdated && (
            <div className="page-last-updated">
              Last updated on {formatDate(lastUpdated)}
            </div>
          )}
          <div className="page-divider markdown-margin" />
        </div>
        {mainContent && (
          <Box className="markdown-margin" ref={contentRef}>
            <MarkdownRenderer
              content={mainContent}
              sidebar={sidebar}
              sectionId={sectionId}
              subsectionId={subsectionId}
              onDrawerOpen={handleDrawerOpen}
              onNavigation={handleNavigation}
              isFinal={contentFinal}
              highlight={highlight}
              urlTerm={urlTerm}
              allDefinitions={allDefinitions}
              onFootnotesReady={stableOnFootnotesReady}
              extraFootnotes={allPageFootnotes.slice(mainFootnotes.length)}
              footnoteOriginMap={footnoteOriginMap}
              referencesBlock={referencesBlock}
            />
          </Box>
        )}
      </Box>
      <div className="page-height"></div>
    </div>
  );
}

export default MarkdownPage;
