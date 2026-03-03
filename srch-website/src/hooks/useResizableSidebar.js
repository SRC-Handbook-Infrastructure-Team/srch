import { useEffect, useRef, useState, useCallback } from "react";

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
const isBrowser = () =>
  typeof window !== "undefined" && typeof document !== "undefined";

export default function useResizableSidebar({
  storageKey = "sidebarWidth",
  collapsedWidth = 0,
  side = "left",
  collapsed,
  setCollapsed,
  saveOnEnd = true,
  cssVarName,
  onStartResize = () => {},
  onStopResize = () => {},
  getDynamicBounds,
} = {}) {
  const defaultWidth = 300;
  const minWidth = 225;
  const [maxWidth, setMaxWidthState] = useState(calculateMax());
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
  function calculateMax() {
    if (window.innerWidth > 1000) {
      return 400;
    } else {
      return 200;
    }
  }

  const ref = useRef({
    startX: 0,
    startWidth: defaultWidth,
    previousWidth: null,
  });
  const rafRef = useRef(null);
  const pendingWidth = useRef(width);

  useEffect(() => {
    if (width > maxWidth) {
      setWidthState(maxWidth);
    }
  }, [maxWidth, width]);

  useEffect(() => {
    const handleResize = () => {
      setMaxWidthState(calculateMax());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const setWidth = useCallback(
    (w) => setWidthState(() => clamp(Math.round(w), minWidth, maxWidth)),
    [minWidth, maxWidth],
  );

  const startResize = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsResizing(true);

      if (typeof onStartResize === "function") onStartResize();

      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      ref.current.startX = clientX;
      ref.current.startWidth = width;
      ref.current.edge = null;

      if (isBrowser()) {
        document.body.style.cursor = "ew-resize";
        document.body.style.userSelect = "none";
        const selector = side === "right" ? ".right-sidebar" : ".left-sidebar";
        const sidebarEl = document.querySelector(selector);
        if (sidebarEl) sidebarEl.classList.add("resizing");
      }
    },
    [width, side, onStartResize],
  );

  const stopResize = useCallback(() => {
    if (!isResizing) return;
    setIsResizing(false);

    if (isBrowser()) {
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      const selector = side === "right" ? ".right-sidebar" : ".left-sidebar";
      const sidebarEl = document.querySelector(selector);
      if (sidebarEl) sidebarEl.classList.remove("resizing");
    }

    cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    setWidth(pendingWidth.current);
    if (saveOnEnd && isBrowser()) {
      try {
        window.localStorage.setItem(storageKey, String(pendingWidth.current));
      } catch {}
    }
    if (typeof onStopResize === "function") onStopResize();
  }, [isResizing, saveOnEnd, setWidth, storageKey, side, onStopResize]);
  useEffect(() => {
    if (!isBrowser()) return;

    const onMove = (e) => {
      if (!isResizing) return;

      const clientX = e.touches ? e.touches[0].clientX : e.clientX;

      const delta = clientX - ref.current.startX;

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
      const clampedNext = clamp(rawNext, dynMin, dynMax);
      pendingWidth.current = clampedNext;
      setWidth(clampedNext);

      if (cssVarName) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
          document.documentElement.style.setProperty(
            cssVarName,
            `${pendingWidth.current}px`,
          );
        });
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
    [width, minWidth, maxWidth, side, setWidth, storageKey],
  );

  const toggleCollapsed = useCallback(() => {
    setCollapsed((prev) => {
      const next = !prev;

      if (typeof onStartResize === "function") onStartResize();

      if (next) {
        ref.current.previousWidth = width;

        setTimeout(() => setWidthState(collapsedWidth), 350);

        if (isBrowser()) {
          try {
            window.localStorage.setItem(`${storageKey}:collapsed`, "1");
          } catch {}
        }

        setTimeout(() => {
          if (typeof onStopResize === "function") onStopResize();
        }, 400);
      } else {
        const restore = ref.current.previousWidth || defaultWidth;
        setWidthState(clamp(restore, minWidth, maxWidth));

        if (isBrowser()) {
          try {
            window.localStorage.removeItem(`${storageKey}:collapsed`);
          } catch {}
        }

        setTimeout(() => {
          if (typeof onStopResize === "function") onStopResize();
        }, 400);
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
  const save = useCallback(() => {
    if (!isBrowser()) return;
    try {
      window.localStorage.setItem(storageKey, String(width));
    } catch {}
  }, [storageKey, width]);

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
    minWidth,
    maxWidth,
    collapsedWidth,
  };
}
