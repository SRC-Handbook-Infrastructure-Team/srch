import "./styles/App.css";
import ScrollManager from "./components/ScrollManager";
import { Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import MarkdownPage from "./pages/MarkdownPage";
import Home from "./pages/Home";
import Acknowledgments from "./pages/Acknowledgments";
import { SearchResults } from "./pages/SearchResults";
import SidebarLayout from "./layouts/SidebarLayout";
import About from "./pages/About";

function AppRoutes() {
  const location = useLocation();
  const isSearchPage = location.pathname.startsWith("/search");
  const isAcknowledgmentsPage =
    location.pathname.startsWith("/acknowledgments");
  const isAboutPage = location.pathname.startsWith("/about");
  const isHomePage = location.pathname === "/";
  const isMarkdownPage =
    !isHomePage && !isSearchPage && !isAcknowledgmentsPage && !isAboutPage;

  return (
    <>
      <ScrollManager />

      {isMarkdownPage ? (
        // 🔹 Markdown / handbook routes:
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
        // 🔹 Non-markdown routes: render a single NavBar here
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/acknowledgments" element={<Acknowledgments />} />
            <Route path="/about" element={<About />} />
            <Route path="/search/:query/:page" element={<SearchResults />} />
            <Route path="/search/:query" element={<SearchResults />} />
            <Route path="/search" element={<SearchResults />} />
          </Routes>
          <Footer />
        </>
      )}
      <NavBar layoutMode="overlay" />
    </>
  );
}

export default AppRoutes;
