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

  /** ---------------- FREEZE / RELEASE MAIN CONTENT ---------------- */
  const freezeMainContent = () => {
    const main = document.querySelector(".main-content");
    const inner = document.querySelector(".main-content .main-shift");
    if (!main || !inner) return;

    const w = `${inner.offsetWidth}px`;
    document.documentElement.style.setProperty("--main-freeze-width", w);

    main.classList.add("main-frozen");
    inner.classList.add("frozen");

    inner.classList.remove("release");
  };

  const releaseMainContent = () => {
    const main = document.querySelector(".main-content");
    const inner = document.querySelector(".main-content .main-shift");
    if (!main || !inner) return;

    
    inner.classList.remove("frozen");
    inner.classList.add("release");

    // cleanup after animation (CSS snap is about 180ms)
    setTimeout(() => {
      main.classList.remove("release");
      document.documentElement.style.removeProperty("--main-freeze-width");
    }, 220);
  };

  /** ---------------- LEFT SIDEBAR CONFIG ---------------- */
  const leftSidebar = useResizableSidebar({
    storageKey: "leftSidebarWidth",
    defaultWidth: 250,
    minWidth: 200,
    maxWidth: 400,
    collapsedWidth: 0,
    side: "left",
    cssVarName: "--left-sidebar-width",

    /** Hook lifecycle integration */
    onStartResize: freezeMainContent,
    onStopResize: releaseMainContent,
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
    document.documentElement.style.setProperty(
      "--right-sidebar-width",
      `${rightSidebar.width}px`
    );
  };

  const closeRightDrawer = () => {
    setIsRightOpen(false);
    setRightContent(null);
    document.documentElement.style.setProperty("--right-sidebar-width", `0px`);
  };

  /** ---------------- RESPONSIVE SAFEGUARD ---------------- */
  const MIN_MAIN_WIDTH = 700;
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1440
  );

  useEffect(() => {
    const availableForSidebars = Math.max(viewportWidth - MIN_MAIN_WIDTH, 0);

    if (leftSidebar.width + rightSidebar.width > availableForSidebars) {
      if (leftSidebar.width > rightSidebar.width) {
        leftSidebar.setWidth(
          Math.max(
            availableForSidebars - rightSidebar.width,
            leftSidebar.minWidth
          )
        );
      } else {
        rightSidebar.setWidth(
          Math.max(
            availableForSidebars - leftSidebar.width,
            rightSidebar.minWidth
          )
        );
      }
    }
  }, [
    viewportWidth,
    leftSidebar.width,
    rightSidebar.width,
    leftSidebar.minWidth,
    rightSidebar.minWidth,
  ]);

  /** ---------------- NAVBAR HEIGHT SYNC ---------------- */
  useEffect(() => {
    const navbar = document.querySelector(".top-navbar");
    const toolbar = document.querySelector(".content-toolbar");
    if (!navbar) return;

    const setHeightVars = () => {
      const navH = `${navbar.offsetHeight || 0}px`;
      const toolH = toolbar
        ? `${toolbar.offsetHeight || 0}px`
        : getComputedStyle(document.documentElement).getPropertyValue(
            "--toolbar-height"
          ) || "0px";
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

  /** ---------------- RIGHT WIDTH CSS VAR ---------------- */
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--right-sidebar-width",
      `${isRightOpen ? rightSidebar.width : 0}px`
    );
  }, [rightSidebar.width, isRightOpen]);

  /** ---------------- KEYBOARD RESIZE SUPPORT ---------------- */
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

  /**
   * ---------------- CONTEXT (non-hot-path only) ----------------
   */
  const layoutValue = useMemo(
    () => ({
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

        {!window.location.pathname.startsWith("/search") && (
          <ContentsSidebar
            className={!leftSidebar.collapsed ? "open" : ""}
            width={leftSidebar.width}
            collapsed={!!leftSidebar.collapsed}
            isResizing={leftSidebar.isResizing}
            onToggleSidebar={leftSidebar.toggleCollapsed}
            onStartResize={leftSidebar.startResize}
            onHandleKeyDown={leftSidebar.handleKeyDown}
          />
        )}

        <main id="main" className="main-content">
  {/* This inner wrapper is what we shift during drag */}
  <div className="main-shift">
    {children}
  </div>
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

              <div className="drawer-content scrollable-drawer">
                {rightContent}
              </div>

              <div
                className={`right-resizer ${
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
            </>
          )}
        </aside>
      </div>
    </LayoutContext.Provider>
  );
}
