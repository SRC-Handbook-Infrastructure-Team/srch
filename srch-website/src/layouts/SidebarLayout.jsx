import { useState, useEffect, useMemo } from "react";
import useResizableSidebar from "../hooks/useResizableSidebar";
import { LayoutContext } from "./LayoutContext";
import NavBar from "../components/NavBar";
import ContentsSidebar from "../components/ContentsSidebar";

/**
 * SidebarLayout
 * -----------------------------------------------------------------------------
 * Two sidebars + top NavBar + main content.
 *
 * Performance principles applied:
 * 1) Move resize work off React's render path (done in useResizableSidebar).
 * 2) Pass explicit props for the left sidebar (width, handlers) to avoid
 *    context churn during drag. Context remains for non-hot-path consumers
 *    (e.g., header buttons elsewhere).
 * 3) Sync CSS vars for widths in the hook + here for the right drawer open/close.
 * 4) Avoid unnecessary effects; rely on ResizeObserver + rAF inside the hook.
 * -----------------------------------------------------------------------------
 */
export default function SidebarLayout({ children }) {
  /** ---------------- LEFT SIDEBAR CONFIG ---------------- */
  const leftSidebar = useResizableSidebar({
    storageKey: "leftSidebarWidth",
    defaultWidth: 250,
    minWidth: 200,
    maxWidth: 400,
    collapsedWidth: 0,
    side: "left",
    cssVarName: "--left-sidebar-width",
  });

  /** ---------------- RIGHT SIDEBAR CONFIG ---------------- */
  const rightSidebar = useResizableSidebar({
    storageKey: "rightSidebarWidth",
    defaultWidth: 400,
    minWidth: 375,
    maxWidth: 700,
    side: "right",
    cssVarName: "--right-sidebar-width",
  });

  /** ---------------- RIGHT DRAWER STATE ---------------- */
  const [rightContent, setRightContent] = useState(null);
  const [isRightOpen, setIsRightOpen] = useState(false);

  const openRightDrawer = (content) => {
    setIsRightOpen(true);
    setRightContent(content);
    // Ensure CSS var is set immediately so the drawer can slide in smoothly
    document.documentElement.style.setProperty(
      "--right-sidebar-width",
      `${rightSidebar.width}px`
    );
  };

  const closeRightDrawer = () => {
    setIsRightOpen(false);
    setRightContent(null);
    // Collapse to 0 so main content snaps back without layout jank
    document.documentElement.style.setProperty("--right-sidebar-width", `0px`);
  };

  /** ---------------- RESPONSIVE SAFEGUARD ----------------
   * Keep a minimum readable main area. If both sidebars would compress the
   * main content below MIN_MAIN_WIDTH, shrink the larger sidebar just-in-time.
   */
  const MIN_MAIN_WIDTH = 700;
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1440
  );

  useEffect(() => {
    const availableForSidebars = Math.max(viewportWidth - MIN_MAIN_WIDTH, 0);
    if (leftSidebar.width + rightSidebar.width > availableForSidebars) {
      if (leftSidebar.width > rightSidebar.width) {
        leftSidebar.setWidth(
          Math.max(availableForSidebars - rightSidebar.width, leftSidebar.minWidth)
        );
      } else {
        rightSidebar.setWidth(
          Math.max(availableForSidebars - leftSidebar.width, rightSidebar.minWidth)
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    viewportWidth,
    leftSidebar.width,
    rightSidebar.width,
    leftSidebar.minWidth,
    rightSidebar.minWidth,
  ]);

  /** ---------------- NAVBAR HEIGHT SYNC ----------------
   * Keep CSS vars in sync with real DOM heights for accurate sticky positioning.
   */
  useEffect(() => {
    const navbar = document.querySelector(".top-navbar");
    const toolbar = document.querySelector(".content-toolbar");
    if (!navbar) return;

    const setHeightVars = () => {
      const navH = `${navbar.offsetHeight || 0}px`;
      const toolH = toolbar
        ? `${toolbar.offsetHeight || 0}px`
        : getComputedStyle(document.documentElement).getPropertyValue("--toolbar-height") || "0px";
      document.documentElement.style.setProperty("--navbar-height", navH);
      document.documentElement.style.setProperty("--nav-bar-height", navH);
      document.documentElement.style.setProperty("--toolbar-height", toolH);
    };

    setHeightVars();

    const observers = [];
    if (typeof ResizeObserver !== "undefined") {
      const navObserver = new ResizeObserver(setHeightVars);
      navObserver.observe(navbar);
      observers.push(navObserver);
      if (toolbar) {
        const toolObserver = new ResizeObserver(setHeightVars);
        toolObserver.observe(toolbar);
        observers.push(toolObserver);
      }
    }
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  /** ---------------- VIEWPORT WIDTH TRACKER ---------------- */
  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /** ---------------- RIGHT WIDTH CSS VAR (open/close) ----------------
   * The hook already syncs var during drag; this ensures the closed state
   * drives the CSS var to 0 so layout is instant.
   */
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--right-sidebar-width",
      `${isRightOpen ? rightSidebar.width : 0}px`
    );
  }, [rightSidebar.width, isRightOpen]);

  /** ---------------- KEYBOARD RESIZE SUPPORT (optional global) ----------------
   * Keep for convenience: [ and ] adjust left sidebar without focusing the handle.
   * (Hook also exposes an ARIA-compliant key handler on the separator.)
   */
  useEffect(() => {
    const handleKeyResize = (e) => {
      if (e.altKey || e.metaKey || e.ctrlKey) return;
      if (e.key === "[" && !leftSidebar.collapsed) {
        e.preventDefault();
        leftSidebar.setWidth(Math.max(leftSidebar.width - 10, leftSidebar.minWidth));
      } else if (e.key === "]" && !leftSidebar.collapsed) {
        e.preventDefault();
        leftSidebar.setWidth(Math.min(leftSidebar.width + 10, leftSidebar.maxWidth));
      }
    };
    window.addEventListener("keydown", handleKeyResize);
    return () => window.removeEventListener("keydown", handleKeyResize);
  }, [leftSidebar]);

  /**
   * ---------------- CONTEXT (non-hot-path only) ----------------
   * We still provide context for consumers that are NOT resizing hot paths
   * (e.g., top-level header buttons). ContentsSidebar will receive explicit props
   * so it doesn't re-render on every drag tick.
   */
  const layoutValue = useMemo(
    () => ({
      // Keep references around for non-critical consumers
      rightSidebar,
      rightContent,
      isRightOpen,
      openRightDrawer,
      closeRightDrawer,
      // Expose a minimal left API for non-hot-path consumers that might still read it
      leftSidebar: {
        width: leftSidebar.width,
        collapsed: leftSidebar.collapsed,
        minWidth: leftSidebar.minWidth,
        maxWidth: leftSidebar.maxWidth,
        collapsedWidth: leftSidebar.collapsedWidth,
        toggle: leftSidebar.toggleCollapsed,
      },
    }),
    [
      rightSidebar,
      rightContent,
      isRightOpen,
      leftSidebar.width,
      leftSidebar.collapsed,
      leftSidebar.minWidth,
      leftSidebar.maxWidth,
      leftSidebar.collapsedWidth,
    ]
  );

  /** ---------------- RENDER ---------------- */
  return (
    <LayoutContext.Provider value={layoutValue}>
      <div className="sidebar-layout">
        <NavBar />

        {/* Avoid reading from context in the hot path: pass explicit props. */}
        {!window.location.pathname.startsWith("/search") && (
          <ContentsSidebar
            className={!leftSidebar.collapsed ? "open" : ""}
            // explicit props to avoid context updates during drag
            width={leftSidebar.width}
            collapsed={!!leftSidebar.collapsed}
            isResizing={leftSidebar.isResizing}
            onToggleSidebar={leftSidebar.toggleCollapsed}
            onStartResize={leftSidebar.startResize}
            onHandleKeyDown={leftSidebar.handleKeyDown}
          />
        )}

        <main id="main" className="main-content">
          {children}
        </main>

        {/* Right Drawer */}
        <aside
          className={`right-sidebar ${isRightOpen ? "open" : ""}`}
          aria-label="Right sidebar drawer"
        >
          {isRightOpen && (
            <>
              <div className="drawer-header">
                <span>Additional Information</span>
                <button
                  onClick={closeRightDrawer}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      closeRightDrawer();
                    }
                  }}
                  className="drawer-close-btn"
                  tabIndex={0}
                  aria-label="Close right sidebar"
                  title="Close sidebar"
                >
                  ✕
                </button>
              </div>

              <div className="drawer-content scrollable-drawer">{rightContent}</div>

              {/* Resize handle (left edge of the right drawer) */}
              <div
                className={`right-resizer ${rightSidebar.isResizing ? "is-resizing" : ""}`}
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
            </>
          )}
        </aside>
      </div>
    </LayoutContext.Provider>
  );
}
