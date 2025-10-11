// src/layouts/LayoutContext.js
import { createContext, useContext } from "react";

/**
 * LayoutContext manages shared layout state across the app:
 * - leftSidebar: width, collapsed state, resizing handlers
 * - rightSidebar: width, resizing handlers
 * - right drawer content and visibility
 * - openRightDrawer(content): opens the right drawer with given content
 * - closeRightDrawer(): closes the right drawer
 */
export const LayoutContext = createContext({
  leftSidebar: null,
  rightSidebar: null,
  rightContent: null,
  isRightOpen: false,
  openRightDrawer: () => {},
  closeRightDrawer: () => {},
});

/**
 * Hook for easily accessing layout state anywhere in the app.
 * Example:
 *   const { openRightDrawer, closeRightDrawer } = useLayout();
 */
export const useLayout = () => useContext(LayoutContext);
