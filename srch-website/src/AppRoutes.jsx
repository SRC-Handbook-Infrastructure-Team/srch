import "./styles/App.css";
import ScrollManager from "./components/ScrollManager";
import { Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
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
            <Route path="/acknowledgements" element={<Acknowledgements />} />
            <Route path="/about" element={<About />} />
            <Route path="/search/:query/:page" element={<SearchResults />} />
            <Route path="/search/:query" element={<SearchResults />} />
            <Route path="/search" element={<SearchResults />} />
          </Routes>
        </>
      )}
      <NavBar />
      {!isMarkdownPage && <Footer />}
    </>
  );
}

export default AppRoutes;
