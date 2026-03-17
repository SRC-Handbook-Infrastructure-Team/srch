// src/App.jsx
import "./styles/App.css";

import { Provider } from "./components/ui/provider"
import { useEffect } from "react";
import AppRoutes from "./AppRoutes";

/**
 * Main App Component
 * --------------------------------------------------------------
 * Uses a persistent SidebarLayout so the NavBar + SearchBar
 * remain active on every route (including /search pages).
 */
function App() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);
  return (
    <Provider>
      <AppRoutes />
    </Provider>
  );
}

export default App;
