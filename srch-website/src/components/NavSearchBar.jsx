import { Box, Input, IconButton, Collapse } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ResultsWindow } from "./ResultsWindow";
import "../styles/SearchBar.css";
function NavSearchBar({
  searchQuery,
  setSearchQuery,
  setIsSearchOpen,
  isSearchOpen,
  maxResults,
}) {
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      const timer = setTimeout(() => {
        inputRef.current.focus();
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isSearchOpen]);

  function search() {
    navigate(`/search/${encodeURIComponent(searchQuery)}`);
    setIsSearchOpen(false);
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  return (
    <Box ref={containerRef} className={`navsearchbar-container`}>
      <Box className={`navsearchbar-input-container`}>
        <IconButton
          aria-label="Toggle nav search bar"
          icon={<SearchIcon fontSize={"lg"} />}
          className="searchbar-toggle-button toggle-button"
          onClick={search}
        />
        <Input
          autoFocus
          ref={inputRef}
          style={{ padding: 0 }}
          className={"navsearchbar-input"}
          type="text"
          placeholder={"Search for topics, case studies, terms..."}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          _focus={{
            boxShadow: "none",
            outline: "none",
            borderColor: "inherit",
          }}
          _focusVisible={{
            boxShadow: "none",
            outline: "none",
            borderColor: "inherit",
          }}
        />
      </Box>
      <Collapse
        in={searchQuery}
        animateOpacity
        transition={{
          enter: { duration: 0.5 },
          exit: { duration: 0.25 },
        }}
      >
        <ResultsWindow
          searchQuery={searchQuery}
          maxResults={maxResults}
          setIsSearchOpen={setIsSearchOpen}
        />
      </Collapse>
    </Box>
  );
}

export { NavSearchBar };
