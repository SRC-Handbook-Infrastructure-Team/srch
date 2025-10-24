// src/components/SidebarToggleButton.jsx
import { useLayout } from "../layouts/LayoutContext";

export default function SidebarToggleButton() {
  const { leftSidebar } = useLayout() || {};
  const collapsed = !!leftSidebar?.collapsed;

  const handleClick = () => {
    leftSidebar?.toggleCollapsed?.();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      leftSidebar?.toggleCollapsed?.();
    }
  };

  return (
    <button
      className="floating-hamburger-btn"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-pressed={collapsed}
      aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      title={collapsed ? "Expand" : "Collapse"}
      type="button"
    >
      {/* Simple hamburger glyph; can swap for an icon later */}
      ☰
    </button>
  );
}
