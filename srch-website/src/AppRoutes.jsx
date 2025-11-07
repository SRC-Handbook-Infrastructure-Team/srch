import "./App.css";

import { Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import ContentsSidebar from "./components/ContentsSideBar";
import MarkdownPage from "./pages/MarkdownPage";
import Home from "./pages/Home";
import Acknowledgements from "./pages/Acknowledgements"; //  now ONE page
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


  //  Markdown layout logic
  const isMarkdownPage =
    !isHomePage && !isSearchPage && !isAcknowledgementsPage && !isAboutPage;

  return (
    <>
      {isMarkdownPage ? (
        <SidebarLayout>
          <Routes>
            <Route path="/:sectionId" element={<MarkdownPage />} />
            <Route path="/:sectionId/:subsectionId" element={<MarkdownPage />} />
            <Route
              path="/:sectionId/:subsectionId/:term"
              element={<MarkdownPage />}
            />
          </Routes>
        </SidebarLayout>
      ) : (
        <>
          {/*  Sidebar on every non-home, non-search, non-acknowledgements, non-about page */}
          {!isSearchPage && !isHomePage && !isAcknowledgementsPage && !isAboutPage && (
            <ContentsSidebar />
          )}

          <NavBar />

          <Routes>
            <Route path="/" element={<Home />} />

            {/*  ONE SINGLE ACKNOWLEDGEMENTS PAGE */}
            <Route path="/acknowledgements" element={<Acknowledgements />} />
            <Route path="/about" element={<About />} />

            {/*  Search */}
            <Route path="/search/:query" element={<SearchResults />} />
            <Route path="/search" element={<SearchResults />} />
          </Routes>

          <NavBar />
        </>
      )}
    </>
  );
}

export default AppRoutes;
