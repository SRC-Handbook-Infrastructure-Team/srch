// src/App.jsx
import "./App.css";

import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import theme from "./theme";
import SidebarLayout from "./layouts/SidebarLayout"; 
import MarkdownPage from "./pages/MarkdownPage";
import Home from "./pages/Home";
import {
  Acknowledgements,
  Team,
  AdditionalContributors,
} from "./pages/Acknowledgements";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter basename="/srch-s25/">
        {/*  Wrap all routes in the SidebarLayout so margins, resizing, and context apply */}
        <SidebarLayout>
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
        </SidebarLayout>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
