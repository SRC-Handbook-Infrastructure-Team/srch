import "../styles/SearchResults.css";
import { useParams } from "react-router-dom";
import { Heading } from "@chakra-ui/react";
import { SearchBar } from "../components/SearchBar";
import { ResultsPage } from "../components/ResultsPage";
import { useState, useEffect } from "react";

function SearchResults() {
  const { query = "", page } = useParams();
  const decodedQuery = decodeURIComponent(query);
  const pageNum = page ? parseInt(page, 10) : 1;
  const [searchQuery, setSearchQuery] = useState(decodedQuery);

  useEffect(() => {
    setSearchQuery(decodedQuery);
  }, [decodedQuery]);

  return (
    <div className="search-results-page">
      <div className="background-gradient" />
      <div className="background-fade" />
      <div className="content">
        <Heading as="h1" size="2xl" className="search-results-header">
          Search Results
        </Heading>
        <SearchBar
          className="results-autofill"
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
          maxResults={0}
        />
        <br></br>
        <ResultsPage
          searchQuery={searchQuery}
          floating={false}
          truncateSnippet={true}
          pageNumber={pageNum}
        />
      </div>
    </div>
  );
}

export { SearchResults };
