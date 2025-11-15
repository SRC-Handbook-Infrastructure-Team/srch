// src/components/SidebarToggleButton.jsx
import { useLayout } from "../layouts/LayoutContext";

/**
 * SidebarToggleButton
 * -----------------------------------------------------------------------------
 * A simple, globally positioned button that toggles the visibility
 * (collapse / expand) of the left ContentsSidebar.
 * -----------------------------------------------------------------------------
 */
export default function SidebarToggleButton() {
  const { leftSidebar } = useLayout() || {};
  const collapsed = !!leftSidebar?.collapsed;

  const handleClick = () => {
    // Use the stable helper provided by SidebarLayout's enhanced context
    leftSidebar?.toggle?.();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      leftSidebar?.toggle?.();
    }
  };

  return (
    <button
      className="sidebar-toggle-inner-btn"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-pressed={collapsed}
      aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      title={collapsed ? "Expand" : "Collapse"}
      type="button"
      style={{
        background: "none",
        border: "none",
        fontSize: "22px",
        cursor: "pointer",
        color: "var(--text-primary, #531c00)",
      }}
    >
      {/* Simple hamburger glyph; can swap for an icon later */}
      ☰
    </button>
  );
}
