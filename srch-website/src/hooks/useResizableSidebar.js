import { useEffect, useRef, useState, useCallback } from "react";

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
const isBrowser = () =>
  typeof window !== "undefined" && typeof document !== "undefined";

/**
 * useResizableSidebar
 * -------------------------------------------------------------------------
 * Custom hook for creating a resizable sidebar with persistence, accessibility,
 * and performance optimizations using requestAnimationFrame + throttled updates.
 *
 * Enhancements:
 * - Offloads drag updates from React's render path.
 * - Uses CSS variables for width and GPU-friendly transitions.
 * - requestIdleCallback for localStorage writes.
 * - Adds "resizing" class for smoother pointer feedback and disables selection.
 * -------------------------------------------------------------------------
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
} = {}) {
  /** ---------------- INITIALIZATION ---------------- */
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
  const rafRef = useRef(null);
  const lastCommitTime = useRef(0);
  const pendingWidth = useRef(width);
  const transitionDisabled = useRef(false);

  /** ---------------- INTERNAL HELPERS ---------------- */
  const setWidth = useCallback(
    (w) => setWidthState(() => clamp(Math.round(w), minWidth, maxWidth)),
    [minWidth, maxWidth]
  );

  const commitToLocalStorage = useCallback(
    (value) => {
      if (!isBrowser()) return;
      try {
        const fn =
          typeof window.requestIdleCallback === "function"
            ? window.requestIdleCallback
            : (cb) => setTimeout(cb, 150);
        fn(() => {
          window.localStorage.setItem(storageKey, String(value));
        });
      } catch {
        /* ignore */
      }
    },
    [storageKey]
  );

  /** ---------------- DRAG START ---------------- */
  const startResize = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsResizing(true);
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      ref.current.startX = clientX;
      ref.current.startWidth = width;

      if (isBrowser()) {
        document.body.style.cursor = "ew-resize";
        document.body.style.userSelect = "none";

        const selector = side === "right" ? ".right-sidebar" : ".left-sidebar";
        const el = document.querySelector(selector);
        if (el) {
          el.classList.add("resizing");
          if (!transitionDisabled.current) {
            el.style.transition = "none";
            transitionDisabled.current = true;
          }
        }
      }
    },
    [width, side]
  );

  /** ---------------- DRAG MOVE ---------------- */
  useEffect(() => {
    if (!isBrowser()) return;
    const onMove = (e) => {
      if (!isResizing) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;

      const sensitivity = 1.5;
      const delta = (clientX - ref.current.startX) * sensitivity;

      const rawNext =
        side === "left"
          ? ref.current.startWidth + delta
          : ref.current.startWidth - delta;

      const clampedNext = clamp(rawNext, minWidth, maxWidth);
      pendingWidth.current = clampedNext;

      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        document.documentElement.style.setProperty(
          cssVarName,
          `${pendingWidth.current}px`
        );
      });

      const now = Date.now();
      if (now - lastCommitTime.current > 120) {
        setWidth(pendingWidth.current);
        lastCommitTime.current = now;
      }
    };

    const onUp = () => {
      if (!isResizing) return;
      setIsResizing(false);

      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;

      if (isBrowser()) {
        document.body.style.cursor = "";
        document.body.style.userSelect = "";

        const selector = side === "right" ? ".right-sidebar" : ".left-sidebar";
        const el = document.querySelector(selector);
        if (el) {
          el.classList.remove("resizing");
          if (transitionDisabled.current) {
            el.style.transition = "";
            transitionDisabled.current = false;
          }
        }
      }

      // Final React + localStorage sync
      const finalWidth = clamp(pendingWidth.current, minWidth, maxWidth);
      setWidth(finalWidth);
      if (saveOnEnd) commitToLocalStorage(finalWidth);
    };

    if (isResizing) {
      window.addEventListener("mousemove", onMove, { passive: true });
      window.addEventListener("mouseup", onUp);
      window.addEventListener("touchmove", onMove, { passive: false });
      window.addEventListener("touchend", onUp);
    }

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [isResizing, setWidth, side, minWidth, maxWidth, cssVarName, saveOnEnd, commitToLocalStorage]);

  /** ---------------- KEYBOARD RESIZE ---------------- */
  const handleKeyDown = useCallback(
    (e) => {
      const step = e.shiftKey ? 20 : 8;
      let delta = 0;
      if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") {
        delta = side === "left" ? -step : step;
      } else if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") {
        delta = side === "left" ? step : -step;
      } else if (e.key === "Home") {
        setWidth(minWidth);
        e.preventDefault();
        return;
      } else if (e.key === "End") {
        setWidth(maxWidth);
        e.preventDefault();
        return;
      }

      if (delta !== 0) {
        e.preventDefault();
        const newWidth = clamp(width + delta, minWidth, maxWidth);
        setWidth(newWidth);
        commitToLocalStorage(newWidth);
      }
    },
    [width, minWidth, maxWidth, side, setWidth, commitToLocalStorage]
  );

  /** ---------------- COLLAPSE TOGGLE ---------------- */
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

  /** ---------------- SYNC TO CSS VAR ---------------- */
  useEffect(() => {
    if (!isBrowser() || !cssVarName) return;
    const value = `${collapsed ? collapsedWidth : width}px`;
    document.documentElement.style.setProperty(cssVarName, value);
  }, [cssVarName, width, collapsed, collapsedWidth]);

  /** ---------------- PUBLIC API ---------------- */
  return {
    width,
    setWidth,
    isResizing,
    startResize,
    handleKeyDown,
    collapsed,
    toggleCollapsed,
    minWidth,
    maxWidth,
    collapsedWidth,
  };
}
