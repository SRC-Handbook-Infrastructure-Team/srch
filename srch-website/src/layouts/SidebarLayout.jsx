import { useState, useEffect, useMemo } from "react";
import useResizableSidebar from "../hooks/useResizableSidebar";
import { LayoutContext } from "./LayoutContext";
import NavBar from "../components/NavBar";
import SidebarToggleButton from "../components/SidebarToggleButton"; // ← NEW

/**
 * SidebarLayout
 * -----------------------------------------------------------------------------
 * This component defines the overall two-sidebar layout for the application.
 * It manages:
 *   • The left navigation sidebar (NavBar)
 *   • The right contextual drawer (Additional Information panel)
 *   • The main content region between them
 *
 * Responsibilities:
 *   - Integrate the resizable sidebar hook for both sides (persisting width)
 *   - Ensure smooth, performant resizing via CSS variables + rAF throttling
 *   - Coordinate open/close and animation state for both panels
 *   - Provide layout context globally via React Context
 * -----------------------------------------------------------------------------
 */
export default function SidebarLayout({ children }) {
  /**
   * LEFT SIDEBAR CONFIGURATION
   * --------------------------------------------------------------
   * Uses the custom hook `useResizableSidebar` to manage:
   *   - Persisted width via localStorage
   *   - Resizing logic (drag and keyboard)
   *   - Collapsing / expanding state
   *   - Sync with CSS variable (--left-sidebar-width)
   */
  const leftSidebar = useResizableSidebar({
    storageKey: "leftSidebarWidth",
    defaultWidth: 250,
    minWidth: 200,
    maxWidth: 400,
    collapsedWidth: 0,
    side: "left",
    cssVarName: "--left-sidebar-width",
  });

  /**
   * RIGHT SIDEBAR CONFIGURATION
   * --------------------------------------------------------------
   * Similarly handles a resizable right drawer used for additional content.
   */
  const rightSidebar = useResizableSidebar({
    storageKey: "rightSidebarWidth",
    defaultWidth: 400,
    minWidth: 375,
    maxWidth: 700,
    side: "right",
    cssVarName: "--right-sidebar-width",
  });

  /**
   * RIGHT DRAWER VISIBILITY + CONTENT STATE
   * --------------------------------------------------------------
   * Stores the React node rendered inside the right drawer and
   * controls whether the drawer is open.
   */
  const [rightContent, setRightContent] = useState(null);
  const [isRightOpen, setIsRightOpen] = useState(false);

  /** Opens the right drawer and sets its inner content */
  const openRightDrawer = (content) => {
    setIsRightOpen(true);
    setRightContent(content);
  };

  /** Closes the right drawer and clears content */
  const closeRightDrawer = () => {
    setIsRightOpen(false);
    setRightContent(null);
  };

  /**
   * RESPONSIVE WIDTH SAFEGUARD
   * --------------------------------------------------------------
   * Ensures that combined sidebar widths never exceed viewport
   * space minus a minimum main content width (700px).
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
          Math.max(
            availableForSidebars - rightSidebar.width,
            leftSidebar.minWidth || 180
          )
        );
      } else {
        rightSidebar.setWidth(
          Math.max(
            availableForSidebars - leftSidebar.width,
            rightSidebar.minWidth || 300
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
    leftSidebar.setWidth,
    rightSidebar.setWidth,
  ]);

  /** Track and update viewport width on browser resize */
  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /**
   * CSS VARIABLE SYNCHRONIZATION
   * --------------------------------------------------------------
   * Writes live sidebar widths to CSS variables so layout styles
   * can react instantly without re-rendering React components.
   * (This preserves smooth drag performance.)
   */
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--left-sidebar-width",
      `${leftSidebar.collapsed ? leftSidebar.collapsedWidth : leftSidebar.width}px`
    );
    document.documentElement.style.setProperty(
      "--right-sidebar-width",
      `${isRightOpen ? rightSidebar.width : 0}px`
    );
  }, [leftSidebar.width, leftSidebar.collapsed, rightSidebar.width, isRightOpen]);

  /**
   * MEMOIZED LAYOUT CONTEXT VALUE
   * --------------------------------------------------------------
   * Prevents unnecessary React re-renders across the app by
   * memoizing all sidebar-related state and handlers.
   */
  const layoutValue = useMemo(
    () => ({
      leftSidebar,
      rightSidebar,
      rightContent,
      isRightOpen,
      openRightDrawer,
      closeRightDrawer,
    }),
    [
      leftSidebar,
      rightSidebar,
      rightContent,
      isRightOpen,
      openRightDrawer,
      closeRightDrawer,
    ]
  );

  /**
   * RENDER STRUCTURE
   * --------------------------------------------------------------
   * - Provides layout context to all child components
   * - Renders the fixed left NavBar sidebar (with slide-in animation)
   * - Displays a toggle button to collapse/expand left sidebar
   * - Wraps the main content region
   * - Renders the right drawer (conditionally), which also slides in
   */
  return (
    <LayoutContext.Provider value={layoutValue}>
      <div className="sidebar-layout">
        {/* LEFT SIDEBAR NAVIGATION (NavBar)
            Directly rendered; className toggles "open" for CSS animation */}
        <NavBar className={!leftSidebar.collapsed ? "open" : ""} />

        {/* Floating Hamburger (always visible top-left) */}
        <SidebarToggleButton />

        {/* MAIN CONTENT AREA */}
        <main id="main" className="main-content">
          {children}
        </main>

        {/* RIGHT DRAWER PANEL
            Add "open" class when visible to trigger CSS slide-in animation */}
        <aside
          className={`right-sidebar ${isRightOpen ? "open" : ""}`}
          aria-label="Right sidebar drawer"
          onTransitionEnd={(e) => {
            if (e.propertyName === "width") {
              e.currentTarget.classList.remove("opening");
              e.currentTarget.classList.add("opened");
            }
          }}
        >
          {isRightOpen && (
            <>
              {/* Header with Close Button */}
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

              {/* Scrollable Drawer Content Area */}
              <div className="drawer-content scrollable-drawer">{rightContent}</div>

              {/* Right Resize Handle */}
              <div
                className={`resize-handle ${rightSidebar.isResizing ? "resizing" : ""}`}
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
