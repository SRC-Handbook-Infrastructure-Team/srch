import "../styles/NavBarSearchResults.css";
import React, { useState, useEffect } from "react";
import { Collapsible, Box } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import { initializeIndex, search } from "../util/SearchEngine";

const ResultSnippet = React.memo(({ snippet, maxResults }) => {
  if (!snippet) return null;

  return (
    <div className="result-snippet-nav-bar">
      <span
        className={`${maxResults != null ? "result-snippet-text-nav-bar" : "result-snippet-text-clamped-nav-bar"}`}
        dangerouslySetInnerHTML={{ __html: snippet }}
      />
    </div>
  );
});

export const NavBarSearchResults = React.memo(
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
          maxResults != null) && (
          <div className="results-window-nav-bar">
            {searchResults != null && maxResults !== 0 && (
              <Collapsible.Root open={Boolean(searchQuery)} unmountOnExit>
                <Collapsible.Content
                  animationName={{
                    _open: "expand-height",
                    _closed: "collapse-height",
                  }}
                >
                  <div
                    className={"results-list-nav-bar"}
                    style={
                      maxResults != null
                        ? {
                            maxHeight: `${98 * maxResults}px`,
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
                          <div className="result-row-nav-bar" key={key}>
                            <div
                              className="results-item-nav-bar"
                              role="link"
                              tabIndex={searchQuery.length > 0 ? 0 : -1}
                              onClick={() => {
                                const targetPath = `/${doc.section}/${doc.subsection || ""}${
                                  doc.isDrawer
                                    ? `/${doc.anchor}`
                                    : `#${doc.anchor}`
                                }`;
                                const currentPath =
                                  location.pathname + location.hash;

                                if (
                                  currentPath === targetPath ||
                                  location.pathname === targetPath.split("#")[0]
                                ) {
                                  window.location.reload();
                                } else {
                                  navigate(targetPath, {
                                    state: { highlight: searchQuery },
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

                                  if (
                                    currentPath === targetPath ||
                                    location.pathname ===
                                      targetPath.split("#")[0]
                                  ) {
                                    window.location.reload();
                                  } else {
                                    navigate(targetPath);
                                  }
                                }
                              }}
                            >
                              <div className="results-header-nav-bar">
                                <div className="results-section-nav-bar">
                                  {doc.sectionTitle ||
                                    doc.section ||
                                    "Unnamed Section"}
                                </div>
                                <div className="results-title-nav-bar">
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
                      <div className="results-view-all-nav-bar">
                        No results found
                      </div>
                    )}
                  </div>
                  {maxResults != null && searchResults.length > 0 && (
                    <div className="results-view-all-nav-bar">
                      <div className="results-count">
                        {`Showing ${searchResults.length} result${
                          searchResults.length === 1 ? "" : "s"
                        }`}
                      </div>
                      <div>
                        <button
                          type="button"
                          className="view-all-link-nav-bar"
                          onClick={() => handleViewAllClick()}
                          aria-label={`View all search results`}
                        >
                          {`See full result${searchResults.length === 1 ? "" : "s"}`}
                        </button>
                      </div>
                    </div>
                  )}
                </Collapsible.Content>
              </Collapsible.Root>
            )}
          </div>
        )}
      </Box>
    );
  },
);

export default NavBarSearchResults;
