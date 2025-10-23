import { ChakraProvider } from "@chakra-ui/react";
import { Routes, Route, useLocation } from "react-router-dom";
import theme from "./theme";
import Home from "./pages/Home";
import MarkdownPage from "./pages/MarkdownPage";
import SidebarLayout from "./layouts/SidebarLayout";

/**
 * Main App component
 * Note: The BrowserRouter wrapper should live in main.jsx,
 * so we only use Routes and Route here.
 */
function App() {
  const location = useLocation();
  const isSearchPage = location.pathname.startsWith("/search");

  return (
    <ChakraProvider theme={theme}>
      {!isSearchPage ? (
        <SidebarLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:sectionId" element={<MarkdownPage />} />
            <Route path="/:sectionId/:subsectionId" element={<MarkdownPage />} />
            <Route path="/:sectionId/:subsectionId/:term" element={<MarkdownPage />} />
          </Routes>
        </SidebarLayout>
      ) : (
        <Routes>
          <Route path="/search" element={<Home />} />
        </Routes>
      )}
    </ChakraProvider>
  );
}

export default App;
