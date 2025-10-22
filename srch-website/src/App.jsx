import "./App.css";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/ContentsSidebar";
import MarkdownPage from "./pages/MarkdownPage";
import Home from "./pages/Home";
import {
  Acknowledgements,
  Team,
  AdditionalContributors,
} from "./pages/Acknowledgements";

// === Add: Custom Theme Override (Typography + Colors) ===
const theme = extendTheme({
  fonts: {
    heading: `"Be Vietnam Pro", sans-serif`,
    body: `"Be Vietnam Pro", sans-serif`,
  },
  styles: {
    global: {
      body: {
        bg: "#ffffff",
        color: "#1a1a1a",
        lineHeight: "1.75",
      },
      a: {
        color: "#7b4b24",
        _hover: {
          color: "#6b3f1f",
          textDecoration: "underline",
        },
      },
    },
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter basename="/srch-s25/">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:sectionId" element={<MarkdownPage />} />
          <Route path="/:sectionId/:subsectionId" element={<MarkdownPage />} />
          <Route
            path="/:sectionId/:subsectionId/:term"
            element={<MarkdownPage />}
          />

          {/* Acknowledgements paths */}
          <Route
            path="/acknowledgements"
            element={<Team teamName="leadership" />}
          />
          <Route
            path="/acknowledgements/leadership"
            element={<Team teamName="leadership" />}
          />
          <Route path="/acknowledgements/ai" element={<Team teamName="ai" />} />
          <Route
            path="/acknowledgements/privacy"
            element={<Team teamName="privacy" />}
          />
          <Route
            path="/acknowledgements/accessibility"
            element={<Team teamName="accessibility" />}
          />
          <Route
            path="/acknowledgements/product"
            element={<Team teamName="product" />}
          />
          <Route
            path="/acknowledgements/additional"
            element={<AdditionalContributors />}
          />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
