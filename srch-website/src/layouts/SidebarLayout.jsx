import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import useResizableSidebar from "../hooks/useResizableSidebar";
import { LayoutContext } from "./LayoutContext";
import NavBar from "../components/NavBar";
import ContentsSidebar from "../components/ContentsSidebar";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * Layout constants
 * --------------------------------------------------------------------------
 * These give us a single place to reason about layout modes and constraints.
 */
const MIN_MAIN_WIDTH = 700;
const SPLITSCREEN_BREAKPOINT = 1280;
const RIGHT_MIN_WIDTH = 375;
const RIGHT_MAX_WIDTH = 700;

function computeLayoutMode(viewportWidth) {
  if (viewportWidth <= SPLITSCREEN_BREAKPOINT) return "overlay"; // split-screen / narrow desktop
  return "wide";
}



/**
 * SidebarLayout
 * ---------------------------------------------------------------------------
 * “Approach 0+”:
 * - Keeps your existing resizable sidebars + drawer behavior.
 * - Adds a tiny panelManager (state-machine-ish) to centralize “who can be open”.
 * - Uses a layoutMode ("wide" | "overlay" | "mobile") for behavior decisions.
 * - Exposes layoutMode via data attribute + context for CSS/consumers.
 */
export default function SidebarLayout({ children }) {
  /** ---------------- DOM REFS (for optional freeze logic) ---------------- */
  const mainRef = useRef(null);
  const innerRef = useRef(null);
  const scrollPosRef = useRef(0);


  /** ---------------- VIEWPORT WIDTH + LAYOUT MODE ---------------- */
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1440
  );
  const layoutMode = computeLayoutMode(viewportWidth);

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

    // Keep the <html> element in sync with React's layoutMode
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.dataset.layoutMode = layoutMode;
    }
  }, [layoutMode]);


  /** ---------------- FREEZE / RELEASE MAIN CONTENT (wide only) ---------------- */
  const freezeMainContent = useCallback(() => {
    const main = mainRef.current;
    const inner = innerRef.current;
    if (!main || !inner) return;

    const w = `${inner.offsetWidth}px`;
    document.documentElement.style.setProperty("--main-freeze-width", w);

    main.classList.add("main-frozen");
    inner.classList.add("frozen");
    inner.classList.remove("release");
  }, []);

  const releaseMainContent = useCallback(() => {
    const main = mainRef.current;
    const inner = innerRef.current;
    if (!main || !inner) return;

    inner.classList.remove("frozen");
    inner.classList.add("release");

    setTimeout(() => {
      main.classList.remove("release");
      inner.classList.remove("release");
      document.documentElement.style.removeProperty("--main-freeze-width");
    }, 220);
  }, []);

  // In overlay / mobile modes, we don’t need to freeze main content,
  // because the side panels slide over instead of pushing.
  const freezeForSidebars = useCallback(() => {
    if (layoutMode === "wide") {
      freezeMainContent();
    }
  }, [layoutMode, freezeMainContent]);

  const releaseForSidebars = useCallback(() => {
    if (layoutMode === "wide") {
      releaseMainContent();
    }
  }, [layoutMode, releaseMainContent]);

  /** ---------------- LEFT SIDEBAR CONFIG ---------------- */
  const leftSidebar = useResizableSidebar({
    storageKey: "leftSidebarWidth",
    defaultWidth: 250,
    minWidth: 200,
    maxWidth: 400,
    collapsedWidth: 0,
    side: "left",
    cssVarName: "--left-sidebar-width",
    onStartResize: freezeForSidebars,
    onStopResize: releaseForSidebars,
  });

  /** ---------------- RIGHT SIDEBAR CONFIG ---------------- */
  const rightSidebar = useResizableSidebar({
    storageKey: "rightSidebarWidth",
    defaultWidth: 400,
    minWidth: RIGHT_MIN_WIDTH,
    maxWidth: RIGHT_MAX_WIDTH,
    side: "right",
    cssVarName: "--right-sidebar-width",
    onStartResize: freezeForSidebars,
    onStopResize: releaseForSidebars,
    getDynamicBounds: () => {
      const vw =
        typeof window !== "undefined" ? window.innerWidth : viewportWidth;

      if (layoutMode === "overlay") {
        // Overlay: main content doesn’t need a strict MIN_MAIN_WIDTH.
        const maxByPercent = Math.floor(vw * 0.75);
        return {
          min: RIGHT_MIN_WIDTH,
          max: Math.min(maxByPercent, RIGHT_MAX_WIDTH),
        };
      }

      // Wide desktop: preserve existing “protect main content” behavior.
      const availableForRight = Math.max(
        vw - MIN_MAIN_WIDTH - (leftSidebar?.width || 0),
        0
      );
      return {
        min: RIGHT_MIN_WIDTH,
        max: Math.min(availableForRight, RIGHT_MAX_WIDTH),
      };
    },
  });

  /** ---------------- RIGHT DRAWER CONTENT STATE ---------------- */
  const [rightContent, setRightContent] = useState(null);
  const [isRightOpen, setIsRightOpen] = useState(false);

  /** ---------------- PANEL MANAGER (tiny state machine) ----------------
   *
   * Panels: "left" | "right"
   * Modes:
   *  - wide: both may be open; sidebars push content.
   *  - overlay: exactly one panel open at a time; panels overlay content.
   *  - mobile: left uses Chakra Drawer; right generally closed or unused here.
   *
   * We DO NOT duplicate state. We orchestrate using:
   *  - leftSidebar.collapsed / leftSidebar.toggleCollapsed()
   *  - isRightOpen / setIsRightOpen()
   */
  const openPanel = useCallback(
    (id) => {
      if (id === "left") {
        // In overlay mode, close right first.
        if (layoutMode === "overlay" && isRightOpen) {
          setIsRightOpen(false);
          setRightContent(null);
        }
        if (leftSidebar.collapsed) {
          leftSidebar.toggleCollapsed();
        }
      } else if (id === "right") {
        // In overlay mode, collapse left before opening right.
        if (layoutMode === "overlay" && !leftSidebar.collapsed) {
          leftSidebar.toggleCollapsed();
        }
        setIsRightOpen(true);
      }
    },
    [layoutMode, isRightOpen, leftSidebar]
  );

  const closePanel = useCallback(
    (id) => {
      if (id === "left") {
        if (!leftSidebar.collapsed) {
          leftSidebar.toggleCollapsed();
        }
      } else if (id === "right") {
        if (isRightOpen) {
          setIsRightOpen(false);
          setRightContent(null);
        }
      }
    },
    [isRightOpen, leftSidebar]
  );

  const togglePanel = useCallback(
    (id) => {
      if (id === "left") {
        if (leftSidebar.collapsed) openPanel("left");
        else closePanel("left");
      } else if (id === "right") {
        if (isRightOpen) closePanel("right");
        else openPanel("right");
      }
    },
    [openPanel, closePanel, leftSidebar.collapsed, isRightOpen]
  );

  /** Maintain original openRightDrawer / closeRightDrawer API
   * so existing callers don’t need to change.
   */
  const closeRightDrawer = useCallback(() => {
    closePanel("right");
  }, [closePanel]);

  const openRightDrawer = useCallback(
    (content) => {
      setRightContent(content);
      openPanel("right");
    },
    [openPanel]
  );

  /** When switching into overlay mode, enforce “only one panel open” */
  useEffect(() => {
    if (layoutMode !== "overlay") return;
    if (!leftSidebar.collapsed && isRightOpen) {
      // Prefer keeping the nav (left), so close right.
      closePanel("right");
    }
  }, [layoutMode, leftSidebar.collapsed, isRightOpen, closePanel]);

  /** ---------------- SYNC RIGHT WIDTH TO CSS VAR + HTML CLASS ---------------- */
  useEffect(() => {
    const target = document.documentElement;
    const value = isRightOpen ? `${rightSidebar.width}px` : "0px";

    requestAnimationFrame(() => {
      target.style.setProperty("--right-sidebar-width", value);
      target.classList.toggle("right-open", isRightOpen);
    });
  }, [isRightOpen, rightSidebar.width]);

  /** ---------------- AUTO-CLOSE DRAWER ON PAGE CHANGE ---------------- */
  const location = useLocation();
  const navigate = useNavigate();

  const getBasePath = (path = "") => {
    const parts = path.split("/").filter(Boolean);
    return `/${parts.slice(0, 2).join("/") || ""}`;
  };

  /**
 * Close the right drawer AND normalize the URL back to the base
 * (/section/subsection). This keeps URL, CSS state, and drawer state in sync.
 */
