import "../styles/SearchBar.css";
import { Box, Input, IconButton } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
function NavSearchBar({
  searchQuery,
  setSearchQuery,
  setIsSearchOpen,
  isSearchOpen,
}) {
  const containerRef = useRef(null);
  const navigate = useNavigate();

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
          className="searchbar-toggle-button toggle-button"
          onClick={search}
        >
          <LuSearch />
        </IconButton>
        <Input
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
    </Box>
  );
}

export { NavSearchBar };
