import { useState, useEffect, useMemo } from "react";
import useResizableSidebar from "../hooks/useResizableSidebar";
import { LayoutContext } from "./LayoutContext";
import NavBar from "../components/NavBar";

export default function SidebarLayout({ children }) {
  // Left sidebar setup and persistence
  const leftSidebar = useResizableSidebar({
    storageKey: "leftSidebarWidth",
    defaultWidth: 250,
    minWidth: 200,
    maxWidth: 400,
    collapsedWidth: 0,
    side: "left",
    cssVarName: "--left-sidebar-width",
  });

  // Right sidebar setup and persistence
  const rightSidebar = useResizableSidebar({
    storageKey: "rightSidebarWidth",
    defaultWidth: 400,
    minWidth: 375,
    maxWidth: 700,
    side: "right",
    cssVarName: "--right-sidebar-width",
  });

  // State for right drawer content and visibility
  const [rightContent, setRightContent] = useState(null);
  const [isRightOpen, setIsRightOpen] = useState(false);

  /** Opens the right drawer and sets its content */
  const openRightDrawer = (content) => {
    setIsRightOpen(true);
    setRightContent(content);
  };

  /** Closes the right drawer and clears its content */
  const closeRightDrawer = () => {
    setIsRightOpen(false);
    setRightContent(null);
  };

  const MIN_MAIN_WIDTH = 700;
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1440
  );

  /** Dynamically ensures both sidebars fit within the viewport */
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

  /** Updates viewport width when window resizes */
  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /** Syncs sidebar widths to CSS custom properties */
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
   * Memoized layout context value to prevent unnecessary re-renders 
   * across the app when sidebar state changes.
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
    [leftSidebar, rightSidebar, rightContent, isRightOpen, openRightDrawer, closeRightDrawer]
  );

  return (
    <LayoutContext.Provider value={layoutValue}>
      <div className="sidebar-layout">
        <NavBar />

        {/* Collapsible left sidebar toggle */}
        <button
          className="toggle-btn"
          onClick={leftSidebar.toggleCollapsed}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              leftSidebar.toggleCollapsed();
            }
          }}
          aria-pressed={leftSidebar.collapsed}
          aria-label={leftSidebar.collapsed ? "Expand sidebar" : "Collapse sidebar"}
          title="Toggle sidebar"
          style={{
            left: leftSidebar.collapsed ? "8px" : `${leftSidebar.width - 16}px`,
          }}
        >
          {leftSidebar.collapsed ? "▶" : "◀"}
        </button>

        <main id="main" className="main-content">
          {children}
        </main>

        {/* Right Drawer */}
        {isRightOpen && (
          <aside
            className="right-sidebar opening"
            aria-label="Right sidebar drawer"
            onTransitionEnd={(e) => {
              if (e.propertyName === "width") {
                e.currentTarget.classList.remove("opening");
                e.currentTarget.classList.add("opened");
              }
            }}
          >
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

            {/* Scrollable content area */}
            <div className="drawer-content scrollable-drawer">{rightContent}</div>

            {/* Right resize handle */}
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
          </aside>
        )}
      </div>
    </LayoutContext.Provider>
  );
}
