import "./styles/App.css";
import ScrollManager from "./components/ScrollManager";
import ScrollProgressBar from "./components/ScrollProgressBar";
import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { preloadNavigationData } from "./util/MarkdownRenderer";
import Home from "./pages/Home";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const MarkdownPage = lazy(() => import("./pages/MarkdownPage"));
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
    // Preload all static data on app startup
    preloadNavigationData().catch((error) => {
      console.error("Error preloading sidebar navigation:", error);
    });

    const scheduleWarmup = (task) => {
      if (typeof window === "undefined") return () => {};

      if (typeof window.requestIdleCallback === "function") {
        const idleId = window.requestIdleCallback(task);
        return () => window.cancelIdleCallback(idleId);
      }

      const timeoutId = window.setTimeout(task, 0);
      return () => window.clearTimeout(timeoutId);
    };

    const cancelMarkdownWarmup = scheduleWarmup(() => {
      import("./util/MarkdownRenderer")
        .then(({ preloadAllMarkdownContent }) => preloadAllMarkdownContent())
        .catch((error) => {
          console.error("Error preloading markdown content:", error);
        });
    });

    const cancelSearchWarmup = scheduleWarmup(() => {
      import("./util/SearchEngine")
        .then(({ initializeIndex }) => initializeIndex())
        .catch((error) => {
          console.error("Error initializing search index:", error);
        });
    });

    return () => {
      cancelMarkdownWarmup();
      cancelSearchWarmup();
    };
  }, []);

  return (
    <>
      <ScrollManager />
      <NavBar layoutMode="overlay" />

      <Suspense fallback={<div style={{ minHeight: "50vh" }} />}>
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
