/**
 * Route page that renders full search results for a query and supports
 * navigation to matching module sections.
 */

import "../styles/SearchResultsPage.css";
import { useParams } from "react-router-dom";
import { Heading } from "@chakra-ui/react";
import SearchBar from "../components/SearchBar";
import { SearchResults } from "../components/SearchResults";
import { useState, useEffect } from "react";
import GridBackground from "../components/GridBackground";

function SearchResultsPage() {
  const { query = "", page } = useParams();
  const decodedQuery = decodeURIComponent(query);
  const pageNum = page ? parseInt(page, 10) : 1;
  const [searchQuery, setSearchQuery] = useState(decodedQuery);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    setSearchQuery(decodedQuery);
  }, [decodedQuery]);

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
      <GridBackground height="130px" theme={theme} showOverlay={true} />
      <div className="search-results-page">
        <div className="content">
          <div className="search-results-header">Search Results</div>
          <SearchBar
            className="results-autofill"
            setSearchQuery={setSearchQuery}
            searchQuery={searchQuery}
            maxResults={0}
          />
          <SearchResults
            searchQuery={searchQuery}
            floating={false}
            truncateSnippet={true}
            pageNumber={pageNum}
          />
        </div>
      </div>
    </>
  );
}

export default SearchResultsPage;
