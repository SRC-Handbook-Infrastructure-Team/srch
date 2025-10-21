import "./App.css";

import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import theme from "./theme";
import NavBar from "./components/NavBar";
import ContentsSidebar from "./components/ContentsSideBar";
import MarkdownPage from "./pages/MarkdownPage";
import Home from "./pages/Home";
import { Team, AdditionalContributors } from "./pages/Acknowledgements";
import { SearchResults } from "./pages/SearchResults";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const isSearchPage = location.pathname.startsWith("/search");
  return (
    <ChakraProvider theme={theme}>
      {!isSearchPage && <ContentsSidebar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:sectionId" element={<MarkdownPage />} />
        <Route path="/:sectionId/:subsectionId" element={<MarkdownPage />} />
        <Route
          path="/:sectionId/:subsectionId/:term"
          element={<MarkdownPage />}
        />
        {/* Acknowledgements paths */}
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
        <Route path="/search/:query" element={<SearchResults />} />
        <Route path="/search" element={<SearchResults />} />
      </Routes>
      <NavBar />
    </ChakraProvider>
  );
}

export default App;
