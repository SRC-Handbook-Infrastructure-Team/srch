import { Box, Input, IconButton } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ResultsWindow } from "./ResultsWindow";
import { GiTransparentSlime } from "react-icons/gi";

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
      bg="white"
      border="1px solid"
      borderRadius="md"
      borderColor={"gray.100"}
    >
      <Box
        ref={containerRef}
        position="relative"
        display="inline-flex"
        alignItems="center"
        overflow="visible"
        minWidth="40px"
        width={!canExpand ? "100%" : isExpanded ? "500px" : "40px"}
        transition="width 0.3s ease"
      >
        <Box flex="1" position="relative">
          <Input
            type="text"
            placeholder={
              isExpanded ? "Search for topics, case studies, terms..." : ""
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            // borderRadius="none"
            // borderColor={"transparent"}
            fontSize="sm"
            pl="2.5rem"
            opacity={isExpanded ? 1 : 0}
            pointerEvents={isExpanded ? "auto" : "none"}
            transition="opacity 0.3s ease"
            onFocus={() => {
              setIsFocused(true);
              if (canExpand) setIsExpanded(true);
            }}
            onMouseDown={() => setIsFocused(false)}
          />
          <Box color="white">
            {canExpand && isExpanded && searchQuery && (
              <Box
                position="absolute"
                left={0}
                right={0}
                zIndex={2}
                overflowY="auto"
              >
                <ResultsWindow
                  searchQuery={searchQuery}
                  maxResults={5}
                  setIsExpanded={setIsExpanded}
                  canExpand={canExpand}
                />
              </Box>
            )}
            {!canExpand && isExpanded && searchQuery && (
              <Box
                position="absolute"
                left={0}
                right={0}
                zIndex={1}
                overflowY="auto"
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
    </Box>
  );
}

export { SearchBar };
