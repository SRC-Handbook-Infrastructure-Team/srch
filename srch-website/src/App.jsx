// src/App.jsx
import "./App.css";

import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import theme from "./theme";
import AppRoutes from "./AppRoutes"

/**
 * Main App Component
 * --------------------------------------------------------------
 * Uses a persistent SidebarLayout so the NavBar + SearchBar
 * remain active on every route (including /search pages).
 */
function App() {
  return (
    <ChakraProvider theme={theme}>
      <AppRoutes />
    </ChakraProvider>
  );
}

export default App;
