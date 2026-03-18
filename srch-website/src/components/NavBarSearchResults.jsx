import "../styles/NavBarSearchResults.css";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { Collapsible, Skeleton, Stack } from "@chakra-ui/react";
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
  ({ searchQuery, maxResults = null, setIsSearchOpen = null, show }) => {
    const placeholders = [
      {
        id: "__skeleton_0__",
        doc: { sectionTitle: "Loading", title: "Loading" },
        snippet:
          "Loading loading loading loading loading loading loading loading loading.",
      },
      {
        id: "__skeleton_1__",
        doc: { sectionTitle: "Loading", title: "Loading" },
        snippet:
          "Loading loading loading loading loading loading loading loading loading.",
      },
    ];
    const [searchResults, setSearchResults] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
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

    useLayoutEffect(() => {
      if (!searchQuery.length) {
        setIsLoading(false);
        setSearchResults(null);
        return;
      }

      setIsLoading(true);
      setSearchResults(null);

      const doSearch = async () => {
        if (isIndexInitialized) {
          const [results] = await Promise.all([
            search(searchQuery, true),
            new Promise((res) => setTimeout(res, 400)),
          ]);
          setSearchResults(results);
          setIsLoading(false);
        }
      };

      const debounceTimer = setTimeout(doSearch, 0);
      return () => clearTimeout(debounceTimer);
    }, [searchQuery, isIndexInitialized]);

    function handleViewAllClick() {
      navigate(`/search/${encodeURIComponent(searchQuery)}`);
      if (setIsSearchOpen != null) setIsSearchOpen(false);
    }

    const hasResults = Boolean(searchResults && searchResults.length > 0);
    const showLoadingOrResults = isLoading || hasResults;
    const showNoResults =
      searchQuery.length > 0 &&
      isIndexInitialized &&
      !isLoading &&
      searchResults != null &&
      searchResults.length === 0;

    return (
      <div className="results-window-nav-bar">
        {show && showNoResults && (
          <div className="results-view-all-nav-bar">No results found</div>
        )}
        <Collapsible.Root open={show && showLoadingOrResults}>
          <Collapsible.Content>
            {isLoading ? (
              <Stack gap="10px" marginTop="1rem">
                <Skeleton height="89px" />
                <Skeleton height="89px" />
                <Skeleton height="34px" />
              </Stack>
            ) : (
              <>
                <div
                  className="results-list-nav-bar"
                  style={
                    maxResults != null
                      ? {
                          maxHeight: `${94 * maxResults}px`,
                          overflowY: "auto",
                        }
                      : { overflowY: "auto" }
                  }
                >
                  {searchResults?.map((item, idx) => {
                    const doc = item.doc || {};
                    const key =
                      item.id ??
                      `${doc.sectionTitle || ""}-${doc.subsectionTitle || ""}-${
                        doc.title || ""
                      }-${idx}`;
                    const snippetToRender = item.snippet || "";

                    return (
                      <div className="result-row-nav-bar" key={key}>
                        <div
                          className="results-item-nav-bar"
                          role="link"
                          tabIndex={searchQuery.length > 0 ? 0 : -1}
                          onClick={() => {
                            const targetPath = `/${doc.section}/${doc.subsection || ""}${
                              doc.isDrawer ? `/${doc.anchor}` : `#${doc.anchor}`
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
                              const targetPath = `/${doc.section}/${
                                doc.subsection || ""
                              }${
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
                  })}
                </div>
                {maxResults != null &&
                  searchResults != null &&
                  searchResults.length > 0 && (
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
                          onClick={handleViewAllClick}
                          aria-label="View all search results"
                        >
                          {`See full result${
                            searchResults.length === 1 ? "" : "s"
                          }`}
                        </button>
                      </div>
                    </div>
                  )}
              </>
            )}
          </Collapsible.Content>
        </Collapsible.Root>
      </div>
    );
  },
);

export default NavBarSearchResults;