const closeRightDrawerAndResetUrl = useCallback(() => {
  // 1. Save scroll BEFORE drawer closes
  scrollPosRef.current = window.scrollY;

  // 2. Close the drawer
  closeRightDrawer();

  // 3. Compute base path for removal of /:term
  const basePath = getBasePath(location.pathname);

  // 4. Navigate without losing scroll
  if (location.pathname !== basePath) {
    navigate(basePath, { replace: true });
    // Critical: restore next frame (router updates DOM first)
    requestAnimationFrame(() => {
      window.scrollTo({
        top: scrollPosRef.current,
        behavior: "instant", // prevent smooth scroll conflict
      });
    });
  }
}, [closeRightDrawer, location.pathname, navigate]);




  const prevBasePathRef = useRef(getBasePath(location.pathname));

  useEffect(() => {
    const nextBase = getBasePath(location.pathname);
    const prevBase = prevBasePathRef.current;

    if (nextBase !== prevBase && isRightOpen) {
      closeRightDrawer();
    }

    prevBasePathRef.current = nextBase;
  }, [location.pathname, isRightOpen, closeRightDrawer]);

  /** ---------------- WIDE-MODE SAFEGUARD (two panels push main) ---------------- */
  useEffect(() => {
    if (layoutMode !== "wide" || leftSidebar.collapsed || !isRightOpen) {
      return;
    }

    const available = Math.max(viewportWidth - MIN_MAIN_WIDTH, 0);

    if (leftSidebar.width + rightSidebar.width > available) {
      if (leftSidebar.width > rightSidebar.width) {
        leftSidebar.setWidth(
          Math.max(available - rightSidebar.width, leftSidebar.minWidth)
        );
      } else {
        rightSidebar.setWidth(
          Math.max(available - leftSidebar.width, rightSidebar.minWidth)
        );
      }
    }
  }, [
    layoutMode,
    viewportWidth,
    leftSidebar.width,
    rightSidebar.width,
    leftSidebar.minWidth,
    rightSidebar.minWidth,
    leftSidebar.collapsed,
    isRightOpen,
    leftSidebar,
    rightSidebar,
  ]);

  /** ---------------- NAVBAR HEIGHT SYNC ---------------- */
  useEffect(() => {
    const fixedHeight = "80px";
    document.documentElement.style.setProperty("--navbar-height", fixedHeight);
    document.documentElement.style.setProperty("--nav-bar-height", fixedHeight);
  }, []);

  /** ---------------- KEYBOARD RESIZE SUPPORT (unchanged) ---------------- */
  useEffect(() => {
    const handleKeyResize = (e) => {
      if (e.altKey || e.metaKey || e.ctrlKey) return;

      if (e.key === "[" && !leftSidebar.collapsed) {
        e.preventDefault();
        leftSidebar.setWidth(
          Math.max(leftSidebar.width - 10, leftSidebar.minWidth)
        );
      } else if (e.key === "]" && !leftSidebar.collapsed) {
        e.preventDefault();
        leftSidebar.setWidth(
          Math.min(leftSidebar.width + 10, leftSidebar.maxWidth)
        );
      }
    };

    window.addEventListener("keydown", handleKeyResize);
    return () => window.removeEventListener("keydown", handleKeyResize);
  }, [leftSidebar]);

  /** ---------------- CONTEXT VALUE ---------------- */
  const layoutValue = useMemo(
    () => ({
      layoutMode,
      panelManager: {
        openPanel,
        closePanel,
        togglePanel,
      },

      rightSidebar,
      rightContent,
      isRightOpen,
      openRightDrawer,
      closeRightDrawer,

      leftSidebar: {
        width: leftSidebar.width,
        collapsed: leftSidebar.collapsed,
        minWidth: leftSidebar.minWidth,
        maxWidth: leftSidebar.maxWidth,
        collapsedWidth: leftSidebar.collapsedWidth,
        toggle: () => togglePanel("left"),
      },
    }),
    [
      layoutMode,
      openPanel,
      closePanel,
      togglePanel,
      rightSidebar,
      rightContent,
      isRightOpen,
      openRightDrawer,
      closeRightDrawer,
      leftSidebar.width,
      leftSidebar.collapsed,
      leftSidebar.minWidth,
      leftSidebar.maxWidth,
      leftSidebar.collapsedWidth,
    ]
  );

  /** ---------------- DEV-ONLY MODE BADGE (remove if you want) ---------------- */
  const hasOverlayPanelOpen =
    layoutMode === "overlay" &&
    (!leftSidebar.collapsed || isRightOpen);

  /** ---------------- RENDER ---------------- */
  return (
    <LayoutContext.Provider value={layoutValue}>
      <div
        className={
          "sidebar-layout" + (hasOverlayPanelOpen ? " has-panel-open" : "")
        }
        data-layout-mode={layoutMode}
      >
        <NavBar layoutMode={layoutMode} />


        {/* Optional helper badge for QA / dev; you can remove this later */}
        <div className="layout-mode-badge">{layoutMode}</div>

        {/* Reserved flex rail under NavBar (unchanged) */}
        <div className="layout-rail" role="presentation" />

        {/* LEFT: Contents sidebar (hidden on /search) */}
        {!window.location.pathname.startsWith("/search") && (
          <ContentsSidebar
            className={!leftSidebar.collapsed ? "open" : ""}
            width={leftSidebar.width}
            collapsed={!!leftSidebar.collapsed}
            isResizing={leftSidebar.isResizing}
            onToggleSidebar={() => togglePanel("left")}
            onStartResize={leftSidebar.startResize}
            onHandleKeyDown={leftSidebar.handleKeyDown}
          />
        )}

        {/* MAIN CONTENT */}
        <main id="main" className="main-content" ref={mainRef}>
          <div className="main-shift" ref={innerRef}>
            {children}
          </div>
        </main>

        {/* RIGHT: Drawer (content only) */}
        <aside
          className={`right-sidebar ${isRightOpen ? "open" : "close"}`}
          aria-label="Right sidebar drawer"
        >
          {isRightOpen && (
            <>
              <button
                onClick={closeRightDrawerAndResetUrl}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    closeRightDrawerAndResetUrl();
                  }
                }}
                className="right-drawer-close-btn"
                aria-label="Close right sidebar"
                tabIndex={0}
                title="Close sidebar"
              >
                ✕
              </button>

              <div className="drawer-content scrollable-drawer">
                {rightContent}
              </div>
            </>
          )}
        </aside>

        {/* RIGHT: External resize hitbox (unchanged) */}
        {isRightOpen && (
          <div
            className={`right-resize-hitbox ${
              rightSidebar.isResizing ? "is-resizing" : ""
            }`}
            onMouseDown={rightSidebar.startResize}
            onTouchStart={rightSidebar.startResize}
            onKeyDown={rightSidebar.handleKeyDown}
            role="separator"
            tabIndex={0}
            aria-orientation="vertical"
            aria-label="Resize right sidebar"
            aria-valuenow={rightSidebar.width}
            aria-valuemin={rightSidebar.minWidth}
            aria-valuemax={rightSidebar.maxWidth}
          />
        )}
      </div>
    </LayoutContext.Provider>
  );
}
