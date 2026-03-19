import "../styles/SearchBar.css";
import { Box, Input, IconButton, Collapsible } from "@chakra-ui/react";
import { LuSearch, LuX } from "react-icons/lu";
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FloatingSearchResults from "./FloatingSearchResults";

function SearchBar({ searchQuery, setSearchQuery, maxResults }) {
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputFocus = () => setShowResults(true);
  const handleContainerClick = () => setShowResults(true);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate(`/search/${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <Box
      ref={containerRef}
      className={"searchbar-container"}
      onClick={handleContainerClick}
    >
      <IconButton
        aria-label="Toggle search bar"
        className="searchbar-toggle-button toggle-button"
        onClick={() => navigate(`/search/${encodeURIComponent(searchQuery)}`)}
      >
        <LuSearch size="1em" />
      </IconButton>
      <Box className="searchbar-input-container">
        <Input
          ref={inputRef}
          className={"searchbar-input"}
          type="text"
          placeholder={"Search for topics, case studies, terms..."}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
        />
        <Collapsible.Root open={Boolean(searchQuery)}>
          <Collapsible.Content className="searchbar-clear-slot">
            <IconButton
              aria-label="Clear search"
              className="searchbar-toggle-button toggle-button"
              onClick={() => setSearchQuery("")}
            >
              <LuX size="0.8em" />
            </IconButton>
          </Collapsible.Content>
        </Collapsible.Root>
      </Box>
      <Collapsible.Root open={showResults}>
        <Collapsible.Content>
          <FloatingSearchResults
            searchQuery={searchQuery}
            maxResults={maxResults}
          />
        </Collapsible.Content>
      </Collapsible.Root>
    </Box>
  );
}

export default SearchBar;
