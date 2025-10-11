// src/hooks/useResizableSidebar.js
import { useEffect, useRef, useState, useCallback } from "react";

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
const isBrowser = () =>
  typeof window !== "undefined" && typeof document !== "undefined";

export default function useResizableSidebar({
  storageKey = "sidebarWidth",
  defaultWidth = 250,
  minWidth = 180,
  maxWidth = 480,
  collapsedWidth = 0,
  side = "left", // 'left' | 'right'
  saveOnEnd = true,
  cssVarName, // optional: e.g., "--left-sidebar-width" or "--right-sidebar-width"
} = {}) {
  // --- Initialize width from localStorage or default ---
  const initial = () => {
    if (!isBrowser()) return defaultWidth;
    try {
      const saved = window.localStorage.getItem(storageKey);
      return saved ? parseInt(saved, 10) : defaultWidth;
    } catch {
      return defaultWidth;
    }
  };

  const [width, setWidthState] = useState(initial);
  const [isResizing, setIsResizing] = useState(false);
  const [collapsed, setCollapsed] = useState(() => {
    if (!isBrowser()) return false;
    try {
      return window.localStorage.getItem(`${storageKey}:collapsed`) === "1";
    } catch {
      return false;
    }
  });

  const ref = useRef({ startX: 0, startWidth: defaultWidth, previousWidth: null });

  const setWidth = useCallback(
    (w) => setWidthState(() => clamp(Math.round(w), minWidth, maxWidth)),
    [minWidth, maxWidth]
  );

  // --- Mouse/Touch resizing logic ---
  const startResize = useCallback(
    (e) => {
      e.preventDefault();
      setIsResizing(true);
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      ref.current.startX = clientX;
      ref.current.startWidth = width;
      if (isBrowser()) document.body.style.cursor = "ew-resize";
    },
    [width]
  );

  const stopResize = useCallback(() => {
    if (!isResizing) return;
    setIsResizing(false);
    if (isBrowser()) document.body.style.cursor = "";
    if (saveOnEnd && isBrowser()) {
      try {
        window.localStorage.setItem(storageKey, String(width));
      } catch {}
    }
  }, [isResizing, width, saveOnEnd, storageKey]);

  useEffect(() => {
    if (!isBrowser()) return;

    const onMove = (e) => {
      if (!isResizing) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const delta = clientX - ref.current.startX;
      const next =
        side === "left"
          ? ref.current.startWidth + delta
          : ref.current.startWidth - delta;
      setWidth(next);
    };
    const onUp = () => stopResize();

    if (isResizing) {
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
      window.addEventListener("touchmove", onMove, { passive: false });
      window.addEventListener("touchend", onUp);
    }

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
      if (isBrowser()) document.body.style.cursor = "";
    };
  }, [isResizing, setWidth, side, stopResize]);

  // --- Keyboard a11y (supports both Arrow keys and WASD) ---
  const handleKeyDown = useCallback(
    (e) => {
      const step = 8;

      // Move left (A or ArrowLeft)
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        e.preventDefault();
        const delta = side === "left" ? -step : step;
        setWidth(width + delta);
      }
      // Move right (D or ArrowRight)
      else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        e.preventDefault();
        const delta = side === "left" ? step : -step;
        setWidth(width + delta);
      }
    },
    [width, setWidth, side]
  );

  // --- Collapse toggle ---
  const toggleCollapsed = useCallback(() => {
    setCollapsed((prev) => {
      const next = !prev;
      if (next) {
        ref.current.previousWidth = width;
        setWidthState(collapsedWidth);
        if (isBrowser()) {
          try {
            window.localStorage.setItem(`${storageKey}:collapsed`, "1");
          } catch {}
        }
      } else {
        const restore = ref.current.previousWidth || defaultWidth;
        setWidthState(clamp(restore, minWidth, maxWidth));
        if (isBrowser()) {
          try {
            window.localStorage.removeItem(`${storageKey}:collapsed`);
          } catch {}
        }
      }
      return next;
    });
  }, [collapsedWidth, width, minWidth, maxWidth, defaultWidth, storageKey]);

  const save = useCallback(() => {
    if (!isBrowser()) return;
    try {
      window.localStorage.setItem(storageKey, String(width));
    } catch {}
  }, [storageKey, width]);

  // --- Optional: Sync CSS variable for layout ---
  useEffect(() => {
    if (!isBrowser() || !cssVarName) return;
    const value = `${collapsed ? collapsedWidth : width}px`;
    document.documentElement.style.setProperty(cssVarName, value);
  }, [cssVarName, width, collapsed, collapsedWidth]);

  return {
    width,
    setWidth,
    isResizing,
    startResize,
    stopResize,
    handleKeyDown,
    collapsed,
    toggleCollapsed,
    save,
  };
}
