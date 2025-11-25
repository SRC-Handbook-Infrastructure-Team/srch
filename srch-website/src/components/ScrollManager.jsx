// src/components/ScrollManager.jsx
import { useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const SCROLL_STORAGE_PREFIX = "scrollY:";

// Helper function to get page key (ignores drawer term param)
function getScrollKey(pathname = "") {
  const parts = pathname.split("/").filter(Boolean);
  // Only consider first two parts: sectionId/subsectionId
  return `/${parts[0] || ""}/${parts[1] || ""}`;
}

// Save scroll position for a key
export function saveScrollPosition(pathname) {
  const key = SCROLL_STORAGE_PREFIX + getScrollKey(pathname);
  try {
    sessionStorage.setItem(key, window.scrollY.toString());
  } catch {
    // fail silently in non-browser envs or private modes
  }
}

// Get saved scroll position for a key
function getSavedScroll(positionKey) {
  try {
    const val = sessionStorage.getItem(positionKey);
    return val !== null ? parseInt(val, 10) : undefined;
  } catch {
    // fail silently
    return undefined;
  }
}

export default function ScrollManager() {
  const location = useLocation();
  const prevKeyRef = useRef(getScrollKey(location.pathname));

  useLayoutEffect(() => {
    const currentKey = getScrollKey(location.pathname);

    if (prevKeyRef.current !== currentKey) {
      // Scroll only if page key changed (not drawer term)
      const savedPos = getSavedScroll(SCROLL_STORAGE_PREFIX + currentKey);
      if (savedPos !== undefined) {
        window.scrollTo(0, savedPos);
        // Optionally, clear saved scroll so it doesn't reapply later
        sessionStorage.removeItem(SCROLL_STORAGE_PREFIX + currentKey);
      } else {
        window.scrollTo(0, 0);
      }
      prevKeyRef.current = currentKey;
    }
    // Ignore drawer term changes to prevent jump
  }, [location.pathname]);

  return null;
}
