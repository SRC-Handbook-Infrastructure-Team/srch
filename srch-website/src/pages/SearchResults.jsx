import "../SearchResults.css"
import "../ResultsWindow.css"
import { useParams } from "react-router-dom";
import { Heading } from "@chakra-ui/react";
import { SearchBar } from "../components/SearchBar";
import { ResultsWindow } from "../components/ResultsWindow";
import { useState, useEffect } from "react";

function SearchResults() {
  const { query } = useParams();
  const decodedQuery = decodeURIComponent(query || "");
  const [searchQuery, setSearchQuery] = useState(decodedQuery);

  useEffect(() => {
    setSearchQuery(decodedQuery);
  }, [decodedQuery]);

  return (
    <div className="search-results-page">
      <div className="background-gradient" />
      <div className="background-fade" />
      <div className="content">
        <Heading as="h1" size="2xl" mb={8} sx={{ color: "#581000 !important" }}>
          Search Results
        </Heading>
        <SearchBar
          className="results-autofill"
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
          maxResults={0}
        />
        <br></br>
        <ResultsWindow searchQuery={searchQuery} floating={false} truncateSnippet={true} />
      </div>
    </div>
  );
}

export { SearchResults };
