import "../styles/FloatingSearchResults.css";
import React, { useState, useEffect } from "react";
import { Collapsible, Box } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import { initializeIndex, search } from "../util/SearchEngine";
import { getHighlightTargetsFromSnippet } from "../util/highlightTargets";

const ResultSnippet = React.memo(({ snippet, maxResults }) => {
  if (!snippet) return null;

  return (
    <div className="result-snippet-floating">
      <span
        className={`${maxResults != null ? "result-snippet-text-floating" : "result-snippet-text-clamped-floating"}`}
        dangerouslySetInnerHTML={{ __html: snippet }}
      />
    </div>
  );
});

export const FloatingSearchResults = React.memo(
  ({ searchQuery, maxResults = null, setIsSearchOpen = null }) => {
    const [searchResults, setSearchResults] = useState(null);
    const [isIndexInitialized, setIndexInitialized] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

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
          maxResults != null) &&
          searchResults != null &&
          maxResults !== 0 && (
            <Collapsible.Root open={Boolean(searchQuery)}>
              <Collapsible.Content>
                <div className="results-window-floating">
                  <div
                    className={"results-list-floating"}
                    style={
                      maxResults != null
                        ? {
                            maxHeight: `${97 * maxResults}px`,
                            overflowY: "auto",
                          }
                        : { overflowY: "auto" }
                    }
                  >
                    {Array.isArray(searchResults) &&
                    searchResults.length > 0 ? (
                      searchResults.map((item, idx) => {
                        const doc = item.doc || {};
                        const key =
                          item.id ??
                          `${doc.sectionTitle || ""}-${doc.subsectionTitle || ""}-${
                            doc.title || ""
                          }-${idx}`;
                        const snippetToRender = item.snippet;
                        return (
                          <div className="result-row-floating" key={key}>
                            <div
                              className="results-item-floating"
                              role="link"
                              tabIndex={0}
                              aria-label={`Open ${doc.title || "result"} in ${doc.sectionTitle || doc.section || "section"}`}
                              onClick={() => {
                                const targetPath = `/${doc.section}/${doc.subsection || ""}${
                                  doc.isDrawer
                                    ? `/${doc.anchor}`
                                    : `#${doc.anchor}`
                                }`;
                                const currentPath =
                                  location.pathname + location.hash;
                                const highlightTargets =
                                  getHighlightTargetsFromSnippet(
                                    snippetToRender,
                                    searchQuery,
                                  );

                                if (
                                  currentPath === targetPath ||
                                  location.pathname === targetPath.split("#")[0]
                                ) {
                                  window.location.reload();
                                } else {
                                  navigate(targetPath, {
                                    state: {
                                      highlight: searchQuery,
                                      highlightTargets,
                                      highlightConfig: {
                                        terms: highlightTargets,
                                        target: doc.isDrawer
                                          ? "drawer"
                                          : "main",
                                        scopeAnchor: doc.isDrawer
                                          ? null
                                          : doc.anchor,
                                      },
                                    },
                                  });
                                }
                              }}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  const targetPath = `/${doc.section}/${doc.subsection || ""}${
                                    doc.isDrawer
                                      ? `/${doc.anchor}`
                                      : `#${doc.anchor}`
                                  }`;
                                  const currentPath =
                                    location.pathname + location.hash;
                                  const highlightTargets =
                                    getHighlightTargetsFromSnippet(
                                      snippetToRender,
                                      searchQuery,
                                    );

                                  if (
                                    currentPath === targetPath ||
                                    location.pathname ===
                                      targetPath.split("#")[0]
                                  ) {
                                    window.location.reload();
                                  } else {
                                    navigate(targetPath, {
                                      state: {
                                        highlight: searchQuery,
                                        highlightTargets,
                                        highlightConfig: {
                                          terms: highlightTargets,
                                          target: doc.isDrawer
                                            ? "drawer"
                                            : "main",
                                          scopeAnchor: doc.isDrawer
                                            ? null
                                            : doc.anchor,
                                        },
                                      },
                                    });
                                  }
                                }
                              }}
                            >
                              <div className="results-header-floating">
                                <div className="results-section-floating">
                                  {doc.sectionTitle ||
                                    doc.section ||
                                    "Unnamed Section"}
                                </div>
                                <div className="results-title-floating">
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
                      <div className="results-view-all-floating">
                        No results found
                      </div>
                    )}
                  </div>
                  {maxResults != null && searchResults.length > 0 && (
                    <div className="results-view-all-floating">
                      <div className="results-count-floating">
                        {`Showing ${searchResults.length} result${
                          searchResults.length === 1 ? "" : "s"
                        }`}
                      </div>
                      <div>
                        <a
                          className="view-all-link-floating"
                          onClick={() => handleViewAllClick()}
                          aria-label={`View all search results`}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              handleViewAllClick();
                            }
                          }}
                        >
                          {`See full result${searchResults.length === 1 ? "" : "s"}`}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </Collapsible.Content>
            </Collapsible.Root>
          )}
      </Box>
    );
  },
);

export default FloatingSearchResults;
