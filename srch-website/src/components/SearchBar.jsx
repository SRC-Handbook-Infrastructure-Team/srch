import { Box, Input, IconButton } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ResultsWindow } from "./ResultsWindow";

function SearchBar({ searchQuery, setSearchQuery, canExpand }) {
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
  }, []);

  return (
    <Box
      ref={containerRef}
      position="relative"
      display="inline-flex"
      alignItems="center"
      overflow="visible"
      minWidth="40px"
      width={!canExpand ? "100%" : isExpanded ? "400px" : "40px"}
      transition="width 0.3s ease"
    >
      <Box></Box>
      <Box flex="1" position="relative">
        <Input
          type="text"
          placeholder={
            isExpanded ? "Search for topics, case studies, terms..." : ""
          }
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          borderRadius="md"
          fontSize="sm"
          pl="2.5rem"
          opacity={isExpanded ? 1 : 0}
          pointerEvents={isExpanded ? "auto" : "none"}
          transition="opacity 0.3s ease"
          onFocus={() => {
            setIsFocused(true);
            if (canExpand) setIsExpanded(true);
          }}
          onBlur={() => setIsFocused(false)}
        />
        {canExpand && isExpanded && searchQuery && (
          <Box
            position="absolute"
            left={0}
            right={0}
            bg="white"
            border="1px solid"
            borderColor="gray.200"
            borderRadius="md"
            mt="1"
            zIndex={1000}
            maxHeight="90vh"
            overflowY="auto"
            boxShadow="md"
          >
            <ResultsWindow
              searchQuery={searchQuery}
              maxResults={5}
              setIsExpanded={setIsExpanded}
              canExpand={canExpand}
            />
          </Box>
        )}
      </Box>

      <IconButton
        aria-label="Toggle search bar"
        icon={<SearchIcon />}
        variant="ghost"
        size="md"
        position="absolute"
        left="0"
        zIndex={2}
        onClick={toggleExpand}
        _focus={{ boxShadow: "none" }}
        _focusVisible={{ boxShadow: "none" }}
        _hover={{ color: "#9D0013", bg: "transparent" }}
        _active={{ boxShadow: "none" }}
        sx={{
          "&, &:hover, &:active, &:focus, &:focus-visible, &:focus-within": {
            outline: "0 !important",
            boxShadow: "none !important",
            border: "none !important",
          },
        }}
      />
    </Box>
  );
}

export { SearchBar };
