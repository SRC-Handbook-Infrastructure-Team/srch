import { Box, Input, IconButton } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ResultsWindow } from "./ResultsWindow";
import "../ContentPage.css";

function SearchBar({ searchQuery, setSearchQuery, maxResults }) {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate(`/search/${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <Box ref={containerRef} className={"searchbar-container"}>
      <IconButton
        aria-label="Toggle search bar"
        icon={<SearchIcon fontSize={"lg"} />}
        className="searchbar-toggle-button toggle-button"
        onClick={() => setSearchQuery(e.target.value)}
      />
      <Box className="searchbar-input-container">
        <Input
          className={"searchbar-input"}
          type="text"
          placeholder={"Search for topics, case studies, terms..."}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Box className="searchbar-results-window">
          {searchQuery && (
            <Box>
              <Box className="results-window">
                <Box>
                  <ResultsWindow
                    searchQuery={searchQuery}
                    maxResults={maxResults}
                    floating={true}
                  />
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export { SearchBar };
