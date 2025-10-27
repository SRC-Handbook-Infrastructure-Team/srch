import { useParams } from "react-router-dom";
import { Heading } from "@chakra-ui/react";
import { SearchBar } from "../components/SearchBar";
import { ResultsWindow } from "../components/ResultsWindow";
import { useState, useEffect } from "react";

function SearchResults() {
  const { query } = useParams();
  const decodedQuery = decodeURIComponent(query || "");
  const [searchQuery, setSearchQuery] = useState(decodedQuery || "");
  useEffect(() => {
    setSearchQuery(decodedQuery);
  }, [decodedQuery]);
  return (
    <div style={{ padding: "20px", marginLeft: "250px", marginRight: "250px" }}>
      <Heading as="h1" size="xl" mt={10} mb={3}>
        Search
      </Heading>
      <SearchBar
        setSearchQuery={setSearchQuery}
        searchQuery={searchQuery}
        canExpand={false}
      />
      <ResultsWindow searchQuery={decodedQuery} />
    </div>
  );
}

export { SearchResults };
