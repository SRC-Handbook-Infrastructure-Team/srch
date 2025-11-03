import React, {
  useEffect,
  useMemo,
  useState,
  useRef,
  useCallback,
} from "react";
import { Button } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { search, initializeIndex } from "../util/SearchEngine";
import "../ContentPage.css";

const MAX_CLAMP_LENGTH = 100;

const ResultSnippet = React.memo(
  ({
    snippet,
    searchQuery,
    pathname,
    hash,
    maxResults,
    canExpand,
    setIsExpanded,
  }) => {
    const [expanded, setExpanded] = useState(false);
    const [isClamped, setIsClamped] = useState(true);

    const clampedSnippet = snippet;

    // const clampedSnippet = useMemo(() => {
    //   if (!snippet) return "";
    //   const markIndex = snippet.toLowerCase().indexOf("<mark");
    //   if (markIndex === -1 || snippet.length <= MAX_CLAMP_LENGTH) {
    //     return snippet;
    //   }
    //   const beforeMark = snippet.slice(0, markIndex);
    //   const spaces = [];
    //   for (let i = 0; i < beforeMark.length; i++) {
    //     if (beforeMark[i] === " ") spaces.push(i);
    //   }
    //   let startIndex;
    //   if (spaces.length >= 2) {
    //     startIndex = spaces[spaces.length - 2];
    //   } else if (spaces.length === 1) {
    //     startIndex = spaces[0];
    //   } else {
    //     startIndex = 0;
    //   }
    //   const clampStart = Math.max(0, startIndex);
    //   let clamped = snippet.slice(clampStart);
    //   if (clampStart > 0) {
    //     if (clamped.startsWith(" ")) {
    //       clamped = "..." + clamped.slice(1);
    //     } else {
    //       clamped = "..." + clamped;
    //     }
    //   }
    //   return clamped;
    // }, [snippet]);

    return (
      <div className="result-snippet">
        {/* {!expanded ? ( */}
        <span
          className={`result-snippet-text${
            maxResults == null ? " clamped" : ""
          }`}
          dangerouslySetInnerHTML={{ __html: clampedSnippet }}
        />
        {/* ) : (
            <span
              className="result-snippet-text"
              dangerouslySetInnerHTML={{ __html: snippet }}
            />
          )} */}
        {/* {!expanded && isClamped && maxResults == null && (
          <div
            className="result-snippet-readmore"
            onMouseEnter={(e) => e.stopPropagation()}
          >
            <Button
              size="xs"
              variant="link"
              className="read-more-button"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setExpanded(true);
              }}
              aria-label="Expand result snippet"
            >
              Read more
            </Button>
          </div>
        )} */}
      </div>
    );
  }
);

export const ResultsWindow = React.memo(
  ({ searchQuery, maxResults = null, canExpand, setIsExpanded }) => {
    const [searchResults, setSearchResults] = useState([]);
    const [isIndexInitialized, setIndexInitialized] = useState(false);
    const navigate = useNavigate();

    // const limitedResults = useMemo(
    //   () =>
    //     maxResults && searchResults.length > maxResults
    //       ? searchResults.slice(0, maxResults)
    //       : searchResults,
    //   [searchResults, maxResults]
    // );

    const limitedResults = searchResults;

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
          const results = await search(searchQuery);
          setSearchResults(results);
        } else {
          setSearchResults([]);
        }
      };
      const debounceTimer = setTimeout(doSearch, 0);
      return () => clearTimeout(debounceTimer);
    }, [searchQuery, isIndexInitialized]);

    const handleClick = useCallback(() => {
      return () => {
        navigate(`/search/${encodeURIComponent(searchQuery)}`);
        unexpand();
      };
    }, [searchQuery, navigate]);

    const unexpand = useCallback(() => {
      if (canExpand) {
        setIsExpanded(false);
      }
    }, [canExpand, setIsExpanded]);

    return (
      <div>
        <div
          className={`results-list`}
          style={
            maxResults != null ? { height: `${115 * maxResults}px` } : undefined
          }
        >
          {maxResults == null && (
            <div className="results-count">
              {`Showing ${searchResults.length} result${
                searchResults.length === 1 ? "" : "s"
              } for "${searchQuery}"`}
            </div>
          )}
          {Array.isArray(limitedResults) && limitedResults.length > 0 ? (
            limitedResults.map((item, idx) => {
              const doc = item.doc || {};
              const key =
                item.id ??
                `${doc.sectionTitle || ""}-${doc.subsectionTitle || ""}-${
                  doc.title || ""
                }-${idx}`;
              return (
                <div
                  className="results-item"
                  key={key}
                  role="link"
                  tabIndex={0}
                  onClick={() => {
                    navigate(
                      `/${doc.section}/${doc.subsection || ""}${
                        doc.isDrawer ? `/${doc.anchor}` : `#${doc.anchor}`
                      }`
                    );
                    if (canExpand) setIsExpanded(false);
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
                  <div className="results-header">
                    <div className="results-section">
                      {doc.sectionTitle || doc.section || "Unnamed Section"}
                    </div>
                    <div className="results-subsection">
                      {doc.subsectionTitle ||
                        doc.section ||
                        "Unnamed Subsection"}
                    </div>
                  </div>
                  <div className="results-title">
                    {doc.title || "Unnamed Header"}
                  </div>
                  <ResultSnippet
                    snippet={item.snippet}
                    searchQuery={searchQuery}
                    maxResults={maxResults}
                    canExpand={canExpand}
                    setIsExpanded={setIsExpanded}
                  />
                </div>
              );
            })
          ) : (
            <div className="results-none">No results found</div>
          )}
        </div>
        {maxResults != null && (
          <div className="results-view-all">
            <div className="results-count">
              {`Showing ${searchResults.length} result${
                searchResults.length === 1 ? "" : "s"
              }`}
            </div>
            <div>
              <a
                className="view-all-link"
                onClick={handleClick()}
                aria-label={`View all search results`}
              >
                {`See full result${searchResults.length === 1 ? "" : "s"}`}
              </a>
            </div>
          </div>
        )}
      </div>
    );
  }
);

export default ResultsWindow;
