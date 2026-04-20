import "../styles/MarkdownPage.css";
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import useResizableSidebar from "../hooks/useResizableSidebar";
import { LayoutContext } from "./LayoutContext";
import ContentsSidebar from "../components/ContentsSidebar";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

/**
 * SidebarLayout
 * ---------------------------------------------------------------------------
 * - Keeps existing resizable sidebars + drawer behavior.
 * - Adds a tiny panelManager (state-machine-ish) to centralize “who can be open”.
 * - Uses a layoutMode ("wide" | "overlay") for behavior decisions.
 * - Exposes layoutMode via data attribute + context for CSS/consumers.
 */
export default function SidebarLayout({ children }) {
  /** ---------------- DOM REFS (for optional freeze logic) ---------------- */
  const mainRef = useRef(null);
  const innerRef = useRef(null);
  const footerRef = useRef(null);
  const scrollPosRef = useRef(0);
  const leftSidebarRef = useRef(null);
  const rightSidebarRef = useRef(null);
  const rightCloseButtonRef = useRef(null);
  const prevLeftOpenRef = useRef(false);
  const prevRightOpenRef = useRef(false);
  function getScrollContainer() {
    if (typeof document !== "undefined") {
      const main = document.getElementById("main");
      if (main) return main;
    }
    return window;
  }

  /** ---------------- VIEWPORT WIDTH + LAYOUT MODE ---------------- */
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1440,
  );
  // Track sidebar widths for layout calculation
  // const [leftWidth, setLeftWidth] = useState(322);
  const leftWidth = 322;
  const rightWidth = 300;

  // --- Layout mode logic: returns "wide" or "overlay" ---
  function computeLayoutMode() {
    const mainWidth = viewportWidth - (leftWidth || 0) - (rightWidth || 0);
    if (mainWidth < 410) return "overlay";
    return "wide";
  }
  const [showHeaderToggle, setShowHeaderToggle] = useState(true);
  const [leftSidebarCollapsed, setLeftSidebarCollapsed] = useState(
    computeLayoutMode() != "wide",
  );
  const [animateLeftSidebar, setAnimateLeftSidebar] = useState(false);
  const leftSidebarAnimationTimerRef = useRef(null);

  const layoutMode = useMemo(
    () => computeLayoutMode(),
    [viewportWidth, leftWidth, rightWidth],
  );

  useEffect(() => {
    const handleResize = () => setShowHeaderToggle(layoutMode === "wide");
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [layoutMode]);

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  // In overlay mode, we don’t need to freeze main content,
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
    collapsedWidth: 0,
    side: "left",
    cssVarName: "--left-sidebar-width",
    collapsed: leftSidebarCollapsed,
    setCollapsed: setLeftSidebarCollapsed,
    onStartResize: freezeForSidebars,
    onStopResize: releaseForSidebars,
    collapseAnimationDelay: layoutMode === "overlay" ? 350 : 0,
  });

  /** ---------------- RIGHT SIDEBAR CONFIG ---------------- */
  const rightSidebar = useResizableSidebar({
    storageKey: "rightSidebarWidth",
    side: "right",
    cssVarName: "--right-sidebar-width",
    onStartResize: freezeForSidebars,
    onStopResize: releaseForSidebars,
  });

  // Only auto-collapse left sidebar when transitioning into overlay mode
  const prevLayoutMode = useRef(layoutMode);
  useEffect(() => {
    if (
      layoutMode === "overlay" &&
      prevLayoutMode.current !== "overlay" &&
      !leftSidebarCollapsed
    ) {
      leftSidebar.toggleCollapsed();
    }
    prevLayoutMode.current = layoutMode;
  }, [layoutMode, leftSidebarCollapsed, leftSidebar]);

  useEffect(() => {
    if (typeof document !== "undefined") {
      if (
        leftSidebar.width > 0 &&
        !leftSidebarCollapsed &&
        layoutMode === "wide"
      ) {
        document.documentElement.classList.add("left-open");
      } else {
        document.documentElement.classList.remove("left-open");
      }
    }
  }, [leftSidebar.width, leftSidebarCollapsed, layoutMode]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.style.setProperty(
      "--left-sidebar-width",
      `${leftSidebar.width}px`,
    );
    document.documentElement.style.setProperty(
      "--right-sidebar-width",
      `${rightSidebar.width}px`,
    );
  }, [leftSidebar.width, rightSidebar.width]);

  useEffect(() => {
    if (typeof document === "undefined") return undefined;

    const updateFooterOverlapOffset = () => {
      const footerEl = footerRef.current;
      if (!footerEl) return;

      const footerTop = footerEl.getBoundingClientRect().top;
      const overlap = Math.max(0, window.innerHeight - footerTop);

      document.documentElement.style.setProperty(
        "--sidebar-footer-offset",
        `${Math.round(overlap)}px`,
      );
    };

    updateFooterOverlapOffset();
    window.addEventListener("scroll", updateFooterOverlapOffset, {
      passive: true,
    });
    window.addEventListener("resize", updateFooterOverlapOffset, {
      passive: true,
    });

    let resizeObserver = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        updateFooterOverlapOffset();
      });

      if (document.body) resizeObserver.observe(document.body);
      if (mainRef.current) resizeObserver.observe(mainRef.current);
      if (innerRef.current) resizeObserver.observe(innerRef.current);
      if (footerRef.current) resizeObserver.observe(footerRef.current);
    }

    return () => {
      window.removeEventListener("scroll", updateFooterOverlapOffset);
      window.removeEventListener("resize", updateFooterOverlapOffset);
      if (resizeObserver) resizeObserver.disconnect();
      document.documentElement.style.setProperty(
        "--sidebar-footer-offset",
        "0px",
      );
    };
  }, []);

  /** ---------------- RIGHT DRAWER CONTENT STATE ---------------- */
  const [rightContent, setRightContent] = useState(null);
  const [isRightOpen, setIsRightOpen] = useState(false);

  useEffect(() => {
    const isLeftOpen = !leftSidebarCollapsed;
    const wasLeftOpen = prevLeftOpenRef.current;

    if (isLeftOpen && !wasLeftOpen) {
      requestAnimationFrame(() => {
        const sidebarEl = leftSidebarRef.current;
        if (!sidebarEl) return;

        const firstFocusable = sidebarEl.querySelector(
          'button, [href], [tabindex]:not([tabindex="-1"])',
        );

        if (firstFocusable instanceof HTMLElement) {
          firstFocusable.focus();
        } else {
          sidebarEl.focus();
        }
      });
    }

    prevLeftOpenRef.current = isLeftOpen;
  }, [leftSidebarCollapsed]);

  useEffect(() => {
    const wasRightOpen = prevRightOpenRef.current;

    if (isRightOpen && !wasRightOpen) {
      requestAnimationFrame(() => {
        if (rightSidebarRef.current instanceof HTMLElement) {
          rightSidebarRef.current.focus({ preventScroll: true });
        }
      });
    }

    prevRightOpenRef.current = isRightOpen;
  }, [isRightOpen]);

  // Manage 'right-open' class on <html> when right sidebar is open in wide mode
  useEffect(() => {
    if (typeof document !== "undefined") {
      if (isRightOpen && layoutMode === "wide") {
        document.documentElement.classList.add("right-open");
      } else {
        document.documentElement.classList.remove("right-open");
      }
    }
  }, [isRightOpen, layoutMode]);

  /** ---------------- PANEL MANAGER (tiny state machine) ----------------
   *
   * Panels: "left" | "right"
   * Modes:
   *  - wide: both may be open; sidebars push content.
   *  - overlay: exactly one panel open at a time; panels overlay content.
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
        if (leftSidebarCollapsed) {
          leftSidebar.toggleCollapsed();
        }
      } else if (id === "right") {
        // In overlay mode, collapse left before opening right.
        if (layoutMode === "overlay" && !leftSidebarCollapsed) {
          leftSidebar.toggleCollapsed();
        }
        setIsRightOpen(true);
      }
    },
    [layoutMode, isRightOpen, leftSidebar],
  );

  useEffect(() => {
    if (typeof document !== "undefined") {
      const header = document.querySelector(".main-shift");
      const leftSidebarWidth = document.querySelector(".left-sidebar");
      const rightSidebarWidth = document.querySelector(".right-sidebar");
      if (!rightSidebarWidth) {
        if (
          header &&
          leftSidebarWidth &&
          header.offsetWidth + leftSidebarWidth.offsetWidth < 700 &&
          !leftSidebarCollapsed
        ) {
          leftSidebar.toggleCollapsed();
        }
      } else {
        if (computeLayoutMode == "overlay") {
          if (!leftSidebarCollapsed) {
            leftSidebar.toggleCollapsed();
          }
        } else {
          if (
            header &&
            leftSidebarWidth &&
            header.offsetWidth +
              leftSidebarWidth.offsetWidth +
              rightSidebarWidth.offsetWidth <
              700 &&
            !leftSidebarCollapsed
          ) {
            leftSidebar.toggleCollapsed();
          }
        }
      }
    }
  }, [viewportWidth, leftSidebarCollapsed, leftSidebar]);

  const closePanel = useCallback(
    (id) => {
      if (id === "left") {
        if (!leftSidebarCollapsed) {
          leftSidebar.toggleCollapsed();
        }
      } else if (id === "right") {
        if (isRightOpen) {
          setIsRightOpen(false);
          setRightContent(null);
        }
      }
    },
    [isRightOpen, leftSidebar],
  );

  const togglePanel = useCallback(
    (id) => {
      if (id === "left") {
        if (leftSidebarCollapsed) openPanel("left");
        else closePanel("left");
      } else if (id === "right") {
        if (isRightOpen) closePanel("right");
        else openPanel("right");
      }
    },
    [openPanel, closePanel, leftSidebarCollapsed, isRightOpen],
  );

  const handleManualLeftSidebarToggle = useCallback(() => {
    if (leftSidebarAnimationTimerRef.current) {
      clearTimeout(leftSidebarAnimationTimerRef.current);
    }

    setAnimateLeftSidebar(true);
    leftSidebar.toggleCollapsed();

    leftSidebarAnimationTimerRef.current = setTimeout(() => {
      setAnimateLeftSidebar(false);
      leftSidebarAnimationTimerRef.current = null;
    }, 450);
  }, [leftSidebar]);

  useEffect(() => {
    return () => {
      if (leftSidebarAnimationTimerRef.current) {
        clearTimeout(leftSidebarAnimationTimerRef.current);
      }

      if (typeof document !== "undefined") {
        document.documentElement.classList.remove(
          "left-sidebar-manual-transition",
        );
      }
    };
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;

    if (animateLeftSidebar) {
      document.documentElement.classList.add("left-sidebar-manual-transition");
    } else {
      document.documentElement.classList.remove(
        "left-sidebar-manual-transition",
      );
    }
  }, [animateLeftSidebar]);

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
    [openPanel],
  );

  /** When switching into overlay mode, enforce “only one panel open” */
  useEffect(() => {
    if (layoutMode !== "overlay") return;
    if (!leftSidebarCollapsed && isRightOpen) {
      // Prefer keeping the nav (left), so close right.
      closePanel("left");
    }
  }, [layoutMode, leftSidebarCollapsed, isRightOpen, closePanel]);

  /** ---------------- AUTO-CLOSE DRAWER ON PAGE CHANGE ---------------- */
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    requestAnimationFrame(() => {
      const mainEl = mainRef.current;
      if (mainEl instanceof HTMLElement) {
        mainEl.focus();
      }
    });
  }, [location.pathname]);

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
    const sc = getScrollContainer();
    const currentTop = sc === window ? window.scrollY || 0 : sc.scrollTop || 0;
    scrollPosRef.current = currentTop;

    // 2. Close the drawer
    closeRightDrawer();

    // 3. Compute base path for removal of /:term
    const basePath = getBasePath(location.pathname);

    // 4. Navigate without losing scroll
    if (location.pathname !== basePath) {
      navigate(basePath, { replace: true });

      // Restore AFTER router updates DOM
      requestAnimationFrame(() => {
        const sc2 = getScrollContainer();
        const top = scrollPosRef.current || 0;

        if (sc2 === window) {
          window.scrollTo({ top, behavior: "auto" });
        } else {
          sc2.scrollTo({ top, behavior: "auto" });
        }
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

  /** ---------------- KEYBOARD RESIZE SUPPORT (unchanged) ---------------- */
  useEffect(() => {
    const handleKeyResize = (e) => {
      if (e.altKey || e.metaKey || e.ctrlKey) return;

      if (e.key === "[" && !leftSidebarCollapsed) {
        e.preventDefault();
        leftSidebar.setWidth(
          Math.max(leftSidebar.width - 10, leftSidebar.minWidth),
        );
      } else if (e.key === "]" && !leftSidebarCollapsed) {
        e.preventDefault();
        leftSidebar.setWidth(
          Math.min(leftSidebar.width + 10, leftSidebar.maxWidth),
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
        ...leftSidebar,
        collapsed: leftSidebarCollapsed,
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
      leftSidebarCollapsed,
      leftSidebar.minWidth,
      leftSidebar.maxWidth,
      leftSidebar.collapsedWidth,
      leftSidebar.toggleCollapsed,
    ],
  );

  const focusFirstInContainer = useCallback((container) => {
    if (!(container instanceof HTMLElement)) return false;

    const firstFocusable = container.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );

    if (firstFocusable instanceof HTMLElement) {
      firstFocusable.focus();
      return true;
    }

    return false;
  }, []);

  const handleRightSidebarKeyDown = useCallback(
    (e) => {
      if (e.key !== "Tab" || e.shiftKey) return;
      if (e.target !== e.currentTarget) return;

      const didMove = focusFirstInContainer(e.currentTarget);
      if (didMove) e.preventDefault();
    },
    [focusFirstInContainer],
  );

  return (
    <LayoutContext.Provider value={layoutValue}>
      <div className={"sidebar-layout"} data-layout-mode={layoutMode}>
        <ContentsSidebar
          sidebarRef={leftSidebarRef}
          focusTabIndex={!leftSidebarCollapsed ? 3 : -1}
          onSidebarContainerKeyDown={handleRightSidebarKeyDown}
          className={!leftSidebarCollapsed ? "open" : ""}
          animateTransitions={animateLeftSidebar}
          width={leftSidebar.width}
          collapsed={leftSidebarCollapsed}
          setCollapsed={setLeftSidebarCollapsed}
          isResizing={leftSidebar.isResizing}
          onToggleSidebar={handleManualLeftSidebarToggle}
          onStartResize={leftSidebar.startResize}
          onHandleKeyDown={leftSidebar.handleKeyDown}
        />
        {showHeaderToggle && (
          <button
            className="header-toggle"
            onClick={() => {
              if (typeof leftSidebar?.toggleCollapsed === "function") {
                handleManualLeftSidebarToggle();
              }
            }}
            aria-label={
              leftSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
            }
            title={leftSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              focusable="false"
              aria-hidden="true"
              className={`header-toggle-icon ${leftSidebarCollapsed ? "is-collapsed" : "is-open"}`}
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m6 9 6 6 6-6"></path>
            </svg>
          </button>
        )}
        <main
          id="main"
          className="main-content"
          ref={mainRef}
          tabIndex={1}
          aria-label="Main content"
        >
          <div className="main-shift" ref={innerRef}>
            {children}
          </div>
        </main>
        <aside
          ref={rightSidebarRef}
          className={`right-sidebar ${isRightOpen ? "open" : "close"}`}
          aria-label="Right sidebar drawer"
          tabIndex={isRightOpen ? 2 : -1}
          onKeyDown={handleRightSidebarKeyDown}
          style={{ width: rightSidebar.width }}
        >
          {isRightOpen && (
            <>
              <button
                ref={rightCloseButtonRef}
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
        <div
          className={`right-resize-hitbox ${rightSidebar.isResizing ? "is-resizing" : ""}`}
          onMouseDown={rightSidebar.startResize}
          onTouchStart={rightSidebar.startResize}
          onKeyDown={rightSidebar.handleKeyDown}
          role="separator"
          tabIndex={isRightOpen ? 0 : -1}
          aria-orientation="vertical"
          aria-label="Resize drawer pane"
          aria-hidden={!isRightOpen}
        />
        <div ref={footerRef}>
          <Footer
            withSidebars
            isLeftOpen={!leftSidebarCollapsed}
            leftWidth={leftSidebar.width}
            isRightOpen={isRightOpen}
            rightWidth={rightSidebar.width}
          />
        </div>
      </div>
    </LayoutContext.Provider>
  );
}
