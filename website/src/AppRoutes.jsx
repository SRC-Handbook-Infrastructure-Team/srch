import "./styles/App.css";
import ScrollManager from "./components/ScrollManager";
import ScrollProgressBar from "./components/ScrollProgressBar";
import { lazy, Suspense, useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import GridBackground from "./components/GridBackground";
import {
  preloadNavigationData,
  preloadAllMarkdownContent,
} from "./util/MarkdownData";
import { initializeIndex } from "./util/SearchEngine";
import Home from "./pages/Home";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const MarkdownPage = lazy(() => import("./pages/MarkdownPage"));
const Acknowledgments = lazy(() => import("./pages/Acknowledgments"));
const SearchResultsPage = lazy(() => import("./pages/SearchResultsPage"));
const SidebarLayout = lazy(() => import("./layouts/SidebarLayout"));
const About = lazy(() => import("./pages/About"));

function AppRoutes() {
  const location = useLocation();
  const [theme, setTheme] = useState("light");
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

  const shouldShowSharedGrid =
    isHomePage || isAboutPage || isAcknowledgmentsPage;

  const gridConfig = isHomePage
    ? {
        title: <>Brown SRC Handbook</>,
        subtitle:
          "This Handbook is your guide to integrating ethics, responsibility, and social awareness into computer science teaching. Whether you are an instructor designing a syllabus, a TA leading discussions, or a student exploring what impact your work can have, this site offers curated modules, case studies, discussion prompts, and resource tools.",
      }
    : isAboutPage
      ? {
          title: "About the SRC Handbook",
          subtitle:
            "This Handbook is your guide to integrating ethics, responsibility, and social awareness into computer science teaching. Whether you are an instructor designing a syllabus, a TA leading discussions, or a student exploring what impact your work can have, this site offers curated modules, case studies, discussion prompts, and resource tools.",
        }
      : {
          title: "Meet our team!",
          subtitle:
            "This handbook is the result of a collaborative effort across disciplines. We are grateful to the individuals whose insights, feedback, and support shaped its development.",
        };

  useEffect(() => {
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
      preloadAllMarkdownContent().catch((error) => {
        console.error("Error preloading markdown content:", error);
      });
    });

    const cancelSearchWarmup = scheduleWarmup(() => {
      initializeIndex().catch((error) => {
        console.error("Error initializing search index:", error);
      });
    });

    return () => {
      cancelMarkdownWarmup();
      cancelSearchWarmup();
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (!root) return;

    const getCurrentTheme = () => root.getAttribute("data-theme") || "light";
    setTheme(getCurrentTheme());

    const observer = new MutationObserver(() => {
      setTheme(getCurrentTheme());
    });

    observer.observe(root, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <ScrollManager />
      <NavBar layoutMode="overlay" />
      {shouldShowSharedGrid && (
        <GridBackground
          height="600px"
          theme={theme}
          title={gridConfig.title}
          subtitle={gridConfig.subtitle}
        />
      )}

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
