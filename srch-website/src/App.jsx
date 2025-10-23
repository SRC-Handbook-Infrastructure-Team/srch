// src/App.jsx
import "./App.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import SidebarLayout from "./layouts/SidebarLayout";
import ContentsSidebar from "./components/ContentsSidebar";
import MarkdownPage from "./pages/MarkdownPage";
import Home from "./pages/Home";
import { Team, AdditionalContributors } from "./pages/Acknowledgements";
import { SearchResults } from "./pages/SearchResults";
import theme from "./theme";

// === Custom Theme Override (Typography + Link Color) ===
const customTheme = extendTheme({
  ...theme,
  fonts: {
    heading: `"Be Vietnam Pro", sans-serif`,
    body: `"Be Vietnam Pro", sans-serif`,
  },
  styles: {
    global: {
      body: {
        bg: "#ffffff",
        color: "#1a1a1a",
        lineHeight: "1.75",
      },
      a: {
        color: "#7b4b24",
        _hover: {
          color: "#6b3f1f",
          textDecoration: "underline",
        },
      },
    },
  },
});

/**
 * Main App Component
 * --------------------------------------------------------------
 * Uses a persistent SidebarLayout so the NavBar + SearchBar
 * remain active on every route (including /search pages).
 */
function App() {
  return (
    <ChakraProvider theme={customTheme}>
      {/* Always render SidebarLayout (don't conditionally remove it) */}
      <SidebarLayout>
        {/* ContentsSidebar remains available for consistent layout */}
        <ContentsSidebar />

        <Routes>
          {/* Home + Markdown Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/:sectionId" element={<MarkdownPage />} />
          <Route path="/:sectionId/:subsectionId" element={<MarkdownPage />} />
          <Route
            path="/:sectionId/:subsectionId/:term"
            element={<MarkdownPage />}
          />

          {/* Acknowledgements Pages */}
          <Route
            path="/acknowledgements"
            element={<Team teamName="leadership" />}
          />
          <Route
            path="/acknowledgements/leadership"
            element={<Team teamName="leadership" />}
          />
          <Route path="/acknowledgements/ai" element={<Team teamName="ai" />} />
          <Route
            path="/acknowledgements/privacy"
            element={<Team teamName="privacy" />}
          />
          <Route
            path="/acknowledgements/accessibility"
            element={<Team teamName="accessibility" />}
          />
          <Route
            path="/acknowledgements/product"
            element={<Team teamName="product" />}
          />
          <Route
            path="/acknowledgements/additional"
            element={<AdditionalContributors />}
          />

          {/*  Search Results now share the same layout */}
          <Route path="/search" element={<SearchResults />} />
          <Route path="/search/:query" element={<SearchResults />} />
        </Routes>
      </SidebarLayout>
    </ChakraProvider>
  );
}

export default App;
