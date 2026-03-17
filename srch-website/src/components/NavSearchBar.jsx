import "../styles/SearchBar.css";
import { Box, Input, IconButton, Collapsible } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import NavBarSearchResults from "./NavBarSearchResults";
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
      <Collapsible.Root open={isSearchOpen} unmountOnExit>
        <Collapsible.Content
          animationName={{
            _open: "expand-height",
            _closed: "collapse-height",
          }}
        >
          <Box className={`navsearchbar-input-container`}>
            <IconButton
              aria-label="Toggle nav search bar"
              className="searchbar-toggle-button toggle-button"
              onClick={search}
            >
              <LuSearch />
            </IconButton>
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
        </Collapsible.Content>
      </Collapsible.Root>
      <Collapsible.Root open={Boolean(searchQuery)} unmountOnExit>
        <Collapsible.Content
          animationName={{
            _open: "expand-height",
            _closed: "collapse-height",
          }}
        >
          <NavBarSearchResults
            searchQuery={searchQuery}
            maxResults={maxResults}
            setIsSearchOpen={setIsSearchOpen}
          />
        </Collapsible.Content>
      </Collapsible.Root>
    </Box>
  );
}

export { NavSearchBar };
