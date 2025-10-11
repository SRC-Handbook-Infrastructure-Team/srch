// src/layouts/MainLayout.jsx
import { useState, useEffect } from "react";
import useResizableSidebar from "../hooks/useResizableSidebar";
import { LayoutContext } from "./LayoutContext";
import NavBar from "../components/NavBar";

export default function MainLayout({ children }) {
  // --- Left sidebar (NavBar) ---
  const leftSidebar = useResizableSidebar({
    storageKey: "leftSidebarWidth",
    defaultWidth: 250,
    minWidth: 200,
    maxWidth: 400,
    collapsedWidth: 0,
    side: "left",
    cssVarName: "--left-sidebar-width",
  });

  // --- Right sidebar ---
  const rightSidebar = useResizableSidebar({
    storageKey: "rightSidebarWidth",
    defaultWidth: 400,
    minWidth: 300,
    maxWidth: 700,
    side: "right",
    cssVarName: "--right-sidebar-width",
  });

  // --- State for right drawer content (opened via MarkdownPage etc.) ---
  const [rightContent, setRightContent] = useState(null);
  const [isRightOpen, setIsRightOpen] = useState(false);

  // --- Open/close functions exposed through LayoutContext ---
  const openRightDrawer = (content) => {
    setRightContent(content);
    setIsRightOpen(true);
  };
  const closeRightDrawer = () => {
    setIsRightOpen(false);
    setRightContent(null);
  };

  // --- Prevent both sidebars from shrinking main content too much ---
  const MIN_MAIN_WIDTH = 700; // minimum readable main content area
  const viewportWidth = typeof window !== "undefined" ? window.innerWidth : 1440;
  const availableForSidebars = Math.max(viewportWidth - MIN_MAIN_WIDTH, 0);

  // clamp total width so main content never collapses
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

  // --- Live clamp if viewport resizes (optional improvement) ---
  useEffect(() => {
    const handleResize = () => {
      const newAvailable = window.innerWidth - MIN_MAIN_WIDTH;
      if (leftSidebar.width + rightSidebar.width > newAvailable) {
        if (leftSidebar.width > rightSidebar.width) {
          leftSidebar.setWidth(newAvailable - rightSidebar.width);
        } else {
          rightSidebar.setWidth(newAvailable - leftSidebar.width);
        }
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [leftSidebar, rightSidebar]);

  // --- Sync CSS vars globally for layout margins ---
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--left-sidebar-width",
      `${leftSidebar.collapsed ? leftSidebar.collapsedWidth : leftSidebar.width}px`
    );
    document.documentElement.style.setProperty(
      "--right-sidebar-width",
      `${isRightOpen ? rightSidebar.width : 0}px`
    );
  }, [
    leftSidebar.width,
    leftSidebar.collapsed,
    leftSidebar.collapsedWidth,
    rightSidebar.width,
    isRightOpen,
  ]);

  // --- Provide shared layout context ---
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
      <div
        style={{
          "--content-gap": "3px",
          display: "block",
        }}
      >
        {/* Left Sidebar (NavBar) */}
        <NavBar />
        {/* Collapse/Expand Keyboard Toggle */}
        <button
            onClick={leftSidebar.toggleCollapsed}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    leftSidebar.toggleCollapsed();
                }
            }}
            aria-pressed={leftSidebar.collapsed}
            aria-label={leftSidebar.collapsed ? "Expand sidebar" : "Collapse sidebar"}
            style={{
                position: "fixed",  
                top: "50%",
                left: leftSidebar.collapsed ? "8px" : `${leftSidebar.width - 16}px`,
                transform: "translateY(-50%)",
                zIndex: 25,
                background: "white",
                border: "1px solid #ccc",
                borderRadius: "4px",
                cursor: "pointer",
                padding: "4px 8px",
            }}
            title="Toggle sidebar"
        >
            {leftSidebar.collapsed ? "▶" : "◀"}
        </button>

        {/* Main content area */}
        <main
          id="main"
          style={{
            marginLeft: "calc(var(--left-sidebar-width) - 50px)",
            marginRight: "calc(var(--right-sidebar-width) - 40px)",
            transition: "margin 150ms ease",
            minHeight: "100vh",
          }}
        >
          {children}
        </main>

        {/* Right Sidebar (pushes content instead of overlaying it) */}
        {isRightOpen && (
          <aside
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              height: "100vh",
              width: `${rightSidebar.width}px`,
              borderLeft: "1px solid var(--chakra-colors-gray-200)",
              backgroundColor: "white",
              boxShadow: "lg",
              overflowY: "auto",
              zIndex: 20,
              transition: "width 0.2s ease",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Header + Close Button */}
            <div
              style={{
                borderBottom: "1px solid var(--chakra-colors-gray-200)",
                padding: "12px 16px",
                fontWeight: "600",
                fontSize: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>Additional Information</span>
              <button
                onClick={closeRightDrawer}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "18px",
                  cursor: "pointer",
                  color: "#555",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#f0f0f0")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
                onFocus={(e) => (e.currentTarget.style.outline = "2px solid #3182ce")}                aria-label="Close right sidebar"
              >
                ✕
              </button>
            </div>

            {/* Body content */}
            <div style={{ padding: "16px" }}>{rightContent}</div>

            {/* Resize handle on the left edge */}
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: "6px",
                cursor: "ew-resize",
                background: rightSidebar.isResizing
                  ? "rgba(37,99,235,0.15)"
                  : "transparent",
              }}
              onMouseDown={rightSidebar.startResize}
              onTouchStart={rightSidebar.startResize}
              onKeyDown={rightSidebar.handleKeyDown}
              role="separator"
              aria-orientation="vertical"
              tabIndex={0}
              aria-label="Resize right sidebar"
            />
          </aside>
        )}
      </div>
    </LayoutContext.Provider>
  );
}
