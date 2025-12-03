import "../styles/ResultsWindow.css";
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

export const ResultsWindow = React.memo(
  ({ searchQuery, maxResults = null, setIsSearchOpen = null }) => {
    const [searchResults, setSearchResults] = useState(null);
    const [isIndexInitialized, setIndexInitialized] = useState(false);
    const navigate = useNavigate();
    const floating = setIsSearchOpen == null;

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

    function handleViewAllClick() {
      navigate(`/search/${encodeURIComponent(searchQuery)}`);
      if (setIsSearchOpen != null) setIsSearchOpen(false);
    }

    return (
      <Box>
        {((maxResults == null && searchQuery.length > 0) ||
          maxResults != null) && (
          <div className={classSuffix("results-window", floating)}>
            {searchResults != null && maxResults !== 0 && (
              <Collapse
                in={searchQuery}
                animateOpacity
                transition={{
                  enter: { duration: 0.5 },
                  exit: { duration: 0.25 },
                }}
              >
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
                  {Array.isArray(searchResults) && searchResults.length > 0 ? (
                    searchResults.map((item, idx) => {
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
              </Collapse>
            )}
          </div>
        )}
      </Box>
    );
  }
);

export default ResultsWindow;
