import "./styles/App.css";
import ScrollManager from "./components/ScrollManager";
import { Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import MarkdownPage from "./pages/MarkdownPage";
import Home from "./pages/Home";
import Acknowledgments from "./pages/Acknowledgments";
import SearchResultsPage from "./pages/SearchResultsPage";
import SidebarLayout from "./layouts/SidebarLayout";
import About from "./pages/About";

function AppRoutes() {
  const location = useLocation();
  const isSearchPage = location.pathname.startsWith("/search");
  const isAcknowledgmentsPage =
    location.pathname.startsWith("/acknowledgments");
  const isAboutPage = location.pathname.startsWith("/about");
  const isHomePage = location.pathname === "/" | location.pathname === "/srch";
  const isMarkdownPage =
    !isHomePage && !isSearchPage && !isAcknowledgmentsPage && !isAboutPage;

  return (
    <>
      <ScrollManager />

      {isMarkdownPage ? (
        <SidebarLayout>
          <Routes>
            <Route path="/:sectionId" element={<MarkdownPage />} />
            <Route
              path="/:sectionId/:subsectionId"
              element={<MarkdownPage />}
            />
            <Route
              path="/:sectionId/:subsectionId/:term"
              element={<MarkdownPage />}
            />
          </Routes>
        </SidebarLayout>
      ) : (
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/srch" element={<Home />} />
            <Route path="/acknowledgments" element={<Acknowledgments />} />
            <Route path="/about" element={<About />} />
            <Route path="/search/:query/:page" element={<SearchResultsPage />} />
            <Route path="/search/:query" element={<SearchResultsPage />} />
            <Route path="/search" element={<SearchResultsPage />} />
          </Routes>
          <Footer />
        </>
      )}
      <NavBar layoutMode="overlay" />
    </>
  );
}

export default AppRoutes;
