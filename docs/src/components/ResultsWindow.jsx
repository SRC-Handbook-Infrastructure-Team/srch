import React, { useState, useEffect } from "react";
import { Collapse } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { initializeIndex, search } from "../util/SearchEngine";

const classSuffix = (className, floating) =>
  floating ? `${className}-floating` : className;

const ResultSnippet = React.memo(({ snippet, maxResults }) => {
  if (!snippet) return null;

  return (
    <div className={"result-snippet"}>
      <span
        className={`result-snippet-text${maxResults == null ? " clamped" : ""}`}
        dangerouslySetInnerHTML={{ __html: snippet }}
      />
    </div>
  );
});

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

    function handleClick() {
      navigate(`/search/${encodeURIComponent(searchQuery)}`);
      if (setIsSearchOpen != null) setIsSearchOpen(false);
    }

    return (
      <div className={classSuffix("results-window", floating)}>
        {searchResults != null && (maxResults != 0 && (
          <Collapse in={searchQuery} animateOpacity>
            <div
              className={classSuffix("results-list", floating)}
              style={
                maxResults != null
                  ? { maxHeight: `${109 * maxResults}px`, overflowY: "auto" }
                  : { overflowY: "auto" }
              }
            >
              {maxResults == null && (
                <div className={"results-count"}>
                  {`Showing ${searchResults.length} result${
                    searchResults.length === 1 ? "" : "s"
                  } for "${searchQuery}"`}
                </div>
              )}
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
                    <div className={"result-row"}>
                    <div
                      className={"results-item"}
                      key={key}
                      role="link"
                      tabIndex={0}
                      onClick={() => {
                        navigate(
                          `/${doc.section}/${doc.subsection || ""}${
                            doc.isDrawer ? `/${doc.anchor}` : `#${doc.anchor}`
                          }`,
                          { state: { highlight: searchQuery } }
                        );
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          navigate(
                            `/${doc.section}/${doc.subsection || ""}${
                              doc.isDrawer ? `/${doc.anchor}` : `#${doc.anchor}`
                            }`
                          );
                          if (canExpand) setIsExpanded(false);
                        }
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <div className={"results-header"}>
                        <div className={"results-section"}>
                          {doc.sectionTitle || doc.section || "Unnamed Section"}
                        </div>
                        <div className={"results-title"}>
                          {doc.title === snippetToRender.replace(/<[^>]*>/g, "")
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
                <div className={"results-view-all"}>No results found</div>
              )}
            </div>
            {maxResults != null && searchResults.length > 0 && (
              <div className={"results-view-all"}>
                <div className={"results-count"}>
                  {`Showing ${searchResults.length} result${
                    searchResults.length === 1 ? "" : "s"
                  }`}
                </div>
                <div>
                  <a
                    className={"view-all-link"}
                    onClick={() => handleClick()}
                    aria-label={`View all search results`}
                  >
                    {`See full result${searchResults.length === 1 ? "" : "s"}`}
                  </a>
                </div>
              </div>
            )}
          </Collapse>
        ))}
      </div>
    );
  }
);

export default ResultsWindow;
