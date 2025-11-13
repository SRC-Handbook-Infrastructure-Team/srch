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
    <Box ref={containerRef} className={"searchbar-container"}>
      <IconButton
        aria-label="Toggle search bar"
        icon={<SearchIcon fontSize={"md"} />}
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
        <ResultsWindow
          searchQuery={searchQuery}
          maxResults={maxResults}
          floating={true}
        />
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
