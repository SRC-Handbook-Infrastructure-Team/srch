import { Box, Input, IconButton } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ResultsWindow } from "./ResultsWindow";
import "../ContentPage.css";// Import the CSS file

function SearchBar({ searchQuery, setSearchQuery, canExpand, maxResults }) {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const [isExpanded, setIsExpanded] = useState(!canExpand);
  const [isFocused, setIsFocused] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate(`/search/${encodeURIComponent(searchQuery)}`);
      if (canExpand) {
        setIsExpanded(false);
      }
    }
  };

  const toggleExpand = () => {
    if (canExpand) {
      setIsExpanded((prev) => !prev);
      if (isFocused) setIsFocused(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target) &&
        canExpand
      ) {
        setIsExpanded(false);
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [canExpand]);

  return (
    <Box className="searchbar-outer">
      <Box
        ref={containerRef}
        className={`searchbar-container${isExpanded ? " expanded" : ""}`}
        style={{
          width: !canExpand ? "100%" : isExpanded ? "500px" : "40px",
        }}
      >
        <IconButton
          aria-label="Toggle search bar"
          icon={<SearchIcon />}
          className="searchbar-toggle-button"
          onClick={toggleExpand}
        />
        <Box className="searchbar-input-container">
          <Input
            className={`searchbar-input${isExpanded ? " visible" : ""}`}
            type="text"
            placeholder={
              isExpanded ? "Search for topics, case studies, terms..." : ""
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              opacity: isExpanded ? 1 : 0,
              pointerEvents: isExpanded ? "auto" : "none",
            }}
            onFocus={() => {
              setIsFocused(true);
              if (canExpand) setIsExpanded(true);
            }}
            onMouseDown={() => setIsFocused(false)}
          />
          <Box className="searchbar-results-window">
            {isExpanded && searchQuery && (
              <Box>
                <Box className="results-window results-white-background">
                  <ResultsWindow
                    searchQuery={searchQuery}
                    maxResults={maxResults}
                    setIsExpanded={setIsExpanded}
                    canExpand={canExpand}
                  />
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export { SearchBar };
