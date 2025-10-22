import React, { useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { search, initializeIndex } from "../util/SearchEngine";
import { useState } from "react";

export const ResultsWindow = React.memo(function ResultsWindow({
  searchQuery,
  maxResults = null,
  canExpand,
  setIsExpanded,
}) {
  const [searchResults, setSearchResults] = useState([]);
  const [isIndexInitialized, setIndexInitialized] = useState([]);
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

  function handleClick() {
    return () => {
      navigate(`/search/${encodeURIComponent(searchQuery)}`);
      unexpand();
    };
  }

  function unexpand() {
    if (canExpand) {
      setIsExpanded(false);
    }
  }

  return (
    <Box
      overflowY="auto"
      borderRadius="md"
      px={2}
      height={"full"}
    >
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
          return (
            <Box
              key={item.id}
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
              >
                {doc.title || "Unnamed Header"}
              </Box>

              <Link
                onClick={unexpand}
                to={{
                  pathname: doc.isDrawer
                    ? `/${doc.section}/${doc.subsection || ""}/${doc.anchor}`
                    : `/${doc.section}/${doc.subsection || ""}`,
                  hash: doc.isDrawer ? undefined : `#${doc.anchor}`,
                }}
                state={{ highlight: searchQuery }}
              >
                <Text
                  fontSize="sm"
                  color="black"
                  mt={1}
                  dangerouslySetInnerHTML={{ __html: item.snippet }}
                />
              </Link>
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
