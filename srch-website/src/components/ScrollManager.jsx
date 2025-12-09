import { useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const SCROLL_STORAGE_PREFIX = "scrollY:";

function getScrollKey(pathname = "") {
  const parts = pathname.split("/").filter(Boolean);
  return `/${parts[0] || ""}/${parts[1] || ""}`;
}

export function saveScrollPosition(pathname) {
  const key = SCROLL_STORAGE_PREFIX + getScrollKey(pathname);
  try {
    sessionStorage.setItem(key, window.scrollY.toString());
  } catch {}
}

function getSavedScroll(positionKey) {
  try {
    const val = sessionStorage.getItem(positionKey);
    return val !== null ? parseInt(val, 10) : undefined;
  } catch {
    return undefined;
  }
}

export default function ScrollManager() {
  const location = useLocation();
  const prevKeyRef = useRef(getScrollKey(location.pathname));

  useLayoutEffect(() => {
    const currentKey = getScrollKey(location.pathname);

    if (prevKeyRef.current !== currentKey) {
      const savedPos = getSavedScroll(SCROLL_STORAGE_PREFIX + currentKey);
      if (savedPos !== undefined) {
        window.scrollTo(0, savedPos);
        sessionStorage.removeItem(SCROLL_STORAGE_PREFIX + currentKey);
      } else {
        window.scrollTo(0, 0);
      }
      prevKeyRef.current = currentKey;
    }
  }, [location.pathname]);

  return null;
}
