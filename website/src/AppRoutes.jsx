import "./styles/App.css";
import ScrollManager from "./components/ScrollManager";
import ScrollProgressBar from "./components/ScrollProgressBar";
import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { preloadNavigationData } from "./util/MarkdownRenderer";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const MarkdownPage = lazy(() => import("./pages/MarkdownPage"));
const Home = lazy(() => import("./pages/Home"));
const Acknowledgments = lazy(() => import("./pages/Acknowledgments"));
const SearchResultsPage = lazy(() => import("./pages/SearchResultsPage"));
const SidebarLayout = lazy(() => import("./layouts/SidebarLayout"));
const About = lazy(() => import("./pages/About"));

function AppRoutes() {
  const location = useLocation();
  const pathParts = location.pathname.split("/").filter(Boolean);
  const isSearchPage = location.pathname.startsWith("/search");
  const isAcknowledgmentsPage =
    location.pathname.startsWith("/acknowledgments");
  const isAboutPage = location.pathname.startsWith("/about");
  const isHomePage =
    location.pathname === "/" || location.pathname === "/srch/";
  const isLandingPage =
    !isHomePage &&
    !isSearchPage &&
    !isAcknowledgmentsPage &&
    !isAboutPage &&
    pathParts.length === 1;
  const isMarkdownPage =
    !isHomePage && !isSearchPage && !isAcknowledgmentsPage && !isAboutPage;

  useEffect(() => {
    preloadNavigationData().catch((error) => {
      console.error("Error preloading sidebar navigation:", error);
    });
  }, []);

  return (
    <>
      <ScrollManager />
      <NavBar layoutMode="overlay" />

      <Suspense fallback={null}>
        {isMarkdownPage ? (
          <>
            {!isLandingPage && <ScrollProgressBar />}
            <SidebarLayout>
              <Routes>
                <Route path="/:sectionId" element={<LandingPage />} />
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
          </>
        ) : (
          <>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/srch/" element={<Home />} />
              <Route path="/acknowledgments" element={<Acknowledgments />} />
              <Route path="/about" element={<About />} />
              <Route
                path="/search/:query/:page"
                element={<SearchResultsPage />}
              />
              <Route path="/search/:query" element={<SearchResultsPage />} />
              <Route path="/search" element={<SearchResultsPage />} />
            </Routes>
            <Footer />
          </>
        )}
      </Suspense>
    </>
  );
}

export default AppRoutes;