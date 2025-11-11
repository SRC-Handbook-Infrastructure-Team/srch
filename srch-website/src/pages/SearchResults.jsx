import "../LandingPage.css";
import "../ContentPage.css";
import { useParams } from "react-router-dom";
import { Heading } from "@chakra-ui/react";
import { SearchBar } from "../components/SearchBar";
import { ResultsWindow } from "../components/ResultsWindow";
import { useState, useEffect } from "react";
import background from "../assets/landing-page-background-gradient.png";

function SearchResults() {
  const { query } = useParams();
  const decodedQuery = decodeURIComponent(query || "");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setSearchQuery(decodedQuery);
  }, [decodedQuery]);

  return (
    <div className="markdown-page" style={{ minHeight: "100vh" }}>
      <div
        style={{
          position: "absolute",
          zIndex: 0,
          inset: 0,
          top: "0px",
          width: "100vw",
          height: "350px",
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div
        style={{
          position: "absolute",
          zIndex: 1,
          inset: 0,
          top: "250px",
          width: "100%",
          height: "100px",
          background:"linear-gradient(to bottom,rgba(255, 255, 255, 0) 0%,rgba(255, 255, 255, 0.5) 50%,rgba(255, 255, 255, 1) 100%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 2,
          padding: "20px",
          marginTop: "80px",
        }}
      >
        <Heading as="h1" size="2xl" mb={3} sx={{ color: "#581000 !important" }}>
          Search
        </Heading>
        <SearchBar
          className="results-autofill"
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
          maxResults={0}
        />
        <br></br>
        <ResultsWindow searchQuery={decodedQuery} floating={false} />
      </div>
    </div>
  );
}

export { SearchResults };
