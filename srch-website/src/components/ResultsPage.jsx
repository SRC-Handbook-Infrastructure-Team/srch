import "../styles/ResultsWindow.css";
import React, { useState, useEffect } from "react";
import { Collapse, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { initializeIndex, search } from "../util/SearchEngine";

const classSuffix = (className, floating) =>
  floating ? `${className}-floating` : className;

const ResultSnippet = React.memo(({ snippet, maxResults = null }) => {
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
export const ResultsPage = React.memo(
  ({ floating = false, searchQuery, pageNumber }) => {
    const [searchResults, setSearchResults] = useState(null);
    const [isIndexInitialized, setIndexInitialized] = useState(false);
    const navigate = useNavigate();

    const getStoredResultsPerPage = () => {
      const stored = localStorage.getItem("resultsPerPage");
      return stored ? Number(stored) : 20;
    };

    const [resultsPerPage, setResultsPerPage] = useState(
      getStoredResultsPerPage
    );

    const [currentPage, setCurrentPage] = useState(pageNumber || 1);

    useEffect(() => {
      if (pageNumber != null && pageNumber !== currentPage) {
        setCurrentPage(pageNumber);
      }
    }, [pageNumber]);

    let paginated = searchResults || [];

    if (paginated.length > 0) {
      const start = (currentPage - 1) * resultsPerPage;
      paginated = paginated.slice(start, start + resultsPerPage);
    }
    const totalPages = Math.ceil(
      (searchResults ? searchResults.length : 0) / resultsPerPage
    );

    useEffect(() => {
      if (totalPages > 0 && currentPage > totalPages) {
        setCurrentPage(totalPages);
      }
    }, [currentPage, totalPages]);

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
          const results = await search(searchQuery, true);
          setSearchResults(results);
        }
      };
      const debounceTimer = setTimeout(doSearch, 0);
      return () => clearTimeout(debounceTimer);
    }, [searchQuery, isIndexInitialized]);

    useEffect(() => {
      if (currentPage && searchQuery) {
        navigate(`/search/${encodeURIComponent(searchQuery)}/${currentPage}`, {
          replace: true,
        });
      }
    }, [currentPage, searchQuery, navigate]);

    // Scroll to top when the current page changes so users land at top of results
    useEffect(() => {
      if (typeof window !== "undefined") {
        try {
          window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        } catch (e) {
          window.scrollTo(0, 0);
        }
      }
    }, [currentPage]);

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
        {searchQuery.length > 0 && (
          <div className={classSuffix("results-window", floating)}>
            {searchResults != null && (
              <Collapse in={searchQuery} animateOpacity>
                <div
                  className={classSuffix("results-list", floating)}
                  style={{ overflowY: "auto" }}
                >
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
                            <ResultSnippet snippet={snippetToRender} />
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="results-view-all">No results found</div>
                  )}
                </div>

                {Array.isArray(searchResults) &&
                  searchResults.length > 0 &&
                  searchResults.length > resultsPerPage && (
                    <WrapAwarePaginationRow>
                      <div className="pages-and-buttons-row">
                        <a
                          className={`page-nav${currentPage === 1 ? " invisible" : ""}`}
                          aria-disabled={currentPage === 1}
                          onClick={() => {
                            setCurrentPage((p) => Math.max(1, p - 1));
                          }}
                          tabIndex={0}
                          role="button"
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
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
                                setCurrentPage(i + 1);
                              }}
                              tabIndex={0}
                              role="button"
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
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
                            setCurrentPage((p) => Math.min(totalPages, p + 1));
                          }}
                          tabIndex={0}
                          role="button"
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
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

export default ResultsPage;
