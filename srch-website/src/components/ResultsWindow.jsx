import React, { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { search, initializeIndex } from "../util/SearchEngine";

export const ResultsWindow = React.memo(function ResultsWindow({
  searchQuery,
  maxResults = null,
  canExpand,
  setIsExpanded,
}) {
  const [searchResults, setSearchResults] = useState([]);
  const [isIndexInitialized, setIndexInitialized] = useState(false);
  const navigate = useNavigate();

  const limitedResults =
    maxResults && searchResults.length > maxResults
      ? searchResults.slice(0, maxResults)
      : searchResults;

  // Initialize once
  useEffect(() => {
    const init = async () => {
      await initializeIndex();
      setIndexInitialized(true);
    };
    init();
  }, []);

  // Trigger search when query changes
  useEffect(() => {
    const doSearch = async () => {
      if (searchQuery.length > 2 && isIndexInitialized) {
        const results = await search(searchQuery);
        setSearchResults(results);
      } else {
        setSearchResults([]);
      }
    };
    doSearch();
  }, [searchQuery, isIndexInitialized]);

  function unexpand() {
    if (canExpand) {
      setIsExpanded(false);
    }
  }

  // keep your original API (returns a function)
  function handleClick() {
    return () => {
      navigate(`/search/${encodeURIComponent(searchQuery)}`);
      unexpand();
    };
  }

  return (
    <Box overflowY="auto" borderRadius="md" px={2} height="full">
      <Text mt={2} mb={2} color="gray.500" fontSize="sm">
        {maxResults != null ? (
          <Text
            as="a"
            cursor="pointer"
            color="blue.600"
            textDecoration="underline"
            onClick={handleClick()}
            _hover={{ color: "blue.800" }}
          >
            {`View all ${searchResults.length} result${
              searchResults.length === 1 ? "" : "s"
            }`}
          </Text>
        ) : (
          `Showing ${searchResults.length} result${
            searchResults.length === 1 ? "" : "s"
          }`
        )}
      </Text>

      {Array.isArray(limitedResults) && limitedResults.length > 0 ? (
        limitedResults.map((item) => {
          const doc = item.doc || {};

          // Compute target path + hash for anchors
          const basePath = `/${doc.section || ""}/${doc.subsection || ""}`;
          const fullPath = doc.isDrawer ? `${basePath}/${doc.anchor}` : basePath;
          const hash = !doc.isDrawer && doc.anchor ? `#${doc.anchor}` : "";

          return (
            <Box
              key={item.id}
              mb={2}
              pb={3}
              borderBottom="1px solid"
              borderColor="gray.200"
              _hover={{ bg: "gray.50", cursor: "pointer" }}
              onClick={() => {
                // navigate with state so MarkdownPage highlights the term
                navigate(fullPath + hash, { state: { highlight: searchQuery } });
                unexpand();
              }}
            >
              {/* Section + Subsection line */}
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
                  <Box as="span" h={2} w={2} bg="gray.300" borderRadius="full" mr={2} />
                  {doc.subsectionTitle || "Unnamed Subsection"}
                </Box>
              </Box>

              {/* Title */}
              <Text
                display="flex"
                alignItems="center"
                fontSize="sm"
                color="gray.800"
                fontWeight="bold"
                textDecoration="underline"
              >
                {doc.title || "Unnamed Header"}
              </Text>

              {/* Snippet (already contains <mark> tags) */}
              <Text
                fontSize="sm"
                color="black"
                mt={1}
                dangerouslySetInnerHTML={{ __html: item.snippet }}
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
  );
});

export default ResultsWindow;
