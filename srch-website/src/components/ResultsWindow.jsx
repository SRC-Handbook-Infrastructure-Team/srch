import React, { useEffect, useMemo } from "react";
import { Box, Text, Button } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { search, initializeIndex } from "../util/SearchEngine";
import { useState, useRef, useCallback } from "react";

// Move ResultSnippet outside and memoize
const ResultSnippet = React.memo(({ snippet, searchQuery, pathname, hash }) => {
  const [expanded, setExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    const checkClamped = () => {
      const el = textRef.current;
      if (el) {
        const clamped = el.scrollHeight > el.clientHeight;
        setIsClamped(clamped);
      }
    };
    checkClamped();
    window.addEventListener("resize", checkClamped);
    return () => window.removeEventListener("resize", checkClamped);
  }, [snippet]);

  return (
    <Box fontSize="sm" color="black">
      <Link
        state={{ highlight: searchQuery }}
        to={{ pathname: pathname, hash: hash }}
        _hover={{ textDecoration: "underline" }}
        style={{ display: "block" }}
      >
        {!expanded ? (
          <Text
            ref={textRef}
            mt={1}
            dangerouslySetInnerHTML={{ __html: snippet }}
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "normal",
            }}
          />
        ) : (
          <Text mt={1} dangerouslySetInnerHTML={{ __html: snippet }} />
        )}
      </Link>
      {!expanded && isClamped && (
        <Box
          mt={1}
          textAlign="right"
          onMouseEnter={(e) => e.stopPropagation()}
          justifySelf={"flex-start"}
        >
          <Button
            size="xs"
            variant="link"
            px={2}
            py={1}
            bg="darkgray"
            textColor={"white"}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setExpanded(true);
            }}
          >
            Read more
          </Button>
        </Box>
      )}
    </Box>
  );
});

export const ResultsWindow = React.memo(
  ({ searchQuery, maxResults = null, canExpand, setIsExpanded }) => {
    const [searchResults, setSearchResults] = useState([]);
    const [isIndexInitialized, setIndexInitialized] = useState(false);
    const navigate = useNavigate();

    const limitedResults = useMemo(
      () =>
        maxResults && searchResults.length > maxResults
          ? searchResults.slice(0, maxResults)
          : searchResults,
      [searchResults, maxResults]
    );

    // Initialize once
    useEffect(() => {
      const init = async () => {
        await initializeIndex();
        setIndexInitialized(true);
      };
      init();
    }, []);

    // Debounced search when query changes
    useEffect(() => {
      const doSearch = async () => {
        if (searchQuery.length && isIndexInitialized) {
          const results = await search(searchQuery);
          setSearchResults(results);
        } else {
          setSearchResults([]);
        }
      };

      // Add debounce delay
      const debounceTimer = setTimeout(() => {
        doSearch();
      }, 200); // Increased to 250ms

      return () => clearTimeout(debounceTimer);
    }, [searchQuery, isIndexInitialized]);

    const handleClick = useCallback(() => {
      return () => {
        navigate(`/search/${encodeURIComponent(searchQuery)}`);
        unexpand();
      };
    }, [searchQuery, navigate]);

    const unexpand = useCallback(() => {
      if (canExpand) {
        setIsExpanded(false);
      }
    }, [canExpand, setIsExpanded]);

    return (
      <Box bg="white" border="1px solid" borderColor="gray.100" borderRadius="md">
        <Box
          overflowY="auto"
          px={2}
          py={2}
          height={"full"}
          maxHeight={maxResults != null ? "50vh" : undefined}
          mt="1"
        >
          {maxResults == null && (
            <Text mb={2} color="gray.500" fontSize="sm">
              {`Showing ${searchResults.length} result${
                searchResults.length === 1 ? "" : "s"
              }`}
            </Text>
          )}
          {Array.isArray(limitedResults) && limitedResults.length > 0 ? (
            limitedResults.map((item) => {
              const doc = item.doc || {};
              return (
                <Box
                  key={`${item.id || Math.random()}`}
                  mb={2}
                  pb={3}
                  borderBottom="1px solid"
                  borderColor="gray.200"
                >
                  <Box display="flex" alignItems="center" mb={1}>
                    <Box
                      bg="#9D0013"
                      color="white"
                      px={4}
                      py={1}
                      borderRadius="full"
                      fontWeight="semibold"
                      fontSize="sm"
                      mr={3}
                      whiteSpace="nowrap"
                    >
                      {doc.sectionTitle || "Unnamed Section"}
                    </Box>
                    <Box
                      as="span"
                      display="flex"
                      alignItems="center"
                      fontSize="sm"
                      color="gray.700"
                    >
                      <Box
                        as="span"
                        h={2}
                        w={2}
                        bg="gray.300"
                        borderRadius="full"
                        mr={2}
                        whiteSpace="nowrap"
                      />
                      {doc.subsectionTitle || "Unnamed Subsection"}
                    </Box>
                  </Box>
                  <Box
                    as="span"
                    display="flex"
                    alignItems="center"
                    fontSize="sm"
                    color="gray.700"
                    fontWeight="bold"
                    textDecoration="underline"
                    whiteSpace="nowrap"
                  >
                    {doc.title || "Unnamed Header"}
                  </Box>
                  <ResultSnippet
                    snippet={item.snippet}
                    pathname={
                      doc.isDrawer
                        ? `/${doc.section}/${doc.subsection || ""}/${
                            doc.anchor
                          }`
                        : `/${doc.section}/${doc.subsection || ""}`
                    }
                    hash={doc.isDrawer ? undefined : `#${doc.anchor}`}
                    searchQuery={searchQuery}
                  />
                </Box>
              );
            })
          ) : (
            <Text color="gray.500" fontSize="sm">
              No results found
            </Text>
          )}
        </Box>
        {maxResults != null && canExpand && (
          <Box px={2} py={2} mt={1}>
            <Text
              as="a"
              cursor="pointer"
              color="blue.600"
              textDecoration="underline"
              onClick={handleClick()}
              fontSize="sm"
              _hover={{ color: "blue.800" }}
            >
              {`View all ${searchResults.length} result${
                searchResults.length === 1 ? "" : "s"
              }`}
            </Text>
          </Box>
        )}
      </Box>
    );
  }
);

export default ResultsWindow;
