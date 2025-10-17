import { useState, useEffect } from "react";
import useResizableSidebar from "../hooks/useResizableSidebar";
import { LayoutContext } from "./LayoutContext";
import NavBar from "../components/NavBar";

export default function SidebarLayout({ children }) {
  const leftSidebar = useResizableSidebar({
    storageKey: "leftSidebarWidth",
    defaultWidth: 250,
    minWidth: 200,
    maxWidth: 400,
    collapsedWidth: 0,
    side: "left",
    cssVarName: "--left-sidebar-width",
  });

  const rightSidebar = useResizableSidebar({
    storageKey: "rightSidebarWidth",
    defaultWidth: 400,
    minWidth: 300,
    maxWidth: 700,
    side: "right",
    cssVarName: "--right-sidebar-width",
  });

  const [rightContent, setRightContent] = useState(null);
  const [isRightOpen, setIsRightOpen] = useState(false);

  const openRightDrawer = (content) => {
    setIsRightOpen(true);
    setRightContent(content);
  };

  const closeRightDrawer = () => {
    setIsRightOpen(false);
    setRightContent(null);
  };

  const MIN_MAIN_WIDTH = 700;
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1440
  );

  // 🧠 Fix: Move width adjustment into an effect to avoid render loops
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

  // 🪟 Update on window resize
  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Sync CSS custom properties
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

  const layoutValue = {
    leftSidebar,
    rightSidebar,
    rightContent,
    isRightOpen,
    openRightDrawer,
    closeRightDrawer,
  };

  return (
    <LayoutContext.Provider value={layoutValue}>
      <div className="sidebar-layout">
        <NavBar />

        {/* Sidebar Toggle Button */}
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

        {isRightOpen && (
          <aside className="right-sidebar" aria-label="Right sidebar drawer">
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
            <div className="drawer-content">{rightContent}</div>
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
