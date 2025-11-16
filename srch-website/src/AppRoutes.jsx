import "./App.css";

import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ContentsSidebar from "./components/ContentsSidebar";
import MarkdownPage from "./pages/MarkdownPage";
import Home from "./pages/Home";
import Acknowledgements from "./pages/Acknowledgements";
import { SearchResults } from "./pages/SearchResults";
import SidebarLayout from "./layouts/SidebarLayout";
import About from "./pages/About";

function AppRoutes() {
  const location = useLocation();
  const isSearchPage = location.pathname.startsWith("/search");
  const isAcknowledgementsPage =
    location.pathname.startsWith("/acknowledgements");
  const isAboutPage = location.pathname.startsWith("/about");
  const isHomePage = location.pathname === "/";
  const isMarkdownPage =
    !isHomePage && !isSearchPage && !isAcknowledgementsPage && !isAboutPage;

  // Scroll to top or hash element on location change
  useEffect(() => {
    const timer = setTimeout(() => {
      if (location.hash) {
        const id = location.hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo(0, 0);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
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
          {!isSearchPage &&
            !isHomePage &&
            !isAcknowledgementsPage &&
            !isAboutPage && <ContentsSidebar />}

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/acknowledgements" element={<Acknowledgements />} />
            <Route path="/about" element={<About />} />
            <Route path="/search/:query" element={<SearchResults />} />
            <Route path="/search" element={<SearchResults />} />
          </Routes>
        </>
      )}
      <NavBar />
      <Footer />
    </>
  );
}

export default AppRoutes;
