import { Box, Input, IconButton, Collapse } from "@chakra-ui/react";
import { SearchIcon, CloseIcon } from "@chakra-ui/icons";
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
    <Box
      ref={containerRef}
      className={"searchbar-container"}
      borderColor={maxResults === 2 ? "whitesmoke" : "transparent"}
      borderWidth={maxResults === 2 ? "3px" : "0"}
      borderRadius={maxResults === 2 ? "6px" : "0"}
    >
      <IconButton
        aria-label="Toggle search bar"
        icon={<SearchIcon fontSize={"lg"} />}
        className="searchbar-toggle-button toggle-button"
        onClick={() => navigate(`/search/${encodeURIComponent(searchQuery)}`)}
      />
      <Box className="searchbar-input-container">
        <Input
          style={{ padding: 0 }}
          className={"searchbar-input"}
          type="text"
          placeholder={"Search for topics, case studies, terms..."}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Collapse in={searchQuery} animateOpacity>
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
        </Collapse>
      </Box>
      <Collapse in={searchQuery} animateOpacity>
        <IconButton
          aria-label="Toggle search bar"
          icon={<CloseIcon fontSize={"x-small"} />}
          className="searchbar-toggle-button toggle-button"
          onClick={() => setSearchQuery("")}
        />
      </Collapse>
    </Box>
  );
}

export { SearchBar };
