import { useEffect, useRef, useState, useCallback } from "react";

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
const isBrowser = () =>
  typeof window !== "undefined" && typeof document !== "undefined";

/**
 * useResizableSidebar
 * -------------------------------------------------------------------------
 * High-performance resizable sidebar hook.
 *
 * Improvements from Google-level perf standards:
 * - Lifecycle callbacks (onStartResize / onStopResize)
 * - Correct passive event handling for mouse vs touch
 * - Lower-latency state sync (80ms throttled)
 * - Zero layout reads during drag
 * - Guaranteed rAF batching of DOM writes
 * -------------------------------------------------------------------------
 */
export default function useResizableSidebar({
  storageKey = "sidebarWidth",
  defaultWidth = 250,
  minWidth = 180,
  maxWidth = 480,
  collapsedWidth = 0,
  side = "left",
  saveOnEnd = true,
  cssVarName,

  /** ✅ NEW optional callbacks */
  onStartResize,
  onStopResize,
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
      } catch {}
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

      /** ✅ fire callback */
      onStartResize && onStartResize();

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
    [width, side, onStartResize]
  );

  /** ---------------- DRAG MOVE ---------------- */
  useEffect(() => {
    if (!isBrowser()) return;

    const onMove = (e) => {
      if (!isResizing) return;

      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const delta = (clientX - ref.current.startX) * 1.5;

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

      /** ✅ faster React sync (80ms) */
      const now = performance.now();
      if (now - lastCommitTime.current > 80) {
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

      /** ✅ fire callback */
      onStopResize && onStopResize();

      /** ✅ final sync */
      const finalWidth = clamp(pendingWidth.current, minWidth, maxWidth);
      setWidth(finalWidth);
      if (saveOnEnd) commitToLocalStorage(finalWidth);
    };

    if (isResizing) {
      window.addEventListener("mousemove", onMove, { passive: true });
      window.addEventListener("mouseup", onUp);

      /** ✅ correctly non-passive touch handling */
      window.addEventListener("touchmove", onMove, { passive: false });
      window.addEventListener("touchend", onUp);
    }

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [
    isResizing,
    setWidth,
    side,
    minWidth,
    maxWidth,
    cssVarName,
    saveOnEnd,
    commitToLocalStorage,
    onStopResize,
  ]);

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

    document.documentElement.style.setProperty(
      cssVarName,
      `${collapsed ? collapsedWidth : width}px`
    );
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
