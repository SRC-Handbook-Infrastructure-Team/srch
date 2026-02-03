import { Box, Input, IconButton, Collapse } from "@chakra-ui/react";
import { SearchIcon, CloseIcon } from "@chakra-ui/icons";
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ResultsWindow } from "./ResultsWindow";
import "../styles/ContentPage.css";

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
        icon={<SearchIcon fontSize={"md"} />}
        className="searchbar-toggle-button toggle-button"
        onClick={() => navigate(`/search/${encodeURIComponent(searchQuery)}`)}
      />
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
          _placeholder={{
            color: "gray.500",
          }}
        />
        <Collapse
          in={showResults}
          animateOpacity
          transition={{
            enter: { duration: 0.5 },
            exit: { duration: 0.25 },
          }}
        >
          <ResultsWindow searchQuery={searchQuery} maxResults={maxResults} />
        </Collapse>
      </Box>
      <Collapse
        in={searchQuery}
        animateOpacity
        transition={{
          enter: { duration: 0.5 },
          exit: { duration: 0.25 },
        }}
      >
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
