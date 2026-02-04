import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * Consistent base path calculation - matches SidebarLayout and ScrollManager
 * Returns "/section/subsection" or "/section" (never trailing slash)
 */
function getBasePath(pathname = "") {
  const parts = pathname.split("/").filter(Boolean);
  const section = parts[0] || "";
  const subsection = parts[1] || "";
  return subsection ? `/${section}/${subsection}` : (section ? `/${section}` : "/");
}

/**
 * useDrawerScrollWatcher
 *
 * PURPOSE: When a user navigates DIRECTLY to a URL with a :term segment
 * (e.g., via bookmark, shared link, or browser back/forward), ensure the
 * corresponding chip is visible in the viewport.
 *
 * IMPORTANT: This should NOT scroll when the user clicks a chip on the current page,
 * because the chip is already visible (they just clicked it!).
 *
 * Detection strategy:
 * - If the chip is already reasonably visible, don't scroll (user clicked it)
 * - If the chip is off-screen, scroll to it (direct URL navigation)
 */

export function useDrawerScrollWatcher({ urlTerm, isReady }) {
  const location = useLocation();
  
  const scrolledTermsRef = useRef(new Set());
  const lastBasePathRef = useRef(getBasePath(location.pathname));

  useEffect(() => {
    const currentBase = getBasePath(location.pathname);
    const prevBase = lastBasePathRef.current;
    
    if (currentBase !== prevBase) {
      scrolledTermsRef.current.clear();
      lastBasePathRef.current = currentBase;
    }
  }, [location.pathname]);

  useEffect(() => {
    if (!urlTerm || !isReady) return;

    const term = String(urlTerm).toLowerCase();
    
    // Skip scrolling if this is a user-initiated term change (chip click)
    if (location.state?.preserveScroll) {
      scrolledTermsRef.current.add(term);
      return;
    }
    
    if (scrolledTermsRef.current.has(term)) {
      return;
    }


    // Small delay to ensure DOM is settled after React render
    const timeoutId = setTimeout(() => {
      const mainEl = document.getElementById("main");
      const scrollContainer = mainEl || window;
      const searchRoot = mainEl || document;
      
      // Find the chip element
      const chip = searchRoot.querySelector(
        `.srch-drawer-link[data-term="${term}"]`
      );

      if (!chip) {
        if (process.env.NODE_ENV !== "production") {
          console.warn("[DrawerScrollWatcher] Chip not found for term:", term);
        }
        // Mark as handled even if not found, to prevent repeated attempts
        scrolledTermsRef.current.add(term);
        return;
      }

      // Calculate visibility
      const containerRect = scrollContainer === window
        ? { top: 0, bottom: window.innerHeight, height: window.innerHeight }
        : scrollContainer.getBoundingClientRect();

      const chipRect = chip.getBoundingClientRect();

      // Get navbar height from CSS variable
      const navbarHeight = parseInt(
        getComputedStyle(document.documentElement)
          .getPropertyValue('--navbar-height')
          .trim() || '70',
        10
      );

      // Define visible area (accounting for navbar and some padding)
      const visibleTop = containerRect.top + navbarHeight + 20;
      const visibleBottom = containerRect.bottom - 40;

      // Check if chip is reasonably visible (allow 50px tolerance)
      const isVisible = 
        chipRect.top >= visibleTop - 50 && 
        chipRect.bottom <= visibleBottom + 50;

      if (isVisible) {
        // Chip is already visible - user probably clicked it, don't scroll
        if (process.env.NODE_ENV !== "production") {
          console.log("[DrawerScrollWatcher] Chip visible, no scroll:", term);
        }
      } else {
        // Chip is not visible - this is likely direct URL navigation, scroll to it
        const currentScroll = scrollContainer === window
          ? window.scrollY
          : scrollContainer.scrollTop;

        // Calculate scroll position to center the chip
        const chipCenterRelativeToContainer = 
          (chipRect.top + chipRect.bottom) / 2 - containerRect.top;
        
        const targetScroll = 
          currentScroll + chipCenterRelativeToContainer - (containerRect.height / 2);

        // Clamp to valid scroll range
        const maxScroll = scrollContainer === window
          ? document.documentElement.scrollHeight - window.innerHeight
          : scrollContainer.scrollHeight - scrollContainer.clientHeight;
        
        const clampedScroll = Math.max(0, Math.min(targetScroll, maxScroll));

        // Perform scroll
        if (scrollContainer === window) {
          window.scrollTo({ top: clampedScroll, behavior: "instant" });
        } else {
          scrollContainer.scrollTop = clampedScroll;
        }

        if (process.env.NODE_ENV !== "production") {
          console.log("[DrawerScrollWatcher] Scrolled to chip:", {
            term,
            from: Math.round(currentScroll),
            to: Math.round(clampedScroll),
          });
        }
      }

      // Mark this term as handled
      scrolledTermsRef.current.add(term);
    }, 50);

    return () => clearTimeout(timeoutId);
  }, [urlTerm, isReady]);
}