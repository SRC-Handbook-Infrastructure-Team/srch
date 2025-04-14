import { useState } from "react";
import "./App.css";

import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import theme from "./theme";
import NavBar from "./components/NavBar";
import MarkdownPage from "./pages/MarkdownPage";
import Home from "./pages/Home";
import { Acknowledgements, Team } from "./pages/Acknowledgements";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter basename="/srch-s25/">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:sectionId" element={<MarkdownPage />} />
          <Route path="/:sectionId/:subsectionId" element={<MarkdownPage />} />

          {/* Acknowledgements paths */}
          <Route path="/acknowledgements" element={<Acknowledgements />} />
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
            element={<Team teamName="additional" />}
          />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
