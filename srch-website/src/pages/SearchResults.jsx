import "../LandingPage.css";
import "../ContentPage.css";
import { useParams } from "react-router-dom";
import { Heading } from "@chakra-ui/react";
import { SearchBar } from "../components/SearchBar";
import { ResultsWindow } from "../components/ResultsWindow";
import { useState, useEffect } from "react";
import backgroundLight from "../assets/landing-page-background-gradient.png";
import backgroundDark from "../assets/landing-page-background-dark.png";
import Footer from "../components/Footer"


function SearchResults() {
  const { query } = useParams();
  const decodedQuery = decodeURIComponent(query || "");
  const [searchQuery, setSearchQuery] = useState(decodedQuery);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setSearchQuery(decodedQuery);
    
    // Check for dark mode
    const checkDarkMode = () => {
      const isDark = document.body.classList.contains('chakra-ui-dark') || 
                    document.documentElement.getAttribute('data-theme') === 'dark';
      setIsDarkMode(isDark);
    };
    
    checkDarkMode();
    
    // Listen for theme changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });
    
    return () => observer.disconnect();
  }, [decodedQuery]);

  return (
    <div className="markdown-page" >
      <div
        style={{
          position: "absolute",
          zIndex: 0,
          inset: 0,
          top: "0px",
          width: "100vw",
          height: "350px",
          backgroundImage: `url(${isDarkMode ? backgroundDark : backgroundLight})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div
        style={{
          position: "absolute",
          zIndex: 1,
          inset: 0,
          top: "250px",
          width: "100%",
          height: "100px",
          background: isDarkMode 
            ? "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 1) 100%)"
            : "linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 1) 100%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 2,
          padding: "20px 40px",
          marginTop: "80px",
         minHeight: "100vh",
        }}
      >
        <Heading as="h1" size="2xl" mb={3} sx={{ color: "#581000 !important" }}>
          Search
        </Heading>
        <SearchBar
          className="results-autofill"
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
          maxResults={0}
        />
        <br></br>
        <ResultsWindow searchQuery={searchQuery} floating={false} />
      </div>
          <Footer/>

    </div>
  );
}

export { SearchResults };
