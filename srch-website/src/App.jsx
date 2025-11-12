// src/App.jsx
import "./App.css";

import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
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
    <ChakraProvider theme={theme}>
      <AppRoutes />
    </ChakraProvider>
  );
}

export default App;
