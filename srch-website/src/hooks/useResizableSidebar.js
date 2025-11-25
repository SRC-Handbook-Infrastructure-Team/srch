import { useEffect, useRef, useState, useCallback } from "react";

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
const isBrowser = () =>
  typeof window !== "undefined" && typeof document !== "undefined";

/**
 * Custom hook for creating a resizable sidebar with persistence, accessibility,
 * and performance optimizations using requestAnimationFrame + throttled updates.
 */
export default function useResizableSidebar({
  storageKey = "sidebarWidth",
  defaultWidth = 250,
  minWidth = 180,
  maxWidth = 480,
  collapsedWidth = 0,
  side = "left", // 'left' | 'right'
  saveOnEnd = true,
  cssVarName,
  onStartResize = () => {},
  onStopResize = () => {},
  getDynamicBounds,
} = {}) {
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

  const ref = useRef({
    startX: 0,
    startWidth: defaultWidth,
    previousWidth: null,
  });
  const rafRef = useRef(null);
  const lastCommitTime = useRef(0);
  const pendingWidth = useRef(width);

  /** Safely clamps and updates width state */
  const setWidth = useCallback(
    (w) => setWidthState(() => clamp(Math.round(w), minWidth, maxWidth)),
    [minWidth, maxWidth]
  );

  /** Handles start of drag resize */
  const startResize = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsResizing(true);

      // Freeze main content immediately (layout supplies this)
      if (typeof onStartResize === "function") onStartResize();

      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      ref.current.startX = clientX;
      ref.current.startWidth = width;
      ref.current.edge = null; // reserved for future use

      if (isBrowser()) {
        document.body.style.cursor = "ew-resize";
        document.body.style.userSelect = "none";
        // Add performance class to the *correct* sidebar while dragging
        const selector = side === "right" ? ".right-sidebar" : ".left-sidebar";
        const sidebarEl = document.querySelector(selector);
        if (sidebarEl) sidebarEl.classList.add("resizing");
      }
    },
    [width, side, onStartResize]
  );

  /** Stops resizing and commits final width */
  const stopResize = useCallback(() => {
    if (!isResizing) return;
    setIsResizing(false);

    if (isBrowser()) {
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      // Remove performance class when drag ends
      const selector = side === "right" ? ".right-sidebar" : ".left-sidebar";
      const sidebarEl = document.querySelector(selector);
      if (sidebarEl) sidebarEl.classList.remove("resizing");
    }

    cancelAnimationFrame(rafRef.current);
    rafRef.current = null;

    // Final React + localStorage sync
    setWidth(pendingWidth.current);
    if (saveOnEnd && isBrowser()) {
      try {
        window.localStorage.setItem(storageKey, String(pendingWidth.current));
      } catch {}
    }

    // Release main content after resize finishes
    if (typeof onStopResize === "function") onStopResize();
  }, [isResizing, saveOnEnd, setWidth, storageKey, side, onStopResize]);

  /** Handles mouse and touch drag events efficiently */
  useEffect(() => {
    if (!isBrowser()) return;

    const onMove = (e) => {
      if (!isResizing) return;

      const clientX = e.touches ? e.touches[0].clientX : e.clientX;

      const delta = clientX - ref.current.startX; // 1:1 precise drag

      const rawNext =
        side === "left"
          ? ref.current.startWidth + delta
          : ref.current.startWidth - delta;

      let dynMin = minWidth,
        dynMax = maxWidth;
      if (typeof getDynamicBounds === "function") {
        const b = getDynamicBounds();
        if (b && Number.isFinite(b.min)) dynMin = b.min;
        if (b && Number.isFinite(b.max)) dynMax = b.max;
      }

      // Clamp ASAP
      const clampedNext = clamp(rawNext, dynMin, dynMax);
      const atMin = clampedNext === dynMin;
      const atMax = clampedNext === dynMax;

      // Edge-lock - if we're pinned and still pushing into the edge, don't update
      if (ref.current.edge === "min" && atMin && rawNext <= dynMin) return;
      if (ref.current.edge === "max" && atMax && rawNext >= dynMax) return;

      // Update edge state
      ref.current.edge = atMin ? "min" : atMax ? "max" : null;

      pendingWidth.current = clampedNext;

      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (cssVarName) {
          document.documentElement.style.setProperty(
            cssVarName,
            `${pendingWidth.current}px`
          );
        }
      });

      // Throttle React updates for performance
      const now = Date.now();
      if (now - lastCommitTime.current > 120) {
        setWidth(pendingWidth.current);
        lastCommitTime.current = now;
      }
    };

    const onUp = () => stopResize();

    if (isResizing) {
      window.addEventListener("mousemove", onMove, { passive: false });
      window.addEventListener("mouseup", onUp, { passive: true });
      window.addEventListener("touchmove", onMove, { passive: false });
      window.addEventListener("touchend", onUp);
    }

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
      cancelAnimationFrame(rafRef.current);
      if (isBrowser()) {
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
      }
    };
  }, [isResizing, setWidth, side, minWidth, maxWidth, cssVarName, stopResize]);

  /** Handles keyboard-based resizing (arrow keys + A/D) */
  const handleKeyDown = useCallback(
    (e) => {
      const step = e.shiftKey ? 20 : 8;
      let delta = 0;

      const key = (e.key || "").toLowerCase();

      if (key === "arrowleft" || key === "a") {
        delta = side === "left" ? -step : step;
      } else if (key === "arrowright" || key === "d") {
        delta = side === "left" ? step : -step;
      } else if (key === "home") {
        setWidth(minWidth);
        e.preventDefault();
        return;
      } else if (key === "end") {
        setWidth(maxWidth);
        e.preventDefault();
        return;
      }

      if (delta !== 0) {
        e.preventDefault();
        const newWidth = clamp(width + delta, minWidth, maxWidth);
        setWidth(newWidth);
        try {
          window.localStorage.setItem(storageKey, String(newWidth));
        } catch {}
      }
    },
    [width, minWidth, maxWidth, side, setWidth, storageKey]
  );

  /** Toggles collapsed state */
  const toggleCollapsed = useCallback(() => {
    setCollapsed((prev) => {
      const next = !prev;

      // Freeze main content immediately (SidebarLayout handles this class)
      if (typeof onStartResize === "function") onStartResize();

      if (next) {
        // Collapsing: remember previous width and set to collapsedWidth
        ref.current.previousWidth = width;
        // Instead of forcing width=0 immediately, let the CSS transition handle it

        setTimeout(() => setWidthState(collapsedWidth), 350);

        if (isBrowser()) {
          try {
            window.localStorage.setItem(`${storageKey}:collapsed`, "1");
          } catch {}
        }

        // Allow CSS transition to complete before releasing
        setTimeout(() => {
          if (typeof onStopResize === "function") onStopResize();
        }, 400); // Match CSS transition duration
      } else {
        // Expanding: restore previous or default width (clamped)
        const restore = ref.current.previousWidth || defaultWidth;
        setWidthState(clamp(restore, minWidth, maxWidth));

        if (isBrowser()) {
          try {
            window.localStorage.removeItem(`${storageKey}:collapsed`);
          } catch {}
        }

        setTimeout(() => {
          if (typeof onStopResize === "function") onStopResize();
        }, 400); // Match CSS transition duration
      }

      return next;
    });
  }, [
    width,
    collapsedWidth,
    minWidth,
    maxWidth,
    defaultWidth,
    storageKey,
    onStartResize,
    onStopResize,
  ]);

  /** Persists current width to localStorage */
  const save = useCallback(() => {
    if (!isBrowser()) return;
    try {
      window.localStorage.setItem(storageKey, String(width));
    } catch {}
  }, [storageKey, width]);

  /** Syncs sidebar width to CSS custom property */
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
    // expose bounds so consumers (SidebarLayout, ARIA) can read them
    minWidth,
    maxWidth,
    collapsedWidth,
  };
}
