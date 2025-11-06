import { Box, Input, IconButton } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ResultsWindow } from "./ResultsWindow";
import "../ContentPage.css";

function NavSearchBar({
  searchQuery,
  setSearchQuery,
  setIsSearchOpen,
  maxResults,
}) {
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

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
    <Box ref={containerRef} className={`navsearchbar-container${" expanded"}`}>
      <IconButton
        aria-label="Toggle nav search bar"
        icon={<SearchIcon fontSize={"lg"} />}
        className="navsearchbar-toggle-button toggle-button"
        onClick={search}
      />
      <Input
        ref={inputRef}
        className={"navsearchbar-input"}
        type="text"
        placeholder={"Search for topics, case studies, terms..."}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{
          opacity: 1,
          pointerEvents: "auto",
        }}
        _focus={{ boxShadow: "none", outline: "none", borderColor: "inherit" }}
        _focusVisible={{
          boxShadow: "none",
          outline: "none",
          borderColor: "inherit",
        }}
      />
      <Box className="navsearchbar-results-window">
        {searchQuery && (
          <Box>
            <ResultsWindow
              searchQuery={searchQuery}
              maxResults={maxResults}
              setIsSearchOpen={setIsSearchOpen}
              navBar={true}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}

export { NavSearchBar };
