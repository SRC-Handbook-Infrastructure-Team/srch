import "../ResultsWindow.css";
import React, { useState, useEffect } from "react";
import { Collapse, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { initializeIndex, search } from "../util/SearchEngine";

const classSuffix = (className, floating) =>
  floating ? `${className}-floating` : className;

const ResultSnippet = React.memo(({ snippet, maxResults }) => {
  if (!snippet) return null;

  return (
    <div className="result-snippet">
      <span
        className={`${maxResults != null ? "result-snippet-text" : "result-snippet-text-clamped"}`}
        dangerouslySetInnerHTML={{ __html: snippet }}
      />
    </div>
  );
});

const WrapAwarePaginationRow = ({ children }) => {
  const containerRef = React.useRef(null);
  const [isWrapped, setIsWrapped] = React.useState(false);

  React.useEffect(() => {
    const checkWrapped = () => {
      const el = containerRef.current;
      if (!el) return;
      setIsWrapped(el.scrollHeight > el.clientHeight);
    };
    checkWrapped();
    window.addEventListener("resize", checkWrapped);
    return () => window.removeEventListener("resize", checkWrapped);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`pagination-row ${isWrapped ? "wrapped" : "not-wrapped"}`}
    >
      {children}
    </div>
  );
};

export const ResultsWindow = React.memo(
  ({
    floating = true,
    searchQuery,
    maxResults = null,
    setIsSearchOpen,
    truncateSnippet = true,
  }) => {
    const [searchResults, setSearchResults] = useState(null);
    const [isIndexInitialized, setIndexInitialized] = useState(false);
    const navigate = useNavigate();

    const getStoredResultsPerPage = () => {
      const stored = localStorage.getItem("resultsPerPage");
      return stored ? Number(stored) : 20;
    };

    const scrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    };

    const [resultsPerPage, setResultsPerPage] = useState(
      getStoredResultsPerPage
    );

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
      setCurrentPage(1);
    }, [searchResults, resultsPerPage]);

    let paginated = searchResults || [];

    if (!floating && paginated.length > 0) {
      const start = (currentPage - 1) * resultsPerPage;
      paginated = paginated.slice(start, start + resultsPerPage);
    }
    const totalPages = Math.ceil(
      (searchResults ? searchResults.length : 0) / resultsPerPage
    );

    useEffect(() => {
      const init = async () => {
        await initializeIndex();
        setIndexInitialized(true);
      };
      init();
    }, []);

    useEffect(() => {
      const doSearch = async () => {
        if (searchQuery.length && isIndexInitialized) {
          const results = await search(searchQuery, truncateSnippet);
          setSearchResults(results);
        }
      };
      const debounceTimer = setTimeout(doSearch, 0);
      return () => clearTimeout(debounceTimer);
    }, [searchQuery, isIndexInitialized, truncateSnippet]);

    function handleViewAllClick() {
      navigate(`/search/${encodeURIComponent(searchQuery)}`);
      if (setIsSearchOpen != null) setIsSearchOpen(false);
    }

    function handleResultNumberClick(num) {
      setCurrentPage(1);
      setResultsPerPage(num);
      localStorage.setItem("resultsPerPage", num);
    }

    return (
      <Box>
        {((maxResults == null && searchQuery.length > 0) ||
          maxResults != null) && (
          <div className={classSuffix("results-window", floating)}>
            {searchResults != null && maxResults !== 0 && (
              <Collapse in={searchQuery} animateOpacity>
                <div
                  className={classSuffix("results-list", floating)}
                  style={
                    maxResults != null
                      ? {
                          maxHeight: `${123 * maxResults}px`,
                          overflowY: "auto",
                        }
                      : { overflowY: "auto" }
                  }
                >
                  {maxResults == null && (
                    <div className="results-top-row">
                      <div className="results-found-count">
                        {searchResults.length > 0
                          ? `${(currentPage - 1) * resultsPerPage + 1} - ${Math.min(
                              currentPage * resultsPerPage,
                              searchResults.length
                            )} of ${searchResults.length} documents found for "${searchQuery}"`
                          : `No documents found for ${searchQuery}`}
                      </div>
                      <div className="results-per-page-selector">
                        <span>
                          Showing{" "}
                          {[20, 50, 100].map((num) => (
                            <span
                              key={num}
                              className={`per-page-number ${num === resultsPerPage ? "selected" : ""}`}
                              onClick={() => handleResultNumberClick(num)}
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  handleResultNumberClick(num);
                                }
                              }}
                              role="button"
                              aria-pressed={num === resultsPerPage}
                            >
                              {num}
                            </span>
                          ))}{" "}
                          results per page
                        </span>
                      </div>
                    </div>
                  )}
                  {Array.isArray(paginated) && paginated.length > 0 ? (
                    paginated.map((item, idx) => {
                      const doc = item.doc || {};
                      const key =
                        item.id ??
                        `${doc.sectionTitle || ""}-${doc.subsectionTitle || ""}-${
                          doc.title || ""
                        }-${idx}`;
                      const snippetToRender = item.snippet;
                      return (
                        <div className="result-row" key={key}>
                          <div
                            className="results-item"
                            role="link"
                            tabIndex={0}
                            onClick={() => {
                              navigate(
                                `/${doc.section}/${doc.subsection || ""}${
                                  doc.isDrawer
                                    ? `/${doc.anchor}`
                                    : `#${doc.anchor}`
                                }`,
                                { state: { highlight: searchQuery } }
                              );
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                navigate(
                                  `/${doc.section}/${doc.subsection || ""}${
                                    doc.isDrawer
                                      ? `/${doc.anchor}`
                                      : `#${doc.anchor}`
                                  }`
                                );
                              }
                            }}
                          >
                            <div className="results-header">
                              <div className="results-section">
                                {doc.sectionTitle ||
                                  doc.section ||
                                  "Unnamed Section"}
                              </div>
                              <div className="results-title">
                                {doc.title ===
                                snippetToRender.replace(/<[^>]*>/g, "")
                                  ? "Section Header"
                                  : doc.title || "Unnamed Header"}
                              </div>
                            </div>
                            <ResultSnippet
                              snippet={snippetToRender}
                              maxResults={maxResults}
                            />
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="results-view-all">No results found</div>
                  )}
                </div>
                {maxResults != null && searchResults.length > 0 && (
                  <div className="results-view-all">
                    <div className="results-count">
                      {`Showing ${searchResults.length} result${
                        searchResults.length === 1 ? "" : "s"
                      }`}
                    </div>
                    <div>
                      <a
                        className="view-all-link"
                        onClick={() => handleViewAllClick()}
                        aria-label={`View all search results`}
                        role="button"
                      >
                        {`See full result${searchResults.length === 1 ? "" : "s"}`}
                      </a>
                    </div>
                  </div>
                )}
                {!floating &&
                  maxResults == null &&
                  Array.isArray(searchResults) &&
                  searchResults.length > 0 &&
                  searchResults.length > resultsPerPage && (
                    <WrapAwarePaginationRow>
                      <div className="pages-and-buttons-row">
                        <a
                          className={`page-nav${currentPage === 1 ? " invisible" : ""}`}
                          aria-disabled={currentPage === 1}
                          onClick={() => {
                            scrollToTop();
                            setCurrentPage((p) => Math.max(1, p - 1));
                          }}
                          tabIndex={0}
                          role="button"
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              scrollToTop();
                              setCurrentPage((p) => Math.max(1, p - 1));
                            }
                          }}
                        >
                          {"Previous"}
                        </a>
                        <div className="pages-row">
                          {[...Array(totalPages)].map((_, i) => (
                            <span
                              key={i + 1}
                              className={`page-number ${currentPage === i + 1 ? "selected" : ""}`}
                              onClick={() => {
                                scrollToTop();
                                setCurrentPage(i + 1);
                              }}
                              tabIndex={0}
                              role="button"
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  scrollToTop();
                                  setCurrentPage(i + 1);
                                }
                              }}
                            >
                              {i + 1}
                            </span>
                          ))}
                        </div>
                        <a
                          className={`page-nav${currentPage === totalPages ? " invisible" : ""}`}
                          onClick={() => {
                            scrollToTop();
                            setCurrentPage((p) => Math.min(totalPages, p + 1));
                          }}
                          tabIndex={0}
                          role="button"
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              scrollToTop();
                              setCurrentPage((p) =>
                                Math.min(totalPages, p + 1)
                              );
                            }
                          }}
                        >
                          {"Next"}
                        </a>
                      </div>
                    </WrapAwarePaginationRow>
                  )}
              </Collapse>
            )}
          </div>
        )}
      </Box>
    );
  }
);

export default ResultsWindow;
